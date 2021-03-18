// import "core-js";
import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";

import { loadableReady } from "@loadable/component";

;
import App from "./App";

import '../public/@fontawesome-pro-5.12.0-web/css/all.css'


loadableReady(() => { 
  let g = {}
  let APP_DATA = document.getElementById("APP_DATA")
  if (APP_DATA && APP_DATA.innerText && APP_DATA.innerText !== "undefined") {
    g = JSON.parse(APP_DATA.innerText)
  }

  hydrate(
    // <Provider store={store}>
      <BrowserRouter>
        <App componentProps={g} />
      </BrowserRouter>,
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
