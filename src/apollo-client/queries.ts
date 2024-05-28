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
