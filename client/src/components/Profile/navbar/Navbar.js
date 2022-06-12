import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Navbar.css";
import {
  getAdminAllEmpleados,
  getAdminAllServices,
  logout,
  getCategories,
} from "../../../redux/actions";

export const Navbar = () => {
  const { user, isAuth, categories } = useSelector((state) => state);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(logout());
    history.replace("/");
  };
  return (
    <nav className="navbar-profile">
      <div className="img-perfil">
        <img src={user.img} alt={user.name} />
      </div>
      <h1>{user.name}</h1>

      <ul className="mt-3 list-group list-group-flush">
        <NavLink
          className="list-group-item text-dark"
          activeClassName="bg-warning"
          to="/profile/compras"
        >
          Mis Compras
        </NavLink>

        <NavLink
          className="list-group-item pointer"
          activeClassName="bg-warning"
          to="/profile/reservas"
        >
          Mis Reservas
        </NavLink>
        <NavLink
          className="list-group-item pointer"
          activeClassName="bg-warning"
          to="/profile/editar"
        >
          Perfil
        </NavLink>
        <NavLink
          exact
          activeClassName="bg-warning"
          className="list-group-item pointer"
          to="/"
        >
          Volver
        </NavLink>

        {isAuth && user.rol === "ADMIN" && (
          <NavLink
            className="list-group-item"
            activeClassName="bg-warning"
            to="/admin/main"
          >
            Administrador
          </NavLink>
        )}
      </ul>
    </nav>
  );
};
