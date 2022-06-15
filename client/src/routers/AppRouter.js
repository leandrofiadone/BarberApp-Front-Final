import React, { useEffect } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
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
import Landing from "../components/Landing/Landing";

//FAVOURITES
import Favourites from "../components/Favourites/Favourites";
//CIERRA FAVOURITES

//CHANGE PASSWORD
import sendMail from "../components/ChangePassword/SendMail";
import ChangePassword from "../components/ChangePassword/ChangePassword";
//CIERRA CHANGE PASSWORD

/* ------------------------------------------------ */

import PrivateRoute from "./PrivateRoute";
import {
  allProductos,
  getCategories,
  revalidarAuth,
  allCitas,
  allCitasAdmin,
  // crearCompra,
} from "../redux/actions/index";
import { PrivateAdmin } from "./PrivateAdmin";
import { AdminRoute } from "./AdminRoute";
import Reservas from "../components/admin/Reservas/Reservas";

export const AppRouter = () => {
  const { isAuth, user } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(revalidarAuth());
    dispatch(allCitas());

    dispatch(allCitasAdmin());
  }, [dispatch]);

  return (
    <HashRouter>
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/landing" component={Landing} />
          {/* auth */}
          <Route exact path="/auth/login" component={Login} />
          <Route exact path="/auth/register" component={Register} />

          {/* tienda */}
          <Route exact path="/tienda" component={Tienda} />
          <Route exact path="/tienda/:id" component={Detalle} />
          <Route exact path="/favourites/:id" component={Favourites} />
          <Route exact path="/servicios" component={Servicios} />
          <Route exact path="/reserva" component={Reserva} />
          <Route exact path="/comocomprar" component={comoComprar} />
          <Route exact path="/comoreservar" component={comoReservar} />
          {/* <Route exact path="/compras" component={ComprasPerfil} /> */}

          {/*       {/ChangePassword/} */}
          <Route
            exact
            path="/resetPassword/:idUser/:token"
            component={ChangePassword}
          />

          <PrivateAdmin
            path="/admin"
            component={AdminRoute}
            isAuth={isAuth}
            admin={user.rol} //<--- error
          />

          <PrivateRoute path="/profile" component={Profile} isAuth={isAuth} />
          <PrivateRoute path="/sendMail" component={sendMail} isAuth={isAuth} />
        </Switch>
      </div>
    </HashRouter>
  );
};
