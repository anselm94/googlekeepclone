import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider as UrqlProvider, createClient, defaultExchanges, subscriptionExchange } from 'urql';
import { SubscriptionClient } from 'subscriptions-transport-ws';

const subscriptionClient = new SubscriptionClient(
  import.meta.env.REACT_APP_WEBSOCKET_ENDPOINT,
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
    <App />
  </UrqlProvider>,
  document.getElementById("root")
);
