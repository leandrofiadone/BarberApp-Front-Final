import React from "react";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { addEmployee, getEmployee } from "../../../redux/actions/index";

export default function CrearProducto() {
  const dispatch = useDispatch();
  const history = useHistory();
  const InitialState = {
    name: "",
    availability: true,
  };
  const [employee, setEmployee] = React.useState(InitialState);
  useEffect(() => {}, [dispatch]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee({
      ...employee,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addEmployee(employee));
    dispatch(getEmployee());
    history.push("/");
  };
  return (
    <div>
      <h1 className="mt-5">Registra tus Empleados</h1>
      <form className="mx-5 mt-2" onSubmit={handleSubmit}>
        <div>
          <div className="d-flex">
            <label>Nombre:</label>
          </div>
          <div className="d-flex max-w-full ">
            <input
              className="form-control"
              placeholder="Nombre.."
              type="text"
              name="name"
              onChange={handleInputChange}
            />
          </div>
          <div className="d-flex mt-2">
            <label>Disponibilidad:</label>
          </div>
          <div className="d-flex h-1.5">
            <select
              className="form-select"
              name="availability"
              onChange={handleInputChange}
            >
              <option key="1" name="availability" value={true}>
                Disponible
              </option>
              <option key="2" name="availability" value={false}>
                No Disponible
              </option>
            </select>
          </div>
        </div>

        <div className="linksCrearProducto mt-4">
          <button className="btn btn-warning fw-bold" type="submit">
            Registrar
          </button>
          <Link to="/admin/main">
            <button className="btn btn-warning fw-bold"> Volver</button>
          </Link>
        </div>
      </form>
    </div>
  );
}
