import React from "react";

import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import {
  getAdminAllEmpleados,
  getEmployee,
  updateEmpleados,
} from "../../../redux/actions/index";

const FormularioEmpleado = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const empleadoId = useSelector((state) => state.detalleEmpleado);

  const history = useHistory();
  const inicialState = {
    name: "",
    id: empleadoId.id
  };

  const [empleado, setEmpleado] = React.useState(inicialState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmpleado({
      ...empleado,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (empleado.name.length === 0 || empleado.name === empleadoId.name) {
      delete empleado.name;
    }
    empleado["id"] = empleadoId.id;
    await dispatch(updateEmpleados(empleado));
    await dispatch(getAdminAllEmpleados());
    await dispatch(getEmployee());
    history.push("/admin/employee");
  };
  return (
    <div>
      <h1 className="mt-5">Modificar Empleado</h1>
      <form className="mx-5 mt-2" onSubmit={handleSubmit}>
        <div>
          <div className="d-flex">
            <label>Nombre:</label>
          </div>
          <div className="d-flex max-w-full ">
            <input
              className="form-control"
              // placeholder="Nombre.."
              type="text"
              name="name"
              placeholder={empleadoId?.name ? empleadoId.name : "Nombre.."}
              onChange={handleInputChange}
            />
          </div>
          {/* <div className="d-flex">
            <label>Dni:</label>
          </div>
          <div className="d-flex max-w-full ">
            <input
              className="form-control"
              // placeholder="Nombre.."
              type="text"
              name="dni"
              placeholder={empleadoId?.dni ? empleadoId.dni : "Dni..."}
              onChange={handleInputChange}
            />
          </div> */}
        </div>

        <div className="linksCrearProducto mt-4">
          <button className="btn btn-warning fw-bold" type="submit">
            Registrar
          </button>
          <Link to="/admin/employee" className="LinkVolver">
            <button className="btn btn-info">Volver</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default FormularioEmpleado;
