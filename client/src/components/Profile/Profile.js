import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ComprasPerfil } from "./compras/ComprasPerfil";
import { EditarPerfil } from "./editar/EditarPerfil";
import { Navbar } from "./navbar/Navbar";
import "./Profile.css";
import { ReservasPerfil } from "./reservas/ReservasPerfil";

const Profile = () => {

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
