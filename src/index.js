import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import {
//   legacy_createStore as createStore,
//   applyMiddleware,
//   combineReducers,
// } from "redux";
// import { Provider } from "react-redux";
// import thunk from "redux-thunk";

// const defaultState = {
//   cash: 0,
// };

// action = { type: "", payload: "" };
// const reducer = (state = defaultState, action) => {
//   switch (action.type) {
//     case "":
//       consosle.log("dfgds");
//   }
// };

// const store = createStore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
