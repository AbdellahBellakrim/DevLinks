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

export const UPSERT_ONE_LINK = gql`
  mutation UpsertDevlinksLink($objects: [devlinks_link_insert_input!]!) {
    insert_devlinks_link(
      objects: $objects
      on_conflict: {
        update_columns: [link, platform, updated_at]
        constraint: link_pkey
      }
    ) {
      returning {
        id
        link
        platform
        user_id
      }
    }
  }
`;
