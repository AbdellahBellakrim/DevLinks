import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "https://funny-pangolin-55.hasura.app/v1/graphql", // Replace with your Hasura endpoint
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "x-hasura-admin-secret":
        "5Hm3747AHaFDCeN1JnQRFYYhvPHce0mmTDB9giwEG0Holbnh7YmbYJNr4FnNkpZL", // Replace with your Hasura admin secret
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
