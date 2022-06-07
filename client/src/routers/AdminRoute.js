import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Producto from "../components/admin/Producto/Producto";
import { AdminPanel } from "../components/admin/AdminPanel";
import { Navbar } from "../components/admin/navbar/Navbar";
import FormularioProductos from "../components/admin/Producto/FormularioProductos";
import "./router.css";
import { Usuarios } from "../components/admin/usuarios/Usuarios";
import { CrearProducto } from "../components/admin/Producto/CrearProducto";

export const AdminRoute = () => {
  return (
    <div className="main-adminRoute">
      {/* este es el menu del panel de administracion */}
      <Navbar />
      <section>
        <Switch>
          <Route exact path="/admin/main" component={AdminPanel} />
          <Route exact path="/admin/product" component={Producto} />
          <Route exact path="/admin/product/add" component={CrearProducto} />
          <Route
            exact
            path="/admin/product/:id"
            component={FormularioProductos}
          />
          <Route exact path="/admin/usuarios" component={Usuarios} />
          {/* aqui se definen las rutas de admin */}

          <Redirect to="/admin/main" />
        </Switch>
      </section>
    </div>
  );
};
