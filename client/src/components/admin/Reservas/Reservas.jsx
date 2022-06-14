import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import { EliminarCita } from "../../../redux/actions";

import "./Reservas.css";

const Reservas = () => {
  const { allCitas } = useSelector((state) => state);

  const dispatch = useDispatch();

  const handleChange = (id) => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Cita Finalizada",
      showConfirmButton: false,
      timer: 1500,
    });
    dispatch(EliminarCita(id));
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
            <th scope="col">Estado</th>

            <th scope="col">Finalizar</th>
          </tr>
        </thead>
        <tbody>
          {allCitas.map((e, index) => (
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
              <td className="text-white">
                {e.state === true ? (
                  <button className="btn btn-warning botonReservaUsu" disabled>
                    Pendiente
                  </button>
                ) : (
                  <button className="btn btn-success botonReservaUsu" disabled>
                    Finalizada
                  </button>
                )}
              </td>

              <td>
                <div
                  className="btn-group"
                  role="group"
                  aria-label="acciones"
                ></div>
                {e.state ? (
                  <button
                    onClick={() => handleChange(e.id)}
                    className="btn btn-outline-danger botonCancelarUsu"
                  >
                    Finalizar Cita
                  </button>
                ) : (
                  <div></div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reservas;
