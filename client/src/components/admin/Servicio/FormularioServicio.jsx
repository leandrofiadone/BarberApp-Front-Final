import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { fetchConToken, fetchConTokenFiles } from "../../../helpers/fetch";
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
  };
  const serviceId = useSelector((state) => state.detalleServicio);
  const [service, setService] = useState(inicialState);
  const [archivo, setArchivo] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = ({ target }) => {
    setService({
      ...service,
      [target.name]: target.value,
    });
  };

  const selectImg = ({ target }) => setArchivo(target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
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

    service["id"] = serviceId.id;

    if (!archivo) {
      setLoading(false)
      await dispatch(updateService(service));
      await dispatch(getAdminAllServices());
      await dispatch(getServices());
      history.push("/admin/service");
    } else {
      fetchConToken(`services/${serviceId.id}`, service, 'PUT')
        .then(resp => resp.json())
        .then(data => {
          if (data.ok) {
            fetchConTokenFiles(`upload/servicios/${data.service.id}`, archivo, 'POST')
              .then(result => result.json())
              .then(dat => {
                if (dat.ok) {
                  setLoading(false)
                  Swal.fire('Success', `${dat.modelo.name} agregado correctamente`, 'success')
                  dispatch(getAdminAllServices());
                  dispatch(getServices());
                  history.push("/admin/service");
                } else {
                  setLoading(false)
                  Swal.fire('Error', dat.msg, 'error')
                }
              })
          } else {
            setLoading(false)
            Swal.fire('Error', 'Revisa los datos', 'error')
          }
        })
    }

  };
  return (
    <div>
      {
        loading ? <h1>Espera...</h1>
        :
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
                type="file"
                name="img"
                onChange={selectImg}
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
      }
    </div>
  );
};
