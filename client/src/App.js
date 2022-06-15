import React from "react";
import { Provider } from 'react-redux';
import { CartProvider } from 'react-use-cart';
import { AppRouter } from "./routers/AppRouter";
import store from './redux/Store/index'
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css';

export const App = () => {
  return (
    <Provider store={store}>

      <CartProvider>
        <GoogleOAuthProvider clientId = "53723635799-h12nqq7lneb87l2nvtid71he98aoop60.apps.googleusercontent.com">
        <AppRouter />
        </GoogleOAuthProvider>
      </CartProvider>
    </Provider>
  );
}



