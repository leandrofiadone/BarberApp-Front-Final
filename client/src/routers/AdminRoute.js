import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Producto from "../components/admin/Producto/Producto";
import { AdminPanel } from "../components/admin/AdminPanel";
import { Navbar } from "../components/admin/navbar/Navbar";
import FormularioProductos from "../components/admin/Producto/FormularioProductos";
import "./router.css";
import { Usuarios } from "../components/admin/usuarios/Usuarios";
import { CrearProducto } from "../components/admin/Producto/CrearProducto";
import Reservas from "../components/admin/Reservas/Reservas";
import Categoria from "../components/admin/Categoria/Categoria";
import { CrearCategoria } from "../components/admin/Categoria/CrearCategoria";
import Empleado from "../components/admin/Empleado/Empleado";
import { CrearEmpleado } from "../components/admin/Empleado/CrearEmpleado";
import FormularioEmpleado from "../components/admin/Empleado/FormularioEmpleado";
import Servicio from "../components/admin/Servicio/Servicio";
import { CrearServicio } from "../components/admin/Servicio/CrearServicio";
import { FormularioServicio } from "../components/admin/Servicio/FormularioServicio";
import { Graficos } from "../components/admin/Dashboard/Graficos";

export const AdminRoute = () => {
  return (
    <div className="main-adminRoute">
      {/* este es el menu del panel de administracion */}
      <Navbar />
      <section>
        <Switch>
          <Route exact path="/admin/product" component={Producto} />
          <Route exact path="/admin/product/add" component={CrearProducto} />
          <Route
            exact
            path="/admin/product/:id"
            component={FormularioProductos}
          />
          <Route exact path="/admin/usuarios" component={Usuarios} />
          <Route exact path="/admin/reservas" component={Reservas} />
          <Route exact path="/admin/categories" component={Categoria} />
          <Route
            exact
            path="/admin/categories/add"
            component={CrearCategoria}
          />
          <Route exact path="/admin/employee" component={Empleado} />
          <Route exact path="/admin/employee/add" component={CrearEmpleado} />
          <Route
            exact
            path="/admin/employee/:id"
            component={FormularioEmpleado}
          />
          <Route exact path="/admin/service" component={Servicio} />
          <Route exact path="/admin/service/add" component={CrearServicio} />
          <Route
            exact
            path="/admin/service/:id"
            component={FormularioServicio}
          />
          <Route exact path="/admin/dashboard" component={Graficos} />
          {/* aqui se definen las rutas de admin */}

          <Redirect to="/admin/dashboard" />
        </Switch>
      </section>
    </div>
  );
};
