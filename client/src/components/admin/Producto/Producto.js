import React, { useEffect } from "react";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { adminGetAllProducts, deleteProduct, detalleDeProductos } from "../../../redux/actions";
import './productos.css'

export default function Producto() {

    const { productos } = useSelector((state) => state);

    const dispatch = useDispatch();

    const handleDelete = (id) => {
        dispatch(deleteProduct(id));
    }

    const handleDetailProduct = (id) => {
        dispatch(detalleDeProductos(id))
    }

    return (
        <>
            <table className="table table-dark table-striped text-center">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Producto</th>
                        <th scope="col">Categoria</th>
                        <th scope="col">Detalle</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Stock</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((producto, index) => {
                        return (
                            <tr key={producto.id}>
                                <th scope="row">{index + 1}</th>
                                <td className="text-white"> {producto.name}</td>
                                <td className="text-white"> {producto.category.categorie}</td>
                                <td className="text-white"> {producto.detail}</td>
                                <td className="text-white"> $.{producto.price}.00</td>
                                <td className="text-white"> {producto.stock}</td>
                                <td className="text-white">
                                    {
                                        (producto.state)
                                            ? 'Activo'
                                            : 'Desactivo'
                                    }
                                </td>
                                <td className="text-white">
                                    <div className="btn-group" role='group' aria-label='acciones'>
                                        <button className="btn btn-outline-primary btn-edit">
                                            <Link
                                                to={`/admin/product/${producto.id}`}
                                                onClick={
                                                    () => handleDetailProduct(producto.id)
                                                }
                                            >
                                                Edit
                                            </Link>
                                        </button>
                                        <button
                                            className="btn btn-outline-danger"
                                            onClick={() =>
                                                handleDelete(producto.id)
                                            }
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>



            <div className="div_pie">
                <Link
                    to={`/admin/product/add`}
                    className="LinkDetail"
                >
                    <button className="btn_agregar">+</button>
                </Link>
            </div>
        </>
    );
}