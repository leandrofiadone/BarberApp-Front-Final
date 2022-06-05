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

import Swal from 'sweetalert2'



import {  filterCategoriaProductos, getCategories, } from "../../redux/actions";
import { allProductos, orderByPrecio, sortName } from "../../redux/actions";



export default function Tienda() {

  const {updateItemQuantity, totalItems} = useCart()

  const [state, setState] = useState("");

  const dispatch = useDispatch();

  const {allProductos} = useSelector((state) => state);

  // useEffect(() => {
  //   dispatch(allProductos());
  // }, [dispatch]);

  // function handleFilterCategorie(e) {
  //   dispatch(filterByCategorie(e.target.value));
  //   }

    function onSelectsChange(e) {
      dispatch(sortName(e.target.value));
  }

  function registro(){
    document.getElementById('carrito').style.display = 'block';
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

  <div >

      <div className="botonVolver">
      <Link to="/" className="LinkVolver">
        <button onClick={()=>window.location.reload()} className="btn btn-dark" id="arriba"> Volver</button>
      </Link>
      </div>

      

    <Link to="/tienda">
      <button onClick={()=>window.location.reload()} className="containerTienda"><h1>Tienda Web</h1></button>
    </Link>
    <br />

    

    <div className="allCarrito" id="carrito">
      <Carrito/>
    </div>


  <div className="navbar navbar-expand bg-dark navbarTienda">

    <div className="dropdown">
  <button className="botonOrdenar btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
    Ordenar Por:
  </button>
  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    
      <div className="text-dark">
        <select onChange={(e) => handleCategorias(e)} className="text-dark">
          <option value="All"> Todos </option>
          <option value="tinte"> Tinte</option>
          <option value="cremas">Crema</option>
          <option value="shampoo">Shampoo</option>
          <option value="acondicionador">Acondicionador</option>
          <option value="Cera">Cera</option>
        </select>
      </div>
      <br />


      
      <div className="text-dark">

            <select name="select" onChange={()=>onSelectsChange()} className="form-select-sm">
                <option value="Filter"> A-Z:</option>
                <option value="ASC">Ascendente</option>
                <option value="DESC">Descendente</option>
            </select>
      </div>
      <br />
     

      <div className="text-dark">
      {
        allProductos? (
          <select onChange={(e) => handlePrecio(e)} className="form-select-sm">
            <option value="All"> Todos</option>
            <option value="max">Mayor precio</option>
            <option value="min"> Menor precio</option>
          </select>
        ): null
      }

    </div>
  </ul>
</div>

      <div className="divCarrito">
        <button onClick={() => registro()} className="botonCarrito" >
          <img className="imgCarrito center" src="https://www.ubolosoft.com/Carrito/images/carrito.png" alt="" style={{height: "4rem"}}/>
        </button>
      </div>
      <div className="fw-bold text-warning h5">
        {totalItems}
      </div>


      <div className="searchbar">
        <SearchBar />
      </div>

  </div>

      {/* <div className="containercontenido"> */}

      <div className="buttonup">
        <a href="#arriba" ><img src="https://www.nicepng.com/png/full/297-2979190_subir-flecha-arriba-transparente-png.png" alt="" style={{height: "3rem"}}/></a>
      </div>
      <div >
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
