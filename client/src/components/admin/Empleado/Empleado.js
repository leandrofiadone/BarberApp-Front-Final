import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  activarProducto,
  deleteProduct,
  detalleDeProductos,
} from "../../../redux/actions";
import "./productos.css";

export default function Empleado() {
  const { adminAllEmpleados } = useSelector((state) => state);

  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  const handleActive = (id) => {
    console.log(id);
    dispatch(activarProducto(id));
  };

  const handleDetailProduct = (id) => {
    dispatch(detalleDeProductos(id));
  };

  // useEffect(() => {
  //     console.log('hey')
  //     dispatch(adminGetAllProducts())
  // }, [dispatch]);
  return (
    <>
      <table className="table table-dark table-striped text-center">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Empleado Barbero</th>
            <th scope="col">Estado</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {adminAllEmpleados.map((empleado, index) => {
            console.log(empleado, index);
            return (
              <tr key={empleado.id}>
                <th scope="row">{index + 1}</th>
                <td className="text-white"> {empleado.name}</td>
                <td className="text-white">
                  {empleado.state ? "Activo" : "Desactivo"}
                </td>
                <td className="text-white">
                  <div className="btn-group" role="group" aria-label="acciones">
                    <button className="btn btn-outline-primary btn-edit">
                      <Link
                        to={`/admin/product/${empleado.id}`}
                        onClick={() => handleDetailProduct(empleado.id)}
                      >
                        Edit
                      </Link>
                    </button>
                    {empleado.state ? (
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => handleDelete(empleado.id)}
                      >
                        Eliminar
                      </button>
                    ) : (
                      <button
                        className="btn btn-outline-success"
                        onClick={() => handleActive(empleado.id)}
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

      <div className="div_pie">
        <Link to={`/admin/employee/add`} className="LinkDetail">
          <button className="btn_agregar">+</button>
        </Link>
      </div>
    </>
  );
}
