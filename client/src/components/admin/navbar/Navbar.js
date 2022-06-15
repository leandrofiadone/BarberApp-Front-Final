import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./navbar.css";
import {
  getAdminAllEmpleados,
  getAdminAllServices,
  logout,
  getCategories,
  allProductos,
  allCitasAdmin,
  getAllUsers,
  getVentasUsuarios,
} from "../../../redux/actions";

export const Navbar = () => {
  const { user } = useSelector((state) => state);
  const { categories } = useSelector((state) => state);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(logout());
    history.replace("/");
  };
  return (
    <nav className="navbar-admin">
      <div className="img-perfil">
        <img src={user.img} alt={user.name} />
      </div>
      <h1>{user.name}</h1>

      <ul className="mt-3 list-group list-group-flush">
        <NavLink
          activeClassName="bg-warning"
          to='/admin/dashboard'
          className="list-group-item pointer"
          // activeClassName="bg-warning"

          onClick={async () => {
            await dispatch(allProductos());
            await dispatch(getVentasUsuarios());
            await dispatch(getAllUsers());
            await dispatch(allCitasAdmin());
            history.push("/admin/dashboard");
          }}
        >
          Inicio
        </NavLink>
        <NavLink
          className="list-group-item pointer"
          activeClassName="bg-warning"
          to="/admin/product"
        >
          Productos
        </NavLink>
        <NavLink
          className="list-group-item pointer"
          activeClassName="bg-warning"
          to="/admin/reservas"
        >
          Reservas Usuarios
        </NavLink>

        <NavLink
          className="list-group-item pointer"
          activeClassName="bg-warning"
          onClick={() => {
            dispatch(getCategories());
          }}
          to="/admin/categories"
        >
          Categorias
        </NavLink>
        <NavLink
          className="list-group-item pointer"
          activeClassName="bg-warning"
          onClick={() => {
            dispatch(getAdminAllEmpleados());
          }}
          to="/admin/employee"
        >
          Empleados
        </NavLink>
        <NavLink
          className="list-group-item pointer"
          activeClassName="bg-warning"
          onClick={() => {
            dispatch(getAdminAllServices());
          }}
          to="/admin/service"
        >
          Servicios
        </NavLink>
        <NavLink
          className="list-group-item"
          to="/admin/usuarios"
          activeClassName="bg-warning"
        >
          Usuarios
        </NavLink>

        <NavLink
          activeClassName="bg-warning"
          className="list-group-item"
          to="/profile"
        >
          Mi Perfil
        </NavLink>
        <NavLink
          exact
          activeClassName="bg-warning"
          className="list-group-item"
          to="/"
        >
          Volver
        </NavLink>
      </ul>
    </nav>
  );
};
