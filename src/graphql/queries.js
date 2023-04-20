/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPayment = /* GraphQL */ `
  query GetPayment($id: ID!) {
    getPayment(id: $id) {
      PK
      SK
      payment_id
      amount
      customer_email
      line_items {
        product_id
        amount
        quantity
        currency
      }
      subscription_id
      subscription_status
      account_pk
      id
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listPayments = /* GraphQL */ `
  query ListPayments(
    $filter: ModelPaymentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPayments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        PK
        SK
        payment_id
        amount
        customer_email
        line_items {
          product_id
          amount
          quantity
          currency
        }
        subscription_id
        subscription_status
        account_pk
        id
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      PK
      SK
      email
      first_name
      last_name
      address
      account_pk
      id
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        PK
        SK
        email
        first_name
        last_name
        address
        account_pk
        id
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getAccount = /* GraphQL */ `
  query GetAccount($id: ID!) {
    getAccount(id: $id) {
      PK
      SK
      company_name
      created_at
      users {
        PK
        SK
        email
        first_name
        last_name
        address
        account_pk
        id
        createdAt
        updatedAt
        owner
      }
      id
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listAccounts = /* GraphQL */ `
  query ListAccounts(
    $filter: ModelAccountFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAccounts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        PK
        SK
        company_name
        created_at
        users {
          PK
          SK
          email
          first_name
          last_name
          address
          account_pk
          id
          createdAt
          updatedAt
          owner
        }
        id
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getCandidateListing = /* GraphQL */ `
  query GetCandidateListing($id: ID!) {
    getCandidateListing(id: $id) {
      PK
      SK
      currentTitle
      locationPreference
      yearsOfExperience
      seniorityLevel
      requiredSkills
      preferredSkills
      industry
      education
      id
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listCandidateListings = /* GraphQL */ `
  query ListCandidateListings(
    $filter: ModelCandidateListingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCandidateListings(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        PK
        SK
        currentTitle
        locationPreference
        yearsOfExperience
        seniorityLevel
        requiredSkills
        preferredSkills
        industry
        education
        id
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
