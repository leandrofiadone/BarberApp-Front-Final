import React from "react";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { addEmployee, getEmployee } from "../../redux/actions/index";

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
    console.log(employee);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addEmployee(employee));
    dispatch(getEmployee());
    history.push("/");
  };
  return (
    <div>
      <h1 class="mt-5">Registra tus Empleados</h1>
      <form class="mx-5 mt-2" onSubmit={handleSubmit}>
        <div>
          <div class="d-flex">
            <label>Nombre:</label>
          </div>
          <div class="d-flex max-w-full ">
            <input
              class="form-control"
              placeholder="Nombre.."
              type="text"
              name="name"
              onChange={handleInputChange}
            />
          </div>
          <div class="d-flex mt-2">
            <label>Disponibilidad:</label>
          </div>
          <div class="d-flex h-1.5">
            <select
              class="form-select"
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
          <button class="btn btn-warning fw-bold" type="submit">
            Registrar
          </button>
          <Link to="/">
            <button class="btn btn-warning fw-bold"> Volver</button>
          </Link>
        </div>
      </form>
    </div>
  );
}
