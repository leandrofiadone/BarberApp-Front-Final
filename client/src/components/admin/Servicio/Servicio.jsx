import React from "react";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  updateService,
  deleteService,
  detalleService,
  getAdminAllServices,
  getServices,
} from "../../../redux/actions";

export default function Servicio() {
  const { adminAllServices } = useSelector((state) => state);

  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteService(id));
    dispatch(getAdminAllServices());
  };

  const handleActive = async (serviceU) => {
    //console.log("srvUpdate", serviceU);
    await dispatch(updateService(serviceU));
    await dispatch(getAdminAllServices());
    await dispatch(getServices());
  };

  const handleDetailService = (id) => {
    dispatch(detalleService(id));
  };
  return (
    <>
      <table className="table table-dark table-striped text-center">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Servicio</th>
            <th scope="col">Detalle</th>
            <th scope="col">Precio</th>
            <th scope="col">Duracion</th>
            <th scope="col">Estado</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {adminAllServices.map((servicio, index) => {
            return (
              <tr key={servicio.id}>
                <th scope="row">{index + 1}</th>
                <td className="text-white"> {servicio.name}</td>
                <td className="text-white"> {servicio.detail}</td>
                <td className="text-white"> {servicio.price}</td>
                <td className="text-white"> {servicio.time}</td>
                <td className="text-white">
                  {servicio.state ? "Activo" : "Desactivo"}
                </td>
                <td className="text-white">
                  <div className="btn-group" role="group" aria-label="acciones">
                    <button className="btn btn-outline-primary btn-edit">
                      <Link
                        to={`/admin/service/${servicio.id}`}
                        onClick={() => handleDetailService(servicio.id)}
                      >
                        Edit
                      </Link>
                    </button>
                    {servicio.state ? (
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => handleDelete(servicio.id)}
                      >
                        Eliminar
                      </button>
                    ) : (
                      <button
                        className="btn btn-outline-success"
                        onClick={() =>
                          handleActive({ id: servicio.id, state: true })
                        }
                      >
                        Activar
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <Link to={`/admin/service/add`} className="div_pie">
          <button className="btn_agregar btn btn-outline-success">+</button>
        </Link>
      </div>
    </>
  );
}
