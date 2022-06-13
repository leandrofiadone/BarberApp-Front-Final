import React, { useEffect } from "react";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../../hooks/useForm";

import {
  activarProducto,
  adminGetAllProducts,
  allBarberos,
  allProductos,
  deleteProduct,
  detalleDeProductos,
} from "../../../redux/actions";
import "./productos.css";
import { fetchSinToken } from "../../../helpers/fetch";
import { types } from "../../../types/types";
import Swal from "sweetalert2";

export default function Producto() {
  const { adminAllProducts, categorias } = useSelector((state) => state);

  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  const handleActive = (id) => {
    dispatch(activarProducto(id));
  };

  const handleDetailProduct = (id) => {
    dispatch(detalleDeProductos(id));
  };

  const [form, handleInputChange, reset] = useForm({
    search: "",
  });

  const handleSearch = async (e) => {
    e.preventDefault();

    const resp = await fetchSinToken(`products?all=true&name=${form.search}`);
    const data = await resp.json();

    if (data.ok) {
      dispatch({ type: types.getAllProductsAdmin, payload: data.product });
    } else {
      Swal.fire("Error", data.msg, "error");
    }
  };

  const handleChange = async ({ target }) => {
    const resp = await fetchSinToken(
      `products?all=true&category=${target.value}`
    );
    const data = await resp.json();
    if (data.ok) {
      dispatch({ type: types.getAllProductsAdmin, payload: data.product });
    } else {
      Swal.fire("Error", data.msg, "error");
    }
  };

  const handleAllProducts = () => dispatch(adminGetAllProducts());

  // useEffect(() => {
  //     console.log('hey')
  //     dispatch(adminGetAllProducts())
  // }, [dispatch]);

  return (
    <>
      <div className="buscador-productos">
        <form onSubmit={handleSearch}>
          <input
            type="search"
            placeholder="Busca un producto"
            name="search"
            className="form-control"
            value={form.search}
            onChange={handleInputChange}
          />
          <button className="btn btn-warning" type="submit">
            Buscar
          </button>
        </form>
        <div className="btn-allProducts">
          <button className="btn btn-success" onClick={handleAllProducts}>
            Todos
          </button>
        </div>
        <div className="filter-categoria">
          <select className="form-select" onChange={handleChange}>
            <option>Selecciona</option>
            {categorias.map((categoria) => (
              <option value={categoria.categorie} key={categoria.id}>
                {categoria.categorie}
              </option>
            ))}
          </select>
        </div>
      </div>

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
          {adminAllProducts.map((producto, index) => {
            return (
              <tr key={producto.id}>
                <th scope="row">{index + 1}</th>
                <td className="text-white"> {producto.name}</td>
                <td className="text-white"> {producto.category.categorie}</td>
                <td className="text-white"> {producto.detail}</td>
                <td className="text-white"> $.{producto.price}.00</td>
                <td className="text-white"> {producto.stock}</td>
                <td className="text-white">
                  {producto.state ? "Activo" : "Desactivo"}
                </td>
                <td className="text-white">
                  <div className="btn-group" role="group" aria-label="acciones">
                    <button className="btn btn-outline-primary btn-edit">
                      <Link
                        to={`/admin/product/${producto.id}`}
                        onClick={() => handleDetailProduct(producto.id)}
                      >
                        Edit
                      </Link>
                    </button>
                    {producto.state ? (
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => handleDelete(producto.id)}
                      >
                        Eliminar
                      </button>
                    ) : (
                      <button
                        className="btn btn-outline-success"
                        onClick={() => handleActive(producto.id)}
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
        <Link to={`/admin/product/add`} className="LinkDetail">
          <button className=" moverBoton">Agregar Producto</button>
        </Link>
      </div>
    </>
  );
}
