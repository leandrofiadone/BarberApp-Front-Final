import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Producto from "../components/admin/Producto/Producto";
import { AdminPanel } from "../components/admin/AdminPanel";
import { Navbar } from "../components/admin/navbar/Navbar";
import FormularioProductos from "../components/admin/Producto/FormularioProductos";

export const AdminRoute = () => {
  return (
    <div>
      {/* este es el menu del panel de administracion */}
      <Navbar />
      <Switch>
        <Route exact path="/admin/main" component={AdminPanel} />
        <Route exact path="/admin/product" component={Producto} />
        <Route
          exact
          path="/admin/formularioProducto/:id"
          component={FormularioProductos}
        />
        {/* aqui se definen las rutas de admin */}
      </Switch>
    </div>
  );
};
