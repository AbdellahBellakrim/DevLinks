// src/queries.js
import { gql } from "@apollo/client";

export const GET_USER_BY_ID = gql`
  query GetUserWithLinks($id: Int!) {
    devlinks_user_by_pk(id: $id) {
      email
      firstname
      id
      lastname
      profile_picture
      username
      links {
        id
        link
        platform
      }
    }
  }
`;
export const GET_USER_DATA_BY_USERNAME = gql`
  query MyQuery($username: String!) {
    devlinks_user(where: { username: { _eq: $username } }) {
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
