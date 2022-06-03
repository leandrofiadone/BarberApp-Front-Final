import React from "react";
import { Provider } from 'react-redux';
import { CartProvider } from 'react-use-cart';
import { AppRouter } from "./routers/AppRouter";
import store from './redux/Store/index'
import './index.css';

export const App = () => {
  return (
    <Provider store={store}>
      <CartProvider>
        <AppRouter />
      </CartProvider>
    </Provider>
  );
}