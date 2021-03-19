import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";

import { loadableReady } from "@loadable/component";

;
import App from "./App";

import {Provider} from "react-redux";
import {productReducer} from "./store";
import {applyMiddleware, compose, createStore} from "redux";
import thunk from "redux-thunk";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/"
});



const composeEnhanchers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  productReducer,
  window.INITIAL_STATE,
  composeEnhanchers(
    applyMiddleware(thunk.withExtraArgument(axiosInstance))
  )
);

loadableReady(() => { 
  let g = {}
  let APP_DATA = document.getElementById("APP_DATA")
  if (APP_DATA && APP_DATA.innerText && APP_DATA.innerText !== "undefined") {
    g = JSON.parse(APP_DATA.innerText)
  }
  

  hydrate(
    <
      Provider store={store}>
      <BrowserRouter>
        <App componentProps={g} />
      </BrowserRouter>
    </Provider>
      ,
    document.getElementById("root"), 
    ()=>removeScript(APP_DATA)
  );
});

if (module.hot) {
  module.hot.accept();
}

function removeScript(APP_DATA) {
  APP_DATA.parentNode.removeChild(APP_DATA)
}
