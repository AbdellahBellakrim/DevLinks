import { gql } from "@apollo/client";

export const UPDATE_USER_BY_PK = gql`
  mutation MyMutation(
    $id: Int!
    $lastname: String!
    $email: String!
    $firstname: String!
    $profile_picture: String!
  ) {
    update_devlinks_user_by_pk(
      pk_columns: { id: $id }
      _set: {
        lastname: $lastname
        email: $email
        firstname: $firstname
        profile_picture: $profile_picture
      }
    ) {
      id
    }
  }
`;

// export const UPDATE_LINKS_MANY = gql``;

// export const DELETE_LINK_BY_PK = gql``;

// export const INSERT_LINKS_ONE = gql``;
