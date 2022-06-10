import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProductos } from "../../../redux/actions";

export const CrearProducto = () => {
  const { categorias } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    stock: 0,
    price: 0,
    categoria: "",
    detail: "",
    img: "https://m.media-amazon.com/images/I/71HMYf1sp1L._SX355_.jpg",
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProductos(form));
  };

  return (
    <div>
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
            <input
              type="url"
              name="img"
              className="form-control"
              placeholder="Ingresa una url de imagen"
              onChange={handleChange}
            />
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
    </div>
  );
};
