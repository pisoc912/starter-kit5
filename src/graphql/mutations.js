/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPayment = /* GraphQL */ `
  mutation CreatePayment(
    $input: CreatePaymentInput!
    $condition: ModelPaymentConditionInput
  ) {
    createPayment(input: $input, condition: $condition) {
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
export const updatePayment = /* GraphQL */ `
  mutation UpdatePayment(
    $input: UpdatePaymentInput!
    $condition: ModelPaymentConditionInput
  ) {
    updatePayment(input: $input, condition: $condition) {
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
export const deletePayment = /* GraphQL */ `
  mutation DeletePayment(
    $input: DeletePaymentInput!
    $condition: ModelPaymentConditionInput
  ) {
    deletePayment(input: $input, condition: $condition) {
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createAccount = /* GraphQL */ `
  mutation CreateAccount(
    $input: CreateAccountInput!
    $condition: ModelAccountConditionInput
  ) {
    createAccount(input: $input, condition: $condition) {
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
        updatedAt
        owner
      }
      updatedAt
      owner
    }
  }
`;
export const updateAccount = /* GraphQL */ `
  mutation UpdateAccount(
    $input: UpdateAccountInput!
    $condition: ModelAccountConditionInput
  ) {
    updateAccount(input: $input, condition: $condition) {
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
export const deleteAccount = /* GraphQL */ `
  mutation DeleteAccount(
    $input: DeleteAccountInput!
    $condition: ModelAccountConditionInput
  ) {
    deleteAccount(input: $input, condition: $condition) {
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
