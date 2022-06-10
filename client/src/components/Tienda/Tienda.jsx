import React from "react";
import "./Tienda.css";
import imgCorazonRojo from "./img/corazon-rojo.png";
import imgCorazonGris from "./img/corazon-gris.png";
import imgCorazonAmarillo from "./img/corazon-amarillo.png";
import Cards from "../Cards/Cards";
import SearchBar from "../SearchBar/SearchBar";
import Carrito from "../Carrito/Carrito";
import { useCart } from "react-use-cart";
import Contenido from "../Chatbot/Chatbot";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Paginado from "../Paginado/Paginado";

import Swal from "sweetalert2";
import { filterCategoriaProductos, getCategories } from "../../redux/actions";
import { allProductos, orderByPrecio, sortName } from "../../redux/actions";
import { getFavourites } from "../../redux/actions";
import {
  setFavouriteApi,
  deleteFavouriteApi,
} from "../../helpers/functionsFavorites/favorites";

export default function Tienda() {
  const { updateItemQuantity, totalItems } = useCart();

  const [state, setState] = useState("");

  const { user } = useSelector((state) => state);

  const dispatch = useDispatch();

  const productosBarberia = useSelector((state) => state.productos);

  //Favourites:
  const allFavorites = useSelector((state) => state.favourites.allFavorites);
  const [addFavourites, setFavourites] = useState([]);
  //

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  let currentProducts = productosBarberia.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  /* let currentProducts = [{name:"shampo",stock: 285, price:300,
  category:{categorie:"tinte",id:"06af9456-0655-42e9-be92-18ceadc454c4"},
detail:"Shampoo Hombre",
id: "04569726-3258-4add-a406-fafb743c1c2f",
idCategorie: "06af9456-0655-42e9-be92-18ceadc454c4",
img: "https://flyclipart.com/thumbs/2018-product-970x1400phenomenal-beard-hair-shampoo-1219848.png",
name: "Shampoo Barbas",
state: true
}]*/
  //console.log(productosBarberia)

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(allProductos());
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [productosBarberia]);

  // function handleFilterCategorie(e) {
  //   dispatch(filterByCategorie(e.target.value));
  //   }

  function onSelectsChange(e) {
    dispatch(sortName(e.target.value));
    setState(e.target.value);
  }

  function registro() {
    document.getElementById("carrito").style.display = "block";
  }

  const handlePrecio = (e) => {
    // e.preventDefault();
    dispatch(orderByPrecio(e.target.value));
    setState(e.target.value);
  };

  const handleCategorias = (e) => {
    e.preventDefault();
    dispatch(filterCategoriaProductos(e.target.value));
    setState(e.target.value);
    console.log(e.target.value);
  };

  //////Favourites///////

  useEffect(() => {
    console.log("getFavourites");
    user && dispatch(getFavourites(user.id));
  }, [user]);

  useEffect(() => {
    if (allFavorites && allFavorites.length) {
      let favorites = [];
      for (let i = 0; i < allFavorites.length; i++) {
        //busca el indice del producto donde coincidan los ids
        let found = currentProducts.findIndex(
          (f) => f.id === allFavorites[i].idProduct
        );
        if (found > -1) {
          currentProducts.map((p) => favorites.push({ newFavourite: false }));
          favorites[found].newFavourite = true;
        }
      }
      setFavourites(favorites);
    }
  }, [allFavorites, currentPage]);

  const handleAddFavourites = (idProduct, index) => {
    const { id: idUser } = user;
    for (let i = 0; i < currentProducts.length; i++) {
      if (index === i) {
        setFavouriteApi({ idProduct, idUser });
        let favorites = addFavourites.slice();
        favorites[i].newFavourite = true;
        setFavourites(favorites);
      }
    }
  };

  const handleDeleteFavourites = (index, idProduct) => {
    const { id: idUser } = user;
    for (let i = 0; i < addFavourites.length; i++) {
      if (index === i) {
        deleteFavouriteApi({ idProduct, idUser });
        console.log(idProduct);
        let favorites = addFavourites.slice();
        favorites[i].newFavourite = false;
        setFavourites(favorites);
      }
    }
  };
  /////Favourites////

  return (
    <div>
      {/* =============================================================== */}
      <nav class="navbar navbar-expand-xl divNavbarTienda p-3 containernavbartienda">
        <div class="container-fluid ">
          <Link className="navbar-brandtienda" to="/"></Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div
            class="collapse navbar-collapse generalcont"
            id="navbarSupportedContent"
          >
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 ">
              <li class="nav-item dropdown dropContainer">
                <button
                  className="botonOrdenar btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Ordenar Por:
                </button>
                <ul
                  className="dropdown-menu bg-dark"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <div className="contOrder">
                    <label className="text-light">Categorias</label>
                    <div className="text-dark">
                      <br />
                      <select
                        onChange={(e) => handleCategorias(e)}
                        className="text-dark form-select-sm"
                      >
                        <option value="All"> Todos </option>
                        <option value="tinte"> Tinte</option>
                        <option value="cremas">Crema</option>
                        <option value="shampoo">Shampoo</option>
                        <option value="acondicionador">Acondicionador</option>
                        <option value="cera">Cera</option>
                      </select>
                    </div>
                    <br />

                    <div className="text-dark">
                      <label className="text-light">Alfab</label>

                      <select
                        name="select"
                        onChange={(e) => onSelectsChange(e)}
                        className="form-select-sm"
                      >
                        <option value="Filter"> A-Z:</option>
                        <option value="ASC">Ascendente</option>
                        <option value="DESC">Descendente</option>
                      </select>
                    </div>
                    <br />

                    <div className="text-dark">
                      <label className="text-light">Precio</label>
                      {productosBarberia ? (
                        <select
                          onChange={(e) => handlePrecio(e)}
                          className="form-select-sm"
                        >
                          <option value="All"> Todos</option>
                          <option value="max">Mayor precio</option>
                          <option value="min"> Menor precio</option>
                        </select>
                      ) : null}
                    </div>
                  </div>
                </ul>
              </li>
              <li class="nav-item">
                <Link to="/tienda">
                  <button
                    onClick={() => window.location.reload()}
                    className="containerTienda"
                    id="arriba"
                  >
                    <h5>Tienda Web</h5>
                  </button>
                </Link>
              </li>
              <li className="nav-item">
                <div className="searchbar ">
                  <SearchBar />
                </div>
              </li>
              <li class="nav-item carritoContainer">
                {/* <button  className="" >
                      <img className="imgCarrito" src="https://www.ubolosoft.com/Carrito/images/carrito.png" alt="" style={{height: "2rem", width: "2rem"}}/>
                    </button> */}

                <button
                  onClick={() => registro()}
                  type="button"
                  class="btn btn-dark position-relative botonCarrito"
                >
                  <img
                    className="imgCarrito"
                    src="https://www.ubolosoft.com/Carrito/images/carrito.png"
                    alt=""
                    style={{ height: "2rem", width: "2rem" }}
                  />{" "}
                  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">
                    {totalItems}
                    <span class="visually-hidden"></span>
                  </span>
                </button>
              </li>
              {/* <li className="numeroitems nav-item">
                    {totalItems}
              </li> */}
              <Link to={`/favourites/${user.id}`}>
                <img
                  className="corazon-amarillo"
                  src={imgCorazonAmarillo}
                ></img>
              </Link>
            </ul>
          </div>
        </div>
      </nav>
      {/* =============================================================== */}

      <div className="allCarrito" id="carrito">
        <Carrito />
      </div>

      <br />
      {/* </nav> */}
      {/* =============================================================== */}

      <div className="navbar navbar-expand bg-dark navbarTienda"></div>

      {/* <div className="containercontenido"> */}

      <div className="buttonup">
        <a href="#arriba">
          <img
            src="https://www.nicepng.com/png/full/297-2979190_subir-flecha-arriba-transparente-png.png"
            alt=""
            style={{ height: "3rem" }}
          />
        </a>
      </div>
      <div className="botonChat">
        <Contenido />
      </div>

      {/* </div> */}

      <div>
        <Paginado
          productsPerPage={productsPerPage}
          productosBarberia={productosBarberia.length}
          paginado={paginado}
        />
      </div>

      <div className="cardsTienda">
        {currentProducts ? (
          currentProducts?.map((e, index) => {
            return (
              <div>
                <Cards
                  key={index}
                  name={e.name}
                  stock={e.stock}
                  price={e.price}
                  img={e.img}
                  category={e.category.categorie}
                  id={e.id}
                  idProduct={e.id}
                />
                <Link to={`tienda/${e.id}`} className="LinkDetail">
                  <button>+info</button>
                </Link>
                {/*valorar por el estado de favorios y no por la propiedad**/}
                {addFavourites.length && !addFavourites[index].newFavourite ? (
                  <img
                    onClick={() => handleAddFavourites(e.id, index)}
                    className="imagen-corazon-gris"
                    src={imgCorazonGris}
                  ></img>
                ) : (
                  <img
                    onClick={() => handleDeleteFavourites(index, e.id)}
                    className="imagen-corazon-rojo"
                    src={imgCorazonRojo}
                  ></img>
                )}
              </div>
            );
          })
        ) : (
          <h1>Cargando Productos</h1>
        )}
      </div>
    </div>
  );
}
