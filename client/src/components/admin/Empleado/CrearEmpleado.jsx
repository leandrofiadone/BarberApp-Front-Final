import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import {
  addEmployee,
  getAdminAllEmpleados,
  getEmployee,
} from "../../../redux/actions";

export const CrearEmpleado = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [form, setForm] = useState({
    name: "",
    dni: "",
  });

  const handleChange = ({ target }) => {
    setForm({
      ...form,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(form.dni.length > 10){
      return Swal.fire('Error', 'El dni no puede tener mas de 10 numeros', 'error')
    }

    await dispatch(addEmployee(form));
    await dispatch(getAdminAllEmpleados());
    await dispatch(getEmployee());
    history.push("/admin/employee");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1 className="display-3">Nuevo Empleado</h1>
        <div className="input-group mb-3 row">
          <div className="col">
            <input
              className="form-control"
              type="text"
              name="name"
              placeholder="Nombre del Empleado..."
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="input-group mb-3 row">
          <div className="col">
            <input
              className="form-control"
              type="text"
              name="dni"
              placeholder="Dni del empleado..."
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
