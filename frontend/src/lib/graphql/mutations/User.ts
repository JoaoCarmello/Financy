import { gql } from '@apollo/client';

export const UPDATE_USER = gql`
  mutation UpdateUser($data: UpdateUserInput!, $updateUserId: String!) {
    updateUser(data: $data, id: $updateUserId) {
      id
      name
      email
      password
      role
      createdAt
      updatedAt
    }
  }
`;
