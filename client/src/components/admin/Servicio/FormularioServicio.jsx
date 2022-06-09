import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  updateService,
  getServices,
  getAdminAllServices,
} from "../../../redux/actions";

export const FormularioServicio = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const inicialState = {
    name: "",
    detail: "",
    price: null,
    time: null,
    img: "",
  };
  const serviceId = useSelector((state) => state.detalleServicio);
  const [service, setService] = React.useState(inicialState);

  const handleChange = ({ target }) => {
    setService({
      ...service,
      [target.name]: target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("form", form);
    if (service.name.length === 0 || service.name === serviceId.name) {
      delete service.name;
    }
    if (service.detail.length === 0 || service.detail === serviceId.detail) {
      delete service.detail;
    }
    if (service.price === null || service.price === serviceId.price) {
      delete service.price;
    }
    if (service.time === null || service.time === serviceId.time) {
      delete service.time;
    }
    if (service.img.length === 0 || service.img === serviceId.img) {
      delete service.img;
    }
    console.log(service);
    service["id"] = serviceId.id;
    await dispatch(updateService(service));
    await dispatch(getAdminAllServices());
    history.push("/admin/service");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1 className="display-3">Modificar Servicio</h1>
        <div className="d-flex">
          <label>Nombre:</label>
        </div>
        <div className="input-group mb-3 row">
          <div className="col">
            <input
              className="form-control"
              type="text"
              name="name"
              placeholder={
                serviceId?.name ? serviceId.name : "Nombre del servicio"
              }
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="d-flex">
          <label>Precio:</label>
        </div>
        <div className="input-group mb-3 row">
          <div className="col">
            <input
              className="form-control"
              type="number"
              name="price"
              placeholder={serviceId?.price ? serviceId.price : "Precio..."}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="d-flex">
          <label>Tiempo que dura:</label>
        </div>
        <div className="d-flex">
          <div className="col">
            <input
              className="form-control"
              type="time"
              name="time"
              defaultValue={serviceId?.time && serviceId.time}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="input-group mb-3 row"></div>
        <div className="d-flex">
          <label>Imagen:</label>
        </div>
        <div className="input-group mb-3 row">
          <div className="col">
            <input
              className="form-control"
              type="text"
              name="img"
              placeholder={serviceId?.img ? serviceId.img : "Url imagen.."}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="d-flex">
          <label>Detalle:</label>
        </div>
        <div className="input-group mb-3 row">
          <div className="col">
            <textarea
              className="form-control"
              type="text"
              name="detail"
              placeholder={serviceId?.detail ? serviceId.detail : "Detalle"}
              onChange={handleChange}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-warning">
          Agregar
        </button>
      </form>
    </div>
  );
};
