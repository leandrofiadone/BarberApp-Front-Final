import React from "react";

import "./Tienda.css";

import Cards from "../Cards/Cards";
import SearchBar from "../SearchBar/SearchBar";
import Carrito from "../Carrito/Carrito";
import { useCart } from "react-use-cart";
import Contenido from "../Chatbot/Chatbot";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Swal from "sweetalert2";

import { filterCategoriaProductos, getCategories } from "../../redux/actions";
import { allProductos, orderByPrecio, sortName } from "../../redux/actions";

export default function Tienda() {
  const { updateItemQuantity, totalItems } = useCart();

  const [state, setState] = useState("");

  const dispatch = useDispatch();

  const { allProductos } = useSelector((state) => state);

  /*  const productosBarberia = useSelector((state) => state.productos); */

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  function onSelectsChange(e) {
    dispatch(sortName(e.target.value));
    setState(e.target.value);
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

  return (
    <div>

  <div >

      {/* <div className="botonVolver">
      <Link to="/" className="LinkVolver">
        <button  onClick="location.reload();" className="btn btn-dark" id="arriba"> Volver</button>
      </Link>
      </div> */}
      {/* =============================================================== */}
      <nav className="navbar navbar-expand-lg divNavbarTienda p-3 containernavbartienda">
        <div className="container-fluid ">
          <Link className="navbar-brandtienda" to="/"></Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse generalcont"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
              <li className="nav-item dropdown dropContainer">
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
                        <option hidden>Categorias</option>
                        <option value="All">Todos</option>
                        <option value="crema">Crema</option>
                        <option value="shampo">Shampoo</option>
                        <option value="ceras">Ceras</option>
                        <option value="pomada">Pomadas</option>
                        <option value="locion">Locion</option>
                      </select>
                    </div>
                    <br />

                    <div className="text-dark">
                      <label className="text-light">Alf</label>

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
                      {allProductos ? (
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
              <li className="nav-item">
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
              <li className="nav-item carritoContainer">
                {/* <button  className="" >
                      <img className="imgCarrito" src="https://www.ubolosoft.com/Carrito/images/carrito.png" alt="" style={{height: "2rem", width: "2rem"}}/>
                    </button> */}

                <button
                  onClick={() => registro()}
                  type="button"
                  className="btn btn-dark position-relative botonCarrito"
                >
                  <img
                    className="imgCarrito"
                    src="https://www.ubolosoft.com/Carrito/images/carrito.png"
                    alt=""
                    style={{ height: "2rem", width: "2rem" }}
                  />
                  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">
                    {totalItems} <span className="visually-hidden"></span>
                  </span>
                </button>
{/* =============================================================== */}
      <nav class="navbar navbar-expand-lg divNavbarTienda p-3 containernavbartienda">
        <div class="container-fluid ">
            <Link className="navbar-brandtienda" to="/"></Link>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
              </button>

          <div class="collapse navbar-collapse generalcont" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 ">
              <li class="nav-item dropdown dropContainer">
                
                    <button className="botonOrdenar btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                      Ordenar Por:
                    </button>
                    <ul className="dropdown-menu bg-dark" aria-labelledby="dropdownMenuButton1">

                      <div className="contOrder">
                      
                          <label className="text-light">Categorias</label>
                        <div className="text-dark">
                          <br />
                          <select onChange={(e) => handleCategorias(e)} className="text-dark form-select-sm">
                            <option value="All"> Todos </option>
                            <option value="Tinte"> Tinte</option>
                            <option value="Cremas">Crema</option>
                            <option value="shampoo">Shampoo</option>
                            <option value="acondicionador">Acondicionador</option>
                            <option value="Cera">Cera</option>
                          </select>
                        </div>
                        <br />

                        <div className="text-dark">
                        <label className="text-light">Alfab</label>

                              <select name="select" onChange={(e)=>onSelectsChange(e)} className="form-select-sm">
                                  <option value="Filter"> A-Z:</option>
                                  <option value="ASC">Ascendente</option>
                                  <option value="DESC">Descendente</option>
                              </select>
                        </div>
                        <br />
                      
                        <div className="text-dark">
                        <label className="text-light">Precio</label>
                        {
                          productosBarberia? (
                            <select onChange={(e) => handlePrecio(e)} className="form-select-sm">
                              <option value="All"> Todos</option>
                              <option value="max">Mayor precio</option>
                              <option value="min"> Menor precio</option>
                            </select>
                          ): null
                        }

                      </div>

                      </div>
                    </ul>
                
              </li>
              <li class="nav-item">
                <Link to="/tienda">
                  <button onClick={()=>window.location.reload()} className="containerTienda" id="arriba"><h5>Tienda Web</h5></button>
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

                    <button onClick={() => registro()} type="button" class="btn btn-dark position-relative botonCarrito">
                    <img className="imgCarrito" src="https://www.ubolosoft.com/Carrito/images/carrito.png" alt="" style={{height: "2rem", width: "2rem"}}/> <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">{totalItems} <span class="visually-hidden"></span></span>
                    </button>
                 
              </li>
              {/* <li className="numeroitems nav-item">
                    {totalItems}
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
      {/* =============================================================== */}

      <div className="allCarrito" id="carrito">
        <Carrito />
      </div>

      <br />

      <div className="navbar navbar-expand bg-dark navbarTienda"></div>
    </nav>
{/* =============================================================== */}
            
      <div className="allCarrito" id="carrito">
        <Carrito/>
      </div>

    <br />

  <div className="navbar navbar-expand bg-dark navbarTienda">

    

      


     

  </div>

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
      <div>
        <Contenido />
      </div>

      {/* </div> */}

      <div className="cardsTienda">
        {allProductos ? (
          allProductos?.map((e) => {
            return (
              <div key={e.id}>
                <Cards
                  key={e.id}
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
