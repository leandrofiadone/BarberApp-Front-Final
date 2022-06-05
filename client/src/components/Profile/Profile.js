import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userActive } from "../../redux/actions";

const Profile = () => {
  const { user } = useSelector((state) => state);
  const { citas } = useSelector((state) => state);

  const filtrado = citas.filter((e) => e.idUser === user.id);

  return (
    <>
      <br />
      <br />
      {filtrado.map((e, index) => (
        <ul key={index}>
          <li>Fecha y hora: {e.date}</li>
          <li> Empleado: {e.employee.name}</li>
          <li> Servicio: {e.services[0].name}</li>
        </ul>
      ))}

      <h1>{user.name}</h1>
      <h2>Rol: {user.rol}</h2>

      <Link to="/">Volver</Link>

      {user.rol === "ADMIN" && (
        <button>
          <Link to="/admin">ADMINISTRADOR</Link>
        </button>
      )}
    </>
  );
};

export default Profile;
