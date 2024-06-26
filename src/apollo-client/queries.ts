// src/queries.js
import { gql } from "@apollo/client";

export const GET_USER_BY_AUTH_ID = gql`
  query ($auth_id: String!) {
    devlinks_user(where: { auth_id: { _eq: $auth_id } }, limit: 1) {
      auth_id
      email
      firstname
      id
      lastname
      profile_picture
      links {
        id
        link
        platform
        user_id
      }
    }
  }
`;
export const GET_USER_DATA_BY_EMAIL = gql`
  query MyQuery($email: String!) {
    devlinks_user(where: { email: { _eq: $email } }) {
      email
      firstname
      lastname
      profile_picture
      links {
        id
        link
        platform
      }
    }
  }
`;
