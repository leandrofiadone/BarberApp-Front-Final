import React from "react";

import { useSelector } from "react-redux";

const Reservas = () => {
  const { user } = useSelector((state) => state);
  const { allCitas } = useSelector((state) => state);
  console.log(user);
  console.log(allCitas);

  const filtrado = allCitas.filter((e) => e);
  console.log(filtrado);

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
              <td className="text-white"> {e.date.slice(10)}</td>
              <td className="text-white"> {e.employee.name}</td>
              <td className="text-white">{e.services[0].name}</td>
              <td>
                <div className="btn-group" role="group" aria-label="acciones">
                  {e.state ? (
                    <button onClick={citaTrue} className="btn btn-warning">
                      Pendiente
                    </button>
                  ) : (
                    <button
                      disabled
                      onClick={citaFalse}
                      className="btn btn-success"
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
