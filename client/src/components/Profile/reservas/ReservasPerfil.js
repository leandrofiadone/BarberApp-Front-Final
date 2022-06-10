import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { deleteDate, deleteDateTable } from "../../../redux/actions";

import "./ReservasPerfil.css";

export const ReservasPerfil = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);
  const { citas } = useSelector((state) => state);

  const filtrado = citas.filter((e) => e.idUser === user.id);
  console.log(filtrado);
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
        });
        dispatch(deleteDate(id));
        setTimeout(() => {
          window.location.reload();
        }, 350);
      }
    });
  };

  const fil = citas.filter((e) => e.idUser === user.id);

  console.log(fil);

  return (
    <div>
      <table className="table table-dark table-striped text-center">
        <thead>
          <tr>
            <th scope="col">Fecha </th>
            <th scope="col"> Hora</th>
            <th scope="col">Barbero</th>
            <th scope="col">Servicio</th>
            <th scope="col">Cancelar Cita</th>
          </tr>
        </thead>
        <tbody>
          {filtrado.map((e, index) => (
            <tr key={index}>
              <td className="text-white"> {e.date.slice(0, 8)}</td>
              <td className="text-white"> {e.date.slice(9)}</td>
              <td className="text-white"> {e.employee.name}</td>
              <td className="text-white">{e.services[0].name}</td>
              <td className="text-white">
                <div className="btn-group" role="group" aria-label="acciones">
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => cancelarCitas(e.id)}
                  >
                    Cancelar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
