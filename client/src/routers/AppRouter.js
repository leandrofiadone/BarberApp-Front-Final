import React, { useEffect } from "react";
import { BrowserRouter, HashRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "../components/Home/Home";
import Tienda from "../components/Tienda/Tienda";
// import Login from "./components/Login/Login";

import { Servicios } from "../components/Servicios/Servicios";
import { Reserva } from "../components/Reserva/Reserva";
import Detalle from "../components/Detalle/Detalle";
import Profile from "../components/Profile/Profile";

//LOGIN JWT
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
//CIERRA LOGIN JWT
import comoComprar from "../components/Chatbot/ComoComprar";
import comoReservar from "../components/Chatbot/ComoReservar";
import { ComprasPerfil } from "../components/Profile/compras/ComprasPerfil";

/* ------------------------------------------------ */

import PrivateRoute from "./PrivateRoute";
import {
  allProductos,
  getCategories,
  revalidarAuth,
  allCitas,
  crearCompra
} from "../redux/actions/index";
import { PrivateAdmin } from "./PrivateAdmin";
import { AdminRoute } from "./AdminRoute";

export const AppRouter = () => {
  const { isAuth, user } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(revalidarAuth());
    dispatch(allProductos());
    dispatch(getCategories());
    dispatch(allCitas());
    dispatch(crearCompra(user.id));
  }, [dispatch]);

  return (
    <HashRouter>
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          {/* auth */}
          <Route exact path="/auth/login" component={Login} />
          <Route exact path="/auth/register" component={Register} />

          {/* tienda */}
          <Route exact path="/tienda" component={Tienda} />
          <Route exact path="/tienda/:id" component={Detalle} />

          <Route exact path="/servicios" component={Servicios} />
          <Route exact path="/reserva" component={Reserva} />
          <Route exact path="/comocomprar" component={comoComprar} />
          <Route exact path="/comoreservar" component={comoReservar} />
          <Route exact path="/compras" component={ComprasPerfil} />

          <PrivateAdmin
            path="/admin"
            component={AdminRoute}
            isAuth={isAuth}
            admin={user.rol} //<--- error
          />

          <PrivateRoute path="/profile" component={Profile} isAuth={isAuth} />
        </Switch>
      </div>
    </HashRouter>
  );
};
