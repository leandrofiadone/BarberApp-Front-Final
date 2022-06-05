import React from "react";

import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

import {
  addProductos,
  allProductos,
  detalleDeProductos,
  getCategories,
  updateProductos,
} from "../../../redux/actions/index";

const FormularioProductos = () => {

  const dispatch = useDispatch();
  
  const { id } = useParams();

  const history = useHistory();
  const inicialState = {
    name: "",
    detail: "",
    stock: null,
    price: null,
    img: "",
    idCategorie: "",
  };

  const productoId = useSelector((state) => state.detalle);
  const categoriesBarberia = useSelector((state) => state.categorias);
  const [producto, setProducto] = React.useState(inicialState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProducto({
      ...producto,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id === "agregar") {
      dispatch(addProductos(producto));
    } else {
      if (
        producto.detail.length === 0 ||
        producto.detail === productoId.detail
      ) {
        delete producto.detail;
      }
      if (
        producto.idCategorie.length === 0 ||
        producto.idCategorie === productoId.idCategorie
      ) {
        delete producto.idCategorie;
      }
      if (producto.img.length === 0 || producto.img === productoId.img) {
        delete producto.img;
      }
      if (producto.name.length === 0 || producto.name === productoId.name) {
        delete producto.name;
      }
      if (producto.price === null || producto.price === productoId.price) {
        delete producto.price;
      }
      if (producto.stock === null || producto.stock === productoId.stock) {
        delete producto.stock;
      }
      producto["id"] = productoId.id;
      dispatch(updateProductos(producto));
    }
    // await dispatch(allProductos());
    history.push("/admin/product");
  };
  return (
    <div>
      {id === "agregar" ? (
        <h1 className="mt-5">Registrar Productos</h1>
      ) : (
        <h1 className="mt-5">Modificar Productos</h1>
      )}
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
              placeholder={productoId?.name ? productoId.name : "Nombre.."}
              onChange={handleInputChange}
            />
          </div>
          <div className="d-flex">
            <label>Detalle:</label>
          </div>
          <div className="d-flex max-w-full ">
            <input
              className="form-control"
              // placeholder="Nombre.."
              type="text"
              name="detail"
              placeholder={
                productoId?.detail ? productoId.detail : "Detalle..."
              }
              onChange={handleInputChange}
            />
          </div>
          <div className="d-flex">
            <label>Stock:</label>
          </div>
          <div className="d-flex max-w-full ">
            <input
              className="form-control"
              // placeholder="Nombre.."
              type="text"
              name="stock"
              placeholder={productoId?.stock ? productoId.stock : "Stock..."}
              onChange={handleInputChange}
            />
          </div>
          <div className="d-flex">
            <label>Precio:</label>
          </div>
          <div className="d-flex max-w-full ">
            <input
              className="form-control"
              type="text"
              name="price"
              placeholder={productoId?.price ? productoId.price : "Precio..."}
              onChange={handleInputChange}
            />
          </div>
          <div className="d-flex">
            <label>Imagen:</label>
          </div>
          <div className="d-flex max-w-full ">
            <input
              className="form-control"
              type="text"
              name="img"
              placeholder={
                productoId?.img ? productoId.img : "Url de la imagen http://..."
              }
              onChange={handleInputChange}
            />
          </div>
          <div className="d-flex">
            <label>Categoria:</label>
          </div>
          <div className="d-flex h-1.5">
            <select
              className="form-select"
              name="idCategorie"
              onChange={handleInputChange}
            >
              <option key="1" name="idCategorie" value="">
                Seleccione una opcion ...
              </option>
              {categoriesBarberia.length > 0 &&
                categoriesBarberia.map((categorie) => {
                  return (
                    <option
                      key={categorie.id}
                      name="idCategorie"
                      selected={
                        productoId?.idCategorie === categorie.id
                          ? "selected"
                          : "no selected"
                      }
                      value={categorie.id}
                    >
                      {categorie.categorie}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>

        <div className="linksCrearProducto mt-4">
          <button className="btn btn-warning fw-bold" type="submit">
            Registrar
          </button>
          <Link to="/admin/product" className="LinkVolver">
            <button className="btn btn-info">Volver</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default FormularioProductos;