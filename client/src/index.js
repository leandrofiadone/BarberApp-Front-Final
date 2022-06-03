import React from "react";
import ReactDOM from "react-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import  store  from './redux/Store/index'
import "bootstrap/dist/css/bootstrap.min.css";
import { CartProvider } from 'react-use-cart';


ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Auth0Provider
        domain="dev-wx7gszft.us.auth0.com"
        clientId="LV1EfW5M94BfoHhQBkM1zQgANy8gNPqh"
        redirectUri={window.location.origin}
      >
        <CartProvider>
        <App />
        </CartProvider>
      </Auth0Provider>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
