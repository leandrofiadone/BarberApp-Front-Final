import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { fetchConToken, fetchConTokenFiles } from "../../../helpers/fetch";
import {
  addService,
  ADD_SERVICE,
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
    state: true,
  });
  const [archivo, setArchivo] = useState(false);
  const [loading, setLoading] = useState(false);
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

  const selectImg = ({target}) => {
    setArchivo(target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    if(!archivo){
      setLoading(false)
      Swal.fire('Error', 'Por favor selecciona una imagen para el producto', 'error')
      return;
    }

    fetchConToken('services', form, 'POST')
      .then(resp => resp.json())
      .then(data => {
        if(data.ok){
            fetchConTokenFiles(`upload/servicios/${data.id}`, archivo, 'POST')
              .then(result => result.json())
              .then( dat => {
                if(dat.ok){
                  setLoading(false)
                  Swal.fire('Success', `${dat.modelo.name} agregado correctamente`)
                  dispatch({type: ADD_SERVICE, payload: dat.modelo})
                  dispatch(getAdminAllServices());
                  dispatch(getServices());
                  history.push("/admin/service");
                }else{
                  setLoading(false)
                  Swal.fire('Error', dat.msg, 'error')
                }
              })
        }else{
          setLoading(false)
          if(data.errors){
            if(data.errors.name){
              Swal.fire('Error', data.errors.name.msg, 'error')
            }else if(data.errors.detail){
              Swal.fire('Error', data.errors.detail.msg, 'error')
            }else if(data.errors.price){
              Swal.fire('Error', data.errors.price.msg, 'error')
            }else if(data.errors.time){
              Swal.fire('Error', data.errors.time.msg, 'error')
            }
          }
        }
      })


    // await dispatch(addService(form));
  };
  return (
    <div>

      {
        loading ? <h1>Cargando</h1>
        :
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
                type="file"
                name="img"
                placeholder="Url imagen.."
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
                placeholder="Detalle"
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
