import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  makeVar,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { userType } from "./types";

// Load environment variables
const HASURA_GRAPHQL_ENDPOINT = import.meta.env.VITE_HASURA_GRAPHQL_ENDPOINT;
const HASURA_ADMIN_SECRET = import.meta.env.VITE_HASURA_ADMIN_SECRET;

const httpLink = createHttpLink({
  uri: HASURA_GRAPHQL_ENDPOINT, // Use environment variable
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "x-hasura-admin-secret": HASURA_ADMIN_SECRET, // Use environment variable
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export const userState = makeVar<userType | null>(null);
export const dataChangingState = makeVar<boolean>(false);

export const platforms: string[] = [
  "Github",
  "Frontend Mentor",
  "Twitter",
  "Linkedin",
  "Youtube",
  "Facebook",
  "Twitch",
  "Dev.to",
  "Codewars",
  "Codepen",
  "freeCodeCamp",
  "Gitlab",
  "Hashnode",
  "Stack Overflow",
];

export default client;
