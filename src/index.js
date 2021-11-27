import React from "react";
import ReactDOM from "react-dom";
import App from "./Login";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./redux/reducer";

function allStorage() {
  let values = [],
    keys = Object.keys(localStorage),
    i = keys.length;

  while (i--) {
    values.push(JSON.parse(localStorage.getItem(keys[i])));
  }
  return values;
}

const initialStore = {
  savedUser: allStorage(),
};

const store = createStore(reducer, initialStore);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
