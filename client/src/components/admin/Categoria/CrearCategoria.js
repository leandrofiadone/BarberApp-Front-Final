import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addCategorie, getCategories } from "../../../redux/actions";

export const CrearCategoria = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [form, setForm] = useState({
    categorie: "",
  });

  const handleChange = ({ target }) => {
    setForm({
      ...form,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addCategorie(form));
    dispatch(getCategories());
    history.push("/admin/categories");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1 className="display-3">Nueva Categoria</h1>
        <div className="input-group mb-3 row">
          <div className="col">
            <input
              className="form-control"
              type="text"
              name="categorie"
              placeholder="Nombre del producto"
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
