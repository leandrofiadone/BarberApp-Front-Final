import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  addService,
  getAdminAllServices,
  getServices,
} from "../../../redux/actions";

export const CrearServicio = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [form, setForm] = useState({
    name: "",
    detail: "",
    price: null,
    time: null,
    img: "",
    state: true,
  });
  const hr = [];
  const min = [];
  for (let i = 0; i <= 23; i++) {
    hr[i] = i;
  }
  for (let i = 0; i < 60; i++) {
    min[i] = i;
  }
  const handleChange = ({ target }) => {
    setForm({
      ...form,
      [target.name]: target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("form", form);
    await dispatch(addService(form));
    await dispatch(getAdminAllServices());
    history.push("/admin/service");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1 className="display-3">Nuevo Servicio</h1>
        <div className="d-flex">
          <label>Nombre:</label>
        </div>
        <div className="input-group mb-3 row">
          <div className="col">
            <input
              className="form-control"
              type="text"
              name="name"
              placeholder="Nombre del servicio"
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
              placeholder="Precio..."
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
              placeholder="Url imagen.."
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
              placeholder="Detalle"
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
