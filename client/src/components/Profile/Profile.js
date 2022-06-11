import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Switch, Route, Redirect } from "react-router-dom";
import { logout } from "../../redux/actions";
import {ComprasPerfil} from './compras/ComprasPerfil';
import { EditarPerfil } from './editar/EditarPerfil';
import { Navbar } from "./navbar/Navbar";
import "./Profile.css";
import { ReservasPerfil } from './reservas/ReservasPerfil'

const Profile = () => {
  const { user } = useSelector((state) => state);

  const [section, setSection] = useState("editar");
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const selectSection = (section) => {
    setSection(section);
  };

  return (
    <div className="main-perfil">
    {/* este es el menu del panel de administracion */}
    <Navbar />
    <section>
      <Switch>
        <Route exact path="/profile/editar" component={EditarPerfil} />
        <Route exact path="/profile/reservas" component={ReservasPerfil} />
        <Route exact path="/profile/compras" component={ComprasPerfil} />

        <Redirect to="/profile/editar" />
      </Switch>
    </section>
  </div>
  );
};

export default Profile;
