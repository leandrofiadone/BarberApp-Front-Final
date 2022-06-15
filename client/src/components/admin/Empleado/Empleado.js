import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  deleteEmpleado,
  detalleEmployee,
  getAdminAllEmpleados,
  getEmployee,
  updateEmpleados,
} from "../../../redux/actions";
import "./Empleado.css";

export default function Empleado() {
  const history = useHistory();
  const { adminAllEmpleados } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    await dispatch(deleteEmpleado(id));
    await dispatch(getAdminAllEmpleados());
    await dispatch(getEmployee());
  };

  const handleActive = async (empleado) => {
    await dispatch(updateEmpleados(empleado));
    await dispatch(getAdminAllEmpleados());
  };

  const handleDetailProduct = (idEmployee) => {
    dispatch(detalleEmployee(idEmployee));
  };
  return (
    <>
      <h1>Empleados</h1>
      <table className="table table-dark table-striped text-center">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Empleado Barbero</th>
            <th scope="col">Dni</th>
            <th scope="col">Estado</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {adminAllEmpleados.map((empleado, index) => {
            return (
              <tr key={empleado.id}>
                <th scope="row">{index + 1}</th>
                <td className="text-white"> {empleado.name}</td>
                <td className="text-white"> {empleado.dni}</td>
                <td className="text-white">
                  {empleado?.availability ? "Disponible" : "No Disponible"}
                </td>
                <td className="text-white">
                  <div className="btn-group" role="group" aria-label="acciones">
                    <button className="btn btn-outline-primary btn-edit">
                      <Link
                        to={`/admin/employee/${empleado.id}`}
                        onClick={() => handleDetailProduct(empleado.id)}
                      >
                        Edit
                      </Link>
                    </button>
                    {empleado?.availability ? (
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => handleDelete(empleado.id)}
                      >
                        Eliminar
                      </button>
                    ) : (
                      <button
                        className="btn btn-outline-success"
                        onClick={() =>
                          handleActive({
                            id: empleado.id,
                            availability: true,
                          })
                        }
                      >
                        Activar
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div>
        <Link to={`/admin/employee/add`} className="div_pie">
          <button className="btn_agregar btn btn-outline-success">+</button>
        </Link>
      </div>
    </>
  );
}
