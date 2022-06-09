import React from "react";

import { useSelector } from "react-redux";
import { useState } from "react";

const Reservas = () => {
  const { user } = useSelector((state) => state);
  const { citas } = useSelector((state) => state);
  const filtrado = citas.filter((e) => e.idUser === user.id);

  return (
    <div>
      <table className="table table-dark table-striped text-center">
        <thead>
          <tr>
            <th scope="col">Cliente</th>
            <th scope="col">Fecha </th>
            <th scope="col">Hora</th>
            <th scope="col">Barbero</th>
            <th scope="col">Servicio</th>
            <th scope="col">Estado</th>
          </tr>
        </thead>
        <tbody>
          {filtrado.map((e, index) => (
            <tr key={index}>
              <td className="text-white">{e.user.name}</td>
              <td className="text-white"> {e.date.slice(0, 8)}</td>
              <td className="text-white"> {e.date.slice(9)}</td>
              <td className="text-white"> {e.employee.name}</td>
              <td className="text-white">{e.services[0].name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reservas;
