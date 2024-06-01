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

export const linkExamples = {
  Github: "e.g. https://www.github.com/johnappleseed",
  "Frontend Mentor": "e.g. https://www.frontendmentor.io/profile/johnappleseed",
  Twitter: "e.g. https://www.twitter.com/johnappleseed",
  Linkedin: "e.g. https://www.linkedin.com/in/johnappleseed",
  Youtube: "e.g. https://www.youtube.com/johnappleseed",
  Facebook: "e.g. https://www.facebook.com/johnappleseed",
  Twitch: "e.g. https://www.twitch.tv/johnappleseed",
  "Dev.to": "e.g. https://www.dev.to/johnappleseed",
  Codewars: "e.g. https://www.codewars.com/users/johnappleseed",
  Codepen: "e.g. https://codepen.io/johnappleseed",
  freeCodeCamp: "e.g. https://www.freecodecamp.org/johnappleseed",
  Gitlab: "e.g. https://gitlab.com/johnappleseed",
  Hashnode: "e.g. https://hashnode.com/@johnappleseed",
  "Stack Overflow": "e.g. https://stackoverflow.com/users/.../johnappleseed",
};

export default client;
