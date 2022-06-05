import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from "react-router-dom";
import { logout } from "../../redux/actions";
import { ComprasPerfil } from "./compras/ComprasPerfil";
import { EditarPerfil } from "./editar/EditarPerfil";
import './Profile.css';
import { ReservasPerfil } from "./reservas/ReservasPerfil";

const Profile = () => {
  
  const { user } = useSelector((state) => state);
  // const { citas } = useSelector((state) => state);
  // const filtrado = citas.filter((e) => e.idUser === user.id);

  const [section, setSection] = useState('editar')
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout())
  }

  const selectSection = (section) => {
    setSection(section)
  }

  return (
    <div className="main-perfil">
      <nav>
        <div className="img-perfil">
          <img src={user.img} alt={user.name} />
        </div>
        <h1>
          {user.name}
        </h1>

        <ul className="mt-3 list-group list-group-flush">
          <li className={`list-group-item pointer ${section === 'compras' ? 'bg-warning' : ''}`}
            onClick={() => selectSection('compras')}>Mis Compras</li>

          <li className={`list-group-item pointer ${section === 'reservas' ? 'bg-warning' : ''}`}
            onClick={() => selectSection('reservas')}>Mis Reservaciones</li>

          <li className={`list-group-item pointer ${section === 'editar' ? 'bg-warning' : ''}`}
            onClick={() => selectSection('editar')}>Editar</li>

          <li className="list-group-item">
            <NavLink to='/'>Volver a la tienda</NavLink>
          </li>

          <li
            className="list-group-item pointer"
            onClick={handleLogout}
          >
            Logout
          </li>

          {
            (user.rol === 'ADMIN') &&
            <li className="list-group-item">
              <NavLink to='/admin/main'>Administrador</NavLink>
            </li>
          }
        </ul>
      </nav>
      <section>
        {
          (section === 'editar') && <EditarPerfil id={user.id} />
        }
        {
          (section === 'compras') && <ComprasPerfil />
        }
        {
          (section === 'reservas') && <ReservasPerfil />
        }
      </section>
    </div>
  )
};

export default Profile;
