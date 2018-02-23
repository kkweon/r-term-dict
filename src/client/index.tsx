import { ThemeProvider } from "emotion-theming";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";

import reduxPromise from "redux-promise-middleware";
import logger from "redux-logger";

import App from "./components/App";
import reducers from "./reducers";
import { fetchWords } from "./actions";

import "./layout/Global";
import theme from "./layout/theme";

const rootNode = document.getElementById("app");

if (!rootNode) throw new Error("#app is not found in the DOM");

const store = createStore(reducers, applyMiddleware(reduxPromise(), logger));

store.dispatch(fetchWords());


ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  rootNode,
);
