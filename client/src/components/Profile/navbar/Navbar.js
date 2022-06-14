import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Navbar.css";
import {
  getAdminAllEmpleados,
  getAdminAllServices,
  logout,
  getCategories,
  revalidarAuth,
} from "../../../redux/actions";
import sinImage from '../../../assets/sin-img.jpeg'
import { fetchConTokenFiles } from "../../../helpers/fetch";
import Swal from "sweetalert2";

export const Navbar = () => {
  const { user, isAuth, categories } = useSelector((state) => state);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(logout());
    history.replace("/");
  };

  const selectImage = () => {
    document.querySelector('#img_user').click()
  }
  
  const changeImg = async({target}) => {
    const resp = await fetchConTokenFiles(`upload/usuario/${user.id}`, target.files[0], 'POST');
    const data = await resp.json();

    if(data.ok){
      dispatch(revalidarAuth())
      Swal.fire('Success', 'Imagen actualizada correctamente', 'success')
    }
  }

  return (
    <nav className="navbar-profile">
      <div className="img-perfil" onClick={selectImage}>
        <img src={user.img ? user.img : sinImage} alt={user.name} />
        <input type="file" id="img_user" onChange={changeImg} />
      </div>
      <h1>{user.name}</h1>

      <ul className="mt-3 list-group list-group-flush">
        <NavLink
          exact
          className="list-group-item text-dark"
          activeClassName="bg-warning"
          to="/profile/compras"
        >
          Mis Compras
        </NavLink>

        <NavLink
          exact
          className="list-group-item pointer"
          activeClassName="bg-warning"
          to="/profile/reservas"
        >
          Mis Reservas
        </NavLink>
        <NavLink
          exact
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
