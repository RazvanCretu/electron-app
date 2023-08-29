import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  query User {
    me {
      username
    }
  }
`;

export const LOGIN = gql`
  mutation Login($input: UsersPermissionsLoginInput!) {
    login(input: $input) {
      jwt
      user {
        username
      }
    }
  }
`;
