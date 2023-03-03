import React from "react";
import ReactDOM from "react-dom/client";
import store from "./redux/app/store";
import { Provider } from "react-redux";
import Login from "./components/login/Login";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Login />
  </Provider>
);
