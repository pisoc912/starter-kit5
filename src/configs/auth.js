export default {
  meEndpoint: '/auth/me',
  loginEndpoint: '/jwt/login',
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'CognitoAccessToken',
  onTokenExpiration: 'CognitoRefreshToken' // logout | refreshToken
}
