// ** React Imports
import { createContext, useEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

import { Auth, API } from 'aws-amplify'
import { DataStore } from '@aws-amplify/datastore'
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth'

import * as queries from '/src/graphql/queries.js'
import * as mutations from '/src/graphql/mutations.js'

// Define the default values for the context provider.
const defaultProvider = {
  user: null, // The currently authenticated user, if any.
  loading: false, // Whether the authentication state is still being initialized.
  setUser: () => null, // A method to set the user.
  setLoading: () => Boolean, // A method to set the loading state.

  login: () => Promise.resolve(), // A method to log in a user.
  logout: () => Promise.resolve(), // A method to log out the current user.
  loginWithGoogle: () => Promise.resolve(),
  register: () => Promise.resolve(), // A method to register a new user.
  confirmRegistration: () => Promise.resolve(),
  stripe: null,
  setStripe: () => null,
  refreshStripe: () => Promise.resolve(),
  aiPreset: null,
  setAIPreset: () => null
}

// Create the context provider for the authentication state.
const AuthContext = createContext(defaultProvider)

// Could be used for state update and provider

let refresh

// Create the authentication provider component.
const AuthProvider = ({ children }) => {
  // Define the local state for the user, the loading state, and the initialized state.
  const [user, setUser] = useState(defaultProvider.user)
  const [loading, setLoading] = useState(defaultProvider.loading)
  const [stripe, setStripe] = useState(defaultProvider.stripe)
  const [aiPreset, setAIPreset] = useState(defaultProvider.aiPreset)

  // Get the router object from the NextJS context.
  const router = useRouter()

  // Initialize the authentication state when the component is mounted.
  useEffect(() => {
    // ** Called when there is a session
    const initAuth = async () => {
      // Set the initialized state to true.
      // Check if there is a valid session in the browser.
      let session = await Auth.currentSession()

      if (session) {
        // If there is a session, set the loading state to true and get the current
        // authenticated user.
        setLoading(true)
        const userData = await Auth.currentAuthenticatedUser()
        console.log(userData)

        const user = {
          role: 'client',
          fullName: userData.attributes.name,
          email: userData.attributes.email
        }

        // Set the loading state to false and the user data to the local state.
        setUser({ ...user })

        // refresh other user data in dynamo db
        await refreshStripe()

        // pre-sync other data using Datastore
        await DataStore.start()
        setLoading(false)

        // Remember user when login with google
        if (userData.username.includes('google')) {
        }
        window.localStorage.setItem('userData', JSON.stringify(user))

        // Handle account mutual exclusion in the same browser
        let curUser = window.localStorage.getItem('userData')
        refresh = () => {
          if (!(window.localStorage.getItem('userData') === curUser)) {
            window.removeEventListener('storage', refresh)
            location.reload()
          }
        }
        window.addEventListener('storage', refresh)
        await refreshUser(user)
      } else {
        setLoading(false)
      }
    }
    initAuth().catch(err => {
      // If an error occurred, throw it so it can be handled by the caller.
      setLoading(false)
      router.push('/login')
    })
  }, [])

  function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  // Define a method to handle user login.
  const handleLogin = (params, errorCallback) => {
    // Use the `Auth.signIn` method to sign in the user with the provided username
    // and password.
    try {
      console.log(params)
      Auth.signIn(params.email, params.password)
        .then(async userData => {
          // Set the user data to the local state.
          console.log(userData)

          const user = {
            role: 'admin',
            fullName: userData.attributes.name,
            email: userData.attributes.email
          }

          const returnUrl = router.query.returnUrl
          setUser({ ...user })
          console.log(user)
          await refreshStripe(false)

          // Record new user and old user previous in this browser
          let curUser = JSON.stringify(user)
          let oldUser = window.localStorage.getItem('userData')

          // Get the return URL from the router query, if it exists, and redirect the user
          // to the specified URL or to the root URL if no return URL was specified.
          params.rememberMe ? window.localStorage.setItem('userData', curUser) : null
          const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
          router.replace(redirectURL)

          // Handle account mutual exclusion in the same browser
          refresh = () => {
            if (!(window.localStorage.getItem('userData') === curUser)) {
              window.removeEventListener('storage', refresh)
              location.reload()
            }
          }
          window.addEventListener('storage', refresh)

          // To avoid data conflict when there is a different user signed in
          if (!(oldUser === curUser)) {
            await DataStore.clear()
          }

          // Pre-sync data with datastore
          await DataStore.start()
          await refreshUser(user)
        })
        .catch(err => {
          errorCallback ? errorCallback(err) : null
          console.log(err)
        })
    } catch (err) {
      // If an error occurred, throw it so it can be handled by the caller.
      errorCallback ? errorCallback(err) : null
      console.log(err)
    }
  }

  const handleConfirmation = async (username, confirmation) => {
    try {
      await Auth.confirmSignUp(username, confirmation)
    } catch (error) {
      throw error
    }
  }

  // Define a method to handle user logout.
  const handleLogout = async () => {
    // Use the Auth.signOut method to sign out the current user.

    const userData = await Auth.currentAuthenticatedUser()

    setUser(null)
    setStripe(null)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem('googleAuthClient')

    await Auth.signOut()
      .then(() => {
        // Set the user to null and the initialized state to false.
        console.log('signing out...')

        // Redirect the user to the login page.
        router.push('/login')
      })
      .catch(err => {
        // If an error occurred, throw it so it can be handled by the caller.
        throw err
      })
    window.removeEventListener('storage', refresh)
  }

  // Define a method to handle user registration.
  const handleRegister = async (params, errorCallback) => {
    // Use the Auth.signUp method to register a new user with the provided username,
    // password, and email address.
    console.log(params)
    try {
      const { user, userSub } = await Auth.signUp({
        password: params.password,
        username: params.email,
        attributes: {
          email: params.email,
          name: params.fullName
        }
      })

      console.log(userSub, params)

      errorCallback = null
    } catch (err) {
      // If an error occurred, throw it so it can be handled by the caller.
      throw err
    }
  }

  // const refreshStripe = async (refresh = true) => {
  //   console.log(window.location.href)
  //   const userData = await Auth.currentAuthenticatedUser()

  //   let result = await API.graphql({
  //     query: queries.getStripeProfile,
  //     variables: { id: userData.attributes.sub }
  //   })

  //   let stripe_ = result.data.getStripeProfile
  //   console.log(stripe_)

  //   setStripe(stripe_)

  //   return stripe_
  // }

  const refreshUser = async user_ => {
    const userData = await Auth.currentAuthenticatedUser()

    let u = await API.graphql({
      query: queries.getUser,
      variables: { id: userData.attributes.sub }
    })
    u = u.data.getUser

    if (u === null) {
      u = await API.graphql({
        query: mutations.createUser,
        variables: {
          input: { id: userData.attributes.sub, owner: userData.attributes.sub }
        }
      })
      u = u.data.createUser
    }
    setUser({ ...u, ...user_, profile_inputs: u.profile_inputs ? JSON.parse(u.profile_inputs) : {} })
    console.log(u)
    if (u.onboard_status != 'finished') {
      router.push('/account/onboarding/')
    }
  }

  const loginWithGoogle = async (params, errorCallback) => {
    console.log('Start Google login')
    Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google })
  }

  // Return the context provider with the defined authentication state and methods.

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        setUser,
        setLoading,
        login: handleLogin,
        logout: handleLogout,
        register: handleRegister,
        confirmRegistration: handleConfirmation,
        stripe,
        setStripe,

        // refreshStripe: refreshStripe,
        aiPreset,
        setAIPreset,
        loginWithGoogle
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Export the authentication context provider and the context object.
export { AuthContext, AuthProvider }

//---*/
