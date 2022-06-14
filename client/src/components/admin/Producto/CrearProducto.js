import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { fetchConToken, fetchConTokenFiles } from "../../../helpers/fetch";
import { addProductos, addProductosAdmin, ADD_PRODUCT } from "../../../redux/actions";

import './productos.css'


export const CrearProducto = () => {
  const { categorias } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    stock: 0,
    price: 0,
    categoria: "",
    detail: ""
  });

  const [archivo, setArchivo] = useState({})
  const [loading, setLoading] = useState(false);

  const handleChange = ({ target }) => {
    if (target.name === "stock" || target.name === "price") {
      setForm({
        ...form,
        [target.name]: Number(target.value),
      });
    } else {
      setForm({
        ...form,
        [target.name]: target.value,
      });
    }
  };

  const archivoChange = ({ target }) => {
    setArchivo(target.files[0])
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true)
    fetchConToken('products', form, 'POST')
      .then(resp => resp.json())
      .then(data => {
        if (data.ok) {
          fetchConTokenFiles(`upload/productos/${data.producto.id}`, archivo, 'POST')
            .then(response => response.json())
            .then(dat => {
              if (dat.ok) {
                setLoading(false)
                Swal.fire('Success', `${dat.modelo.name} creado correctamente`, 'success')
                dispatch(addProductosAdmin(dat.modelo));
                dispatch({ type: ADD_PRODUCT, payload: dat.modelo })
              } else {
                setLoading(false)
                Swal.fire('Error', dat.msg, 'error')
              }
            })
            .catch(e => console.log(e))
          } else {
            
            setLoading(false)
            if (data.errors.name) {
              Swal.fire('Error', data.errors.name.msg, 'error')
            } else if (data.errors.categoria) {
              Swal.fire('Error', data.errors.categoria.msg, 'error')
            } else if (data.errors.detail) {
              Swal.fire('Error', data.errors.detail.msg, 'error')
          }

        }
      })
      .catch(e => console.log(e))

  };

  return (
    <div>
      {
        loading 
        ? <div className="loader"></div>
        :
        <form onSubmit={handleSubmit}>
          <h1 className="display-3">Nuevo Producto</h1>
          <div className="input-group mb-3 row">
            <div className="col">
              <input
                className="form-control"
                type="text"
                name="name"
                placeholder="Nombre del producto"
                onChange={handleChange}
              />
            </div>

            <div className="col">
              <input
                className="form-control"
                type="number"
                name="stock"
                placeholder="Stock"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="input-group mb-3 row">
            <div className="col">
              <input
                className="form-control"
                type="number"
                name="price"
                placeholder="Precio"
                onChange={handleChange}
              />
            </div>
            <div className="col">
              <select
                className="form-select"
                name="categoria"
                onChange={handleChange}
              >
                <option name="categoria">Selecciona una categoria</option>
                {categorias.map((categoria) => (
                  <option
                    key={categoria.id}
                    name="categoria"
                    value={categoria.categorie}
                  >
                    {categoria.categorie}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="input-group mb-3 row">
            <div className="col">
              <input type="file"
                className="form-control"
                id="inputGroupFile04"
                aria-describedby="inputGroupFileAddon04"
                aria-label="Upload"
                name="img"
                onChange={archivoChange} />
            </div>
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
