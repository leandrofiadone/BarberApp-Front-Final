import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { deleteDate, EliminarCita } from "../../../redux/actions";

import "./ReservasPerfil.css";

export const ReservasPerfil = React.memo(() => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);
  const { citas } = useSelector((state) => state);

  const filtrado = citas.filter((e) => e.idUser === user.id);

  const cancelarCitas = (id) => {
    Swal.fire({
      title: "Estas seguro que quieres cancelar tu cita?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d8",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si,cancelar cita!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Cita cancelada!",
          icon: "success",
          showConfirmButton: false,
          timer: 900,
        });
      }
      dispatch(deleteDate(id));
    });
  };

  return (
    <div>
      <table className="table table-dark table-striped text-center">
        <thead>
          <tr>
            <th scope="col">Fecha </th>
            <th scope="col"> Hora</th>
            <th scope="col">Barbero</th>
            <th scope="col">Servicio</th>
            <th scope="col">Estado</th>
            <th scope="col">Cancelar Cita</th>
          </tr>
        </thead>
        <tbody>
          {filtrado.map((e, index) => (
            <tr key={index}>
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
                  <button
                    className="btn btn-warning botonReservaUsuario"
                    disabled
                  >
                    Pendiente
                  </button>
                ) : (
                  <button
                    className="btn btn-success botonReservaUsuario"
                    disabled
                  >
                    Finalizada
                  </button>
                )}
              </td>
              <td className="text-white">
                <div className="btn-group" role="group" aria-label="acciones">
                  {e.state ? (
                    <button
                      className="btn btn-outline-danger botonCancelar"
                      onClick={() => cancelarCitas(e.id)}
                    >
                      Cancelar cita
                    </button>
                  ) : (
                    <div> </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});
