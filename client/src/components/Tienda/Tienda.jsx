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
import { filterRange } from "../../redux/actions";
import validateInput from "./validateInputRange";
// import '../Paginado/Paginado.css'


import Swal from "sweetalert2";
import {
  ALL_PRODUCTOS,
  filterCategoriaProductos,
  getCategories,
} from "../../redux/actions";
import { allProductos, orderByPrecio, sortName } from "../../redux/actions";
import { getFavourites } from "../../redux/actions";
import {
  setFavouriteApi,
  deleteFavouriteApi,
} from "../../helpers/functionsFavorites/favorites";
import { fetchSinToken } from "../../helpers/fetch";

export default function Tienda() {
  const { updateItemQuantity, totalItems } = useCart();

  const [state, setState] = useState("");

  const { user, categorias } = useSelector((state) => state);

  const dispatch = useDispatch();

  const productosBarberia = useSelector((state) => state.productos);

  //Favourites:
  const allFavorites = useSelector((state) => state.favourites.allFavorites);
  const [addFavourites, setFavourites] = useState([{newFavourite:false},{newFavourite:false},{newFavourite:false}
    ,{newFavourite:false},{newFavourite:false},{newFavourite:false},{newFavourite:false},{newFavourite:false},{newFavourite:false}]);
  //

  //Filtro Rango

  const [inputRango, setInputRango] = useState({
    min:"",
    max:""
  })
  const [error, setError] = useState({});

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

  const handleCategorias = async (e) => {
    e.preventDefault();
    const resp = await fetchSinToken(`products?category=${e.target.value}`);
    const data = await resp.json();
    if (data.ok) {
      dispatch({ type: ALL_PRODUCTOS, payload: data.product });
    } else {
      Swal.fire("Error", data.msg, "error");
    }
  };

  //////Favourites///////

  useEffect(() => {
    user && dispatch(getFavourites(user.id));
    
  }, [user,currentPage]);

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
          if(favorites.length < 9){
            for(let i = favorites.length + 1; i < 10; i++){
              favorites.push({ newFavourite: false });
            }
          }
        }else{
          for(let i = 0; i < 9; i++){
            favorites.push({ newFavourite: false });
          } 
        }
      }
      setFavourites(favorites);
    }
    if (allFavorites && !allFavorites.length){
      let favorites = [];
      for(let i = 0; i < 9; i++){
        favorites.push({ newFavourite: false });
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
        let favorites = addFavourites.slice();
        favorites[i].newFavourite = false;
        setFavourites(favorites);
      }
    }
  };
  /////Favourites////

  //Filtro Rango de precio
  const handleRange = (e) =>{

    if(!e.target.value){
      e.target.value = 0
    }
    
    setInputRango((range)=>{
      return{
        ...range,
        [e.target.name]:parseInt(e.target.value)
      }
    })
    setError(validateInput({ ...inputRango, [e.target.name]: parseInt(e.target.value) }));
  }

  const filterRangeProducts = (e) =>{
    e.preventDefault()
    dispatch(filterRange(inputRango))
    setInputRango((input)=>{
      return{
        ...input,
        min:"",
        max:""
      }
    })
  }
  //Filtro Rango
console.log(productosBarberia)
  return (
    <div>
      {/* =============================================================== */}
      <nav className="navbar navbar-expand-lg  p-3 containernavbartienda justify-content-center">
        <div className="container-fluid ">
          <Link className="navbar-brandtienda" to="/"></Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="true"
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
                  className="botonOrdenar btn btn-secondary dropdown-toggle dropdown-toggle-split"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Ordenar Por:
                </button>


                <ul
                  className="dropdown-menu bg-dark ordenDrop"
                  aria-labelledby="dropdownMenuButton1"
                >

                  
                  <div className="contOrder ">
                    <div>
                      <select
                        onChange={(e) => handleCategorias(e)}
                        className="form-select form-select mb-3 mt-4 bg-dark text-light"
                      >
                        <option hidden>Categorias</option>

                        {categorias.map((categoria) => (
                          <option
                            value={categoria.categorie}
                            key={categoria.id}
                          >
                            {categoria.categorie}
                          </option>
                        ))}
                      </select>
                    </div>
                    <br />

                    <div>
                      <select
                        name="select"
                        onChange={(e) => onSelectsChange(e)}
                        className="form-select form-select mb-3 bg-dark text-light"
                      >
                        <option hidden value="Filter">
                          A-Z
                        </option>
                        <option value="ASC">Ascendente</option>
                        <option value="DESC">Descendente</option>
                      </select>
                    </div>
                    <br />

                    <div>
                      {productosBarberia ? (
                        <select
                          onChange={(e) => handlePrecio(e)}
                          className="form-select form-select mb-3 dropdown-toggle bg-dark text-light"
                          
                        >
                          <option hidden>$$</option>
                          <option value="All"> Todos</option>
                          <option value="max">Mayor precio</option>
                          <option value="min"> Menor precio</option>
                        </select>
                      ) : null}
                    </div>

                    <div>
                      <form className="formRango">
                      <label className="label-min">Min:</label>
                      <input className="input-min" type={"text"} name={"min"} value={inputRango.min} onChange={(e)=>handleRange(e)}></input>
                      <label className="label-max">Max:</label>
                      <input className="input-max" type={"text"} name={"max"} value={inputRango.max} onChange={(e)=>handleRange(e)}></input>
                      {error.min && <p className="error">{error.min}</p>}
                      {error.max && <p className="error">{error.max}</p>}
                      </form>
                      <button className="filter-range-filtrar" onClick={(e)=>filterRangeProducts(e)}>Filtrar Rango</button>
                    </div>
                  </div>
                </ul>
              </li>
            </ul>

            <ul class="navbar-nav me-auto mb-lg-0">
              <div className="contTituloTiendaWeb">
                <Link to="/tienda">
                  <button
                    onClick={() => window.location.reload()}
                    className="botonTiendaWeb"
                    id="tienda"
                  >
                    <h5>Tienda Web</h5>
                  </button>
                </Link>
              </div>
            </ul>


            <div className="searchbar">
              <SearchBar />
            </div>


            <ul className="ulCarrito">

            <div className="divCarritouno">


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
            </div>

              {user.id && Object.keys(user).length && (
                <Link to={{pathname:`/favourites/${user.id}`, state:{handleDeleteFavourites}}}>
                  <img className="corazon-amarillo" src={imgCorazonAmarillo} />
                </Link>
              )}
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

      {/* <div className="containercontenido"> */}

      <div className="buttonup">
        <a href="#tienda">
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
        {/* <button  disabled={currentPage -1 === 0 } onClick={() => paginado(currentPage - 1)}>PREV</button> */}
        <Paginado
          productsPerPage={productsPerPage}
          productosBarberia={productosBarberia.length}
          paginado={paginado}
        />
        {/* <button disabled={productosBarberia.length < 9} onClick={() => paginado(currentPage + 1)}>NEXT</button> */}
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
                <Link to={{pathname:`tienda/${e.id}`,state:{handleAddFavourites, handleDeleteFavourites, addFavourites, index, idCard:e.id}}}className="LinkDetail">
                  <button className="masinfo">+info</button>
                </Link>

                { Object.keys(user).length ? addFavourites.length && !addFavourites[index].newFavourite ? (
                    
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
                  ) : null}
                              
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
