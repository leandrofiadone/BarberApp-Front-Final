import React from "react";
import { useSelector } from "react-redux";

export const ReservasPerfil = () => {
  const { user } = useSelector((state) => state);
  const { citas } = useSelector((state) => state);

  
  const fil = citas.filter((e) => e.idUser === user.id);
  
  console.log(fil)
  return (
    <div>
      {fil.map((e, index) => (
        <ul key={index}>
          <li className="text-light">Fecha y hora: {e.date}</li>

          <li className="text-light"> Servicio: {e.services[0].name}</li>
        </ul>
      ))}
    </div>
  );
};
