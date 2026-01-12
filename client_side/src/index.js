import React from "react"
import ReactDom from "react-dom"
import "./css/style.css"

// =========================
// =========================
//  refresh toekn file 
import "./store/RefreshToken.js"


import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


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

