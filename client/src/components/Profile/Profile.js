import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import { logout, userActive } from "../../redux/actions";
import './Profile.css';

const Profile = () => {

  const { user } = useSelector(state => state);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div className="main-perfil">
      <nav>
        <div className="img-perfil">
          <img src="https://avatars.githubusercontent.com/u/11352458?v=4" alt={user.name} />
        </div>
        <h1>
          {user.name}
        </h1>

        <ul className="mt-3 list-group list-group-flush">
          <li className="list-group-item">Mis Compras</li>
          <li className="list-group-item">Mis Reservaciones</li>
          <li className="list-group-item">Editar</li>
          <li className="list-group-item">
            <Link to='/'>Volver a la tienda</Link>
          </li>
        </ul>


        <div className="dropup mas-opciones">
          <button className="btn btn-warning dropdown-toggle" type="button" id="masopciones" data-bs-toggle="dropdown" aria-expanded="false">
            More Options
          </button>
          <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="masopciones">
            <li 
              className="dropdown-item pointer"
              onClick={handleLogout}>
              Logout
            </li>
            <li><hr className="dropdown-divider" /></li>
            {
              (user.rol === 'ADMIN') &&
              (
                <li>
                  <Link className="dropdown-item link-admin" to="/admin/main">Administrador</Link>
                </li>
              )
            }
          </ul>
        </div>

      </nav>
      <section>

      </section>
    </div>
  )
};

export default Profile;
