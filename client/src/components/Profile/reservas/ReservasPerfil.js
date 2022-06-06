import React from "react";
import { useSelector } from "react-redux";

export const ReservasPerfil = () => {
  const { user } = useSelector((state) => state);
  const citas = useSelector((state) =>
    state.citas.filter((e) => e.idUser === user.id)
  );

  return (
    <div>
      {citas.map((e, index) => (
        <ul key={index}>
          <li className="text-light">Fecha y hora: {e.date}</li>
          <li className="text-light"> Empleado: {e.employee.name}</li>
          <li className="text-light"> Servicio: {e.services[0].name}</li>
        </ul>
      ))}
    </div>
  );
};
