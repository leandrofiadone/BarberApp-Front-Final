import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Navbar.css";
import {
  logout,
  revalidarAuth,
} from "../../../redux/actions";
import sinImage from '../../../assets/sin-img.jpeg'
import { fetchConTokenFiles } from "../../../helpers/fetch";
import Swal from "sweetalert2";
import { validarArchivo } from "../../../helpers/validar-archivo";

export const Navbar = () => {
  const { user, isAuth } = useSelector((state) => state);

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

    // validaciones
    const arrType = target.files[0].type.split('/');
    const extencion = arrType[arrType.length - 1];
    const fileValido = validarArchivo(extencion)
    console.log(fileValido)

    if(fileValido === true){
      const resp = await fetchConTokenFiles(`upload/usuario/${user.id}`, target.files[0], 'POST');
      const data = await resp.json();
  
      if(data.ok){
        dispatch(revalidarAuth())
        Swal.fire('Success', 'Imagen actualizada correctamente', 'success')
      }
    }else{
      Swal.fire('Error', fileValido, 'error')
    }

  }

  return (
    <nav className="navbar-profile">
      <div className="img-perfil" onClick={selectImage}>
        <img src={user.img ? user.img : sinImage} alt={user.name} />
      </div>
      <input type="file" id="img_user" onChange={changeImg} />
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
        <NavLink
          onClick={handleLogout}
          exact
          activeClassName="bg-warning"
          className="list-group-item pointer"
          to="/"
        >
          Logout
        </NavLink>
      </ul>
    </nav>
  );
};
