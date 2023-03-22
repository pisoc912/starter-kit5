/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePayment = /* GraphQL */ `
  subscription OnCreatePayment(
    $filter: ModelSubscriptionPaymentFilterInput
    $owner: String
  ) {
    onCreatePayment(filter: $filter, owner: $owner) {
      PK
      SK
      payment_id
      amount
      customer_email
      created_at
      line_items {
        product_id
        amount
        quantity
        currency
      }
      subscription_id
      subscription_status
      account_pk
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdatePayment = /* GraphQL */ `
  subscription OnUpdatePayment(
    $filter: ModelSubscriptionPaymentFilterInput
    $owner: String
  ) {
    onUpdatePayment(filter: $filter, owner: $owner) {
      PK
      SK
      payment_id
      amount
      customer_email
      created_at
      line_items {
        product_id
        amount
        quantity
        currency
      }
      subscription_id
      subscription_status
      account_pk
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeletePayment = /* GraphQL */ `
  subscription OnDeletePayment(
    $filter: ModelSubscriptionPaymentFilterInput
    $owner: String
  ) {
    onDeletePayment(filter: $filter, owner: $owner) {
      PK
      SK
      payment_id
      amount
      customer_email
      created_at
      line_items {
        product_id
        amount
        quantity
        currency
      }
      subscription_id
      subscription_status
      account_pk
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onCreateUser(filter: $filter, owner: $owner) {
      PK
      SK
      email
      created_at
      first_name
      last_name
      address
      account_pk
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onUpdateUser(filter: $filter, owner: $owner) {
      PK
      SK
      email
      created_at
      first_name
      last_name
      address
      account_pk
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onDeleteUser(filter: $filter, owner: $owner) {
      PK
      SK
      email
      created_at
      first_name
      last_name
      address
      account_pk
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateAccount = /* GraphQL */ `
  subscription OnCreateAccount(
    $filter: ModelSubscriptionAccountFilterInput
    $owner: String
  ) {
    onCreateAccount(filter: $filter, owner: $owner) {
      PK
      SK
      company_name
      created_at
      users {
        PK
        SK
        email
        created_at
        first_name
        last_name
        address
        account_pk
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateAccount = /* GraphQL */ `
  subscription OnUpdateAccount(
    $filter: ModelSubscriptionAccountFilterInput
    $owner: String
  ) {
    onUpdateAccount(filter: $filter, owner: $owner) {
      PK
      SK
      company_name
      created_at
      users {
        PK
        SK
        email
        created_at
        first_name
        last_name
        address
        account_pk
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteAccount = /* GraphQL */ `
  subscription OnDeleteAccount(
    $filter: ModelSubscriptionAccountFilterInput
    $owner: String
  ) {
    onDeleteAccount(filter: $filter, owner: $owner) {
      PK
      SK
      company_name
      created_at
      users {
        PK
        SK
        email
        created_at
        first_name
        last_name
        address
        account_pk
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
