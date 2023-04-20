/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
export const onCreateCandidateListing = /* GraphQL */ `
  subscription OnCreateCandidateListing(
    $filter: ModelSubscriptionCandidateListingFilterInput
    $owner: String
  ) {
    onCreateCandidateListing(filter: $filter, owner: $owner) {
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
export const onUpdateCandidateListing = /* GraphQL */ `
  subscription OnUpdateCandidateListing(
    $filter: ModelSubscriptionCandidateListingFilterInput
    $owner: String
  ) {
    onUpdateCandidateListing(filter: $filter, owner: $owner) {
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
export const onDeleteCandidateListing = /* GraphQL */ `
  subscription OnDeleteCandidateListing(
    $filter: ModelSubscriptionCandidateListingFilterInput
    $owner: String
  ) {
    onDeleteCandidateListing(filter: $filter, owner: $owner) {
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
