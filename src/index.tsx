import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import "./styles/global.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import QueryProviders from "./HOC/QueryProvider";
import { store } from "./store/store";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryProviders>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryProviders>
    </Provider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
