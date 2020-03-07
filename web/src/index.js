import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import appModel from "./models";
import { createStore, StoreProvider } from "easy-peasy";
import { Provider as UrqlProvider, createClient, defaultExchanges, subscriptionExchange } from 'urql';
import { SubscriptionClient } from 'subscriptions-transport-ws';

const store = createStore(appModel);
const subscriptionClient = new SubscriptionClient(
  process.env.REACT_APP_WEBSOCKET_ENDPOINT,
  {}
);
const gqlclient = createClient({
  url: "/query",
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription: operation => subscriptionClient.request(operation)
    })
  ]
})

ReactDOM.render(
  <UrqlProvider value={gqlclient}>
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  </UrqlProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
