import React, { useState } from "react";
import "./App.css";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Home from "./components/Home/Home";
import Tienda from "./components/Tienda/Tienda";
// import Login from "./components/Login/Login";

import { Servicios } from "./components/Servicios/Servicios";
import { Reserva } from "./components/Reserva/Reserva";
import CrearProducto from "./components/CrearProducto/CrearProducto.jsx";
import CrearEmpleado from "./components/CrearEmpleado/CrearEmpleado";
import Detalle from "./components/Detalle/Detalle";
import Profile from "./components/Profile/Profile";

//LOGIN JWT
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
//CIERRA LOGIN JWT
import comoComprar from "./components/Chatbot/ComoComprar";
import comoReservar from "./components/Chatbot/ComoReservar";

/* ------------------------------------------------ */

import PrivateRoute from "./routers/PrivateRoute";
import { useEffect } from "react";
import { revalidarAuth } from "./redux/actions/index";
import { PrivateAdmin } from "./routers/PrivateAdmin";
import { AdminPanel } from "./components/admin/AdminPanel";
import { AdminRoute } from "./routers/AdminRoute";

function App() {

  const {isAuth, user} = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(revalidarAuth());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          {/* LOGIN */}

          {/* crear componente para admin y de perfil y proteger */}
          <Route exact path="/auth/login" component={Login} />
          <Route exact path="/auth/register" component={Register} />
          {/* SUMAR PROFILE COMO RUTA PRIVADA */}
          {/* SUMAR ACCESO A LOGIN DE ADMINISTRADOR */}
          {/* <Redirect to='/auth/login' /> */}
          {/* CIERRA LOGIN */}
          {/* <Route exact path="/login" component={Login} /> */}
          <Route exact path="/" component={Home} />
          <Route exact path="/tienda" component={Tienda} />
          <Route exact path="/tienda/:id" component={Detalle} />

          <Route exact path="/servicios" component={Servicios} />
          <Route exact path="/reserva" component={Reserva} />
          <Route exact path="/crearproductos" component={CrearProducto} />
          <Route exact path="/crearempleado" component={CrearEmpleado} />
          <Route exact path="/comocomprar" component={comoComprar} />
          <Route exact path="/comoreservar" component={comoReservar} />

          <PrivateAdmin 
            path='/admin'
            component={AdminRoute}
            isAuth={isAuth}
            admin={user.rol}
          />

          <PrivateRoute
            path="/profile/:idUser"
            component={Profile}
            isAuth={isAuth}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
