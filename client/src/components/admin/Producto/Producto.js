import React, {useEffect} from "react";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { allProductos, deleteProduct, detalleDeProductos } from "../../../redux/actions";

export default function Producto() {
    
    const productos = useSelector((state) => state.productos);
    
    const dispatch = useDispatch();

    const handleDelete = (id) => {
        dispatch(deleteProduct(id));
    }

    const handleDetailProduct = (id) => {
        dispatch(detalleDeProductos(id))
    }

    return (
        <div>
            <div className="botonVolver">
                <Link to="/admin/main" className="LinkVolver btn btn-info">
                    Volver
                </Link>
            </div>
            <div className="containerTienda">
                <h1>Productos</h1>
            </div>

            <div>
                <br />
            </div>
            {productos.length > 0 ? (
                <div className="tabla_empleado">
                    <table className="table table-dark table-striped text-center">
                        <thead>
                            <tr className="bg-primary text-white">
                                <th scope="col">N°</th>
                                <th scope="col">Producto</th>
                                <th scope="col">Categoria</th>
                                <th scope="col">Detalle</th>
                                <th scope="col">Precio</th>
                                <th scope="col">Stock</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productos.map((producto) => {
                                return (
                                    <tr key={producto.id}>
                                        <td className="text-white">
                                            {productos.indexOf(producto) + 1}
                                        </td>
                                        <td className="text-white"> {producto.name}</td>
                                        <td className="text-white"> {producto.category.categorie}</td>
                                        <td className="text-white"> {producto.detail}</td>
                                        <td className="text-white"> {producto.price}</td>
                                        <td className="text-white"> {producto.stock}</td>
                                        <td className="text-white">
                                            <Link
                                                to={`/admin/formularioProducto/${producto.id}`}
                                                className="LinkDetail btn_edit"
                                                onClick={
                                                    () => handleDetailProduct(producto.id)
                                                }
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                className="btn_delet"
                                                onClick={() => 
                                                    handleDelete(producto.id)
                                                }
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            ) : (
                <span>No se encontro coincidencias</span>
            )}
            <div className="div_pie">
                <Link
                    to={`/producto/formularioProducto/agregar`}
                    className="LinkDetail"
                >
                    <button className="btn_agregar">+</button>
                </Link>
            </div>
        </div>
    );
}