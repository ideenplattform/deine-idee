import gql from "graphql-tag";
import React from "react";
import { render } from "react-dom";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";

import { IdeaList } from "./components/IdeaList";

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: "http://localhost:3000/graphql",
});

const client = new ApolloClient({
  cache: cache,
  link: link,
});

const App = (): JSX.Element => (
  <ApolloProvider client={client}>
    <div>
      <IdeaList />
    </div>
  </ApolloProvider>
);

render(<App />, document.getElementById("app"));

export default App;
