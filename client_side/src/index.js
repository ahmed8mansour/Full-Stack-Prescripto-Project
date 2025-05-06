import React from "react"
import ReactDom from "react-dom"
import "./css/style.css"
import "./fontawesome-free-6.6.0-web/css/all.min.css"
import "./bootstrap files/css/bootstrap.css"
// import "./bootstrap files/js/bootstrap.bundle.js"
// =========================
// =========================
//  refresh toekn file 
import "./store/RefreshToken.js"
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 


import * as bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';

window.bootstrap = bootstrap;

import { Provider } from "react-redux"
import  store  from "./store/index.js"

// components
import App from "./App.js"

ReactDom.render(
    <Provider store={store}>
        <App/> 
    </Provider>
    , 
    document.getElementById("root")
)

