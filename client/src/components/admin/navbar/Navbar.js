import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Navbar.css";
import { logout } from "../../../redux/actions";

export const Navbar = () => {
  const { user } = useSelector((state) => state);

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
          className="list-group-item text-dark"
          activeClassName="bg-warning"
          to="/admin/main"
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
          className="list-group-item"
          to="/admin/usuarios"
          activeClassName="bg-warning"
        >
          Usuarios
        </NavLink>

        <NavLink
          exact
          activeClassName="bg-warning"
          className="list-group-item"
          to="/"
        >
          Volver a la tienda
        </NavLink>

        <NavLink
          activeClassName="bg-warning"
          className="list-group-item"
          to="/profile"
        >
          Mi Perfil
        </NavLink>
      </ul>
    </nav>
  );
};
