import React from "react";
import { render } from "react-dom";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Nav } from "./components/Nav";
import { IdeaDetail } from "./components/IdeaDetail";
import { IdeaList } from "~/components/IdeaList";
import { Dashboard } from "~/components/Dashboard";

import './fontello/css/fontello.css';

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
    <div className="flex flex-col h-full w-full bg-gray-300">
      <Nav />
      <main className="relative h-full">
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/idea/:id" component={IdeaDetail} />
          <Route path="/page/:id" component={IdeaList} />
        </Switch>
      </main>
    </div>
  </ApolloProvider>
);

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("app")
);

export default App;
