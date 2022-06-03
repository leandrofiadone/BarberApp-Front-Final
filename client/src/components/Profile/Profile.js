import React, { useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { Link } from "react-router-dom";
import { userActive } from "../../redux/actions";

const Profile = () => {

  const {user} = useSelector(state => state);
  const dispatch = useDispatch();

  return (
    <>
      <h1>{user.name}</h1>
      <h2>Rol: {user.rol}</h2>
      
      <Link to='/'>Volver</Link>


      {
        (user.rol === 'ADMIN') &&
        <button>
          <Link to='/admin'>ADMINISTRADOR</Link>
        </button>
      }

    </>
  )
};

export default Profile;
