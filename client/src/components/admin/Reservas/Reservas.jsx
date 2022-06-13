import React, { useState } from "react";

import { useSelector } from "react-redux";

import "./Reservas.css";

const Reservas = () => {
  const { user } = useSelector((state) => state);
  const { allCitas } = useSelector((state) => state);

  const filtrado = allCitas.filter((e) => e);
  console.log(filtrado);

  const [state, setState] = useState(false);

  const handleChange = () => {
    setState(!state);
  };

  const citaFalse = () => {
    filtrado.state === false;
  };
  const citaTrue = () => {
    filtrado.state === true;
  };

  return (
    <div>
      <table className="table table-dark table-striped text-center">
        <thead>
          <tr>
            <th scope="col">Cliente</th>
            <th scope="col">Email</th>
            <th scope="col">Fecha </th>
            <th scope="col">Hora</th>
            <th scope="col">Barbero</th>
            <th scope="col">Servicio</th>
            <th scope="col">Canceladas</th>
            <th scope="col">Estado</th>
          </tr>
        </thead>
        <tbody>
          {filtrado.map((e, index) => (
            <tr key={index}>
              <td className="text-white">{e.user.name}</td>
              <td className="text-white">{e.user.email}</td>
              <td className="text-white">
                {new Date(e.date).toLocaleString("en-GB").slice(0, 10)}
              </td>
              <td className="text-white">
                {new Date(e.date).toLocaleString("en-GB").slice(11)}
              </td>
              <td className="text-white"> {e.employee.name}</td>
              <td className="text-white">{e.services[0].name}</td>
              <td>
                <div className="btn-group" role="group" aria-label="acciones">
                  {e.state ? (
                    <button
                      disabled
                      onClick={citaFalse}
                      className="btn btn-danger botonReservaUsu"
                    >
                      Cancelada
                    </button>
                  ) : (
                    <div></div>
                  )}
                </div>
              </td>
              <td>
                <div className="btn-group" role="group" aria-label="acciones">
                  {state ? (
                    <button
                      onClick={handleChange}
                      className="btn btn-warning botonReservaUsu"
                    >
                      Pendiente
                    </button>
                  ) : (
                    <button
                      onClick={handleChange}
                      className="btn btn-success botonReservaUsu"
                    >
                      Finalizada
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reservas;
