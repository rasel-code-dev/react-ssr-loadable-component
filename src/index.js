// import "core-js";
import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";


import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import { Provider } from "react-redux";

import { loadableReady } from "@loadable/component";


import Axios from "axios";
import reducers from "./store/reducers";
import App from "./App";


const axiosInstance = Axios.create({
  baseURL: "/"
});

const composeEnhanchers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  reducers,
  window.INITIAL_STATE,
  composeEnhanchers(
    applyMiddleware(reduxThunk.withExtraArgument(axiosInstance))
  )
);

// import '../public/@fontawesome-pro-5.12.0-web/css/all.css'


loadableReady(() => { 
  let g = {}
  let APP_DATA = document.getElementById("APP_DATA")
  if (APP_DATA && APP_DATA.innerText && APP_DATA.innerText !== "undefined") {
    g = JSON.parse(APP_DATA.innerText)
  }

  hydrate(
    <Provider store={store}>
      <BrowserRouter>
        <App componentProps={g} />
      </BrowserRouter>
    </Provider>,
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
