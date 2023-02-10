import React from "react";
import ReactDOM from "react-dom/client";
import "../src/app/style/app.css";
import "bootstrap/dist/css/bootstrap.css";
import "../src/app/style/styles.css";
import "../src/app/style/modal.css";
import "bootstrap";
import App from "./app/App";
import { createStore } from "./app/store/createStore";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
const store = createStore();
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);
