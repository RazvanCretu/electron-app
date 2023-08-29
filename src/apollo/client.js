import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const localToken = () => {
  // run client-side only
  if (typeof window !== "undefined") {
    const localToken = window.localStorage.getItem("token");
    return localToken || undefined;
  }
};

const httpLink = createHttpLink({
  uri: "http://localhost:1337/graphql",
  // uri: "https://razvicodes.herokuapp.com/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localToken();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
