import React from "react";
import "./CrearProducto.css";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

import {
  getCategories,
  addProductos,
  allProductos,
} from "../../redux/actions/index";

export default function CrearProducto() {
  const dispatch = useDispatch();
  const history = useHistory();
  const categoriesBarberia = useSelector((state) => state.categorias);
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  const InitialState = {
    name: "",
    stock: 0,
    price: 0,
    idCategorie: "",
    img: "",
  };
  const [product, setProduct] = React.useState(InitialState);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (product.idCategorie.length > 0) {
      if (product.img.length > 0) {
        if (product.name.length > 0) {
          if (product.price > 0) {
            dispatch(addProductos(product));
            dispatch(allProductos());
            history.push("/");
          } else {
            alert("Introdusca el precio del producto");
          }
        } else {
          alert("Introdusca el nombre del producto");
        }
      } else {
        alert("Introdusca una imagen");
      }
    } else {
      alert("Seleccione una categoria");
    }
  };
  return (
    <div>
      <h1 class="mt-5">Crea tus Productos</h1>
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
            <label>Stock:</label>
          </div>
          <div class="d-flex">
            <input
              class="form-control"
              placeholder="Stock.."
              type="text"
              name="stock"
              onChange={handleInputChange}
            />
          </div>
          <div class="d-flex mt-2">
            <label>Precio:</label>
          </div>
          <div class="d-flex">
            <input
              class="form-control"
              placeholder="Precio.."
              type="text"
              name="price"
              onChange={handleInputChange}
            />
          </div>
          <div class="d-flex mt-2">
            <label>Categoria:</label>
          </div>
          <div class="d-flex h-1.5">
            <select
              class="form-select"
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
                      value={categorie.id}
                    >
                      {categorie.categorie}
                    </option>
                  );
                })}
            </select>
          </div>
          <div class="d-flex mt-2">
            <label>Imagen:</label>
          </div>
          <div class="d-flex">
            <input
              class="form-control"
              placeholder="Url imagen.."
              type="text"
              name="img"
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="linksCrearProducto mt-4">
          <button class="btn btn-warning fw-bold" type="submit">
            Crear
          </button>
          <Link to="/">
            <button class="btn btn-warning fw-bold"> Volver</button>
          </Link>
        </div>
      </form>
    </div>
  );
}
