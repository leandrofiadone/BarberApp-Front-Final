import React, { useEffect, useState } from "react";
import { paymentMPFavourites } from "../../helpers/functionsFavorites/favorites";
import { useSelector } from "react-redux";
import "./Favourites.css";
import { useLocation } from "react-router-dom";
//import { deleteFavouriteApi } from "../../helpers/functionsFavorites/favorites";

const Favourite = ({ idProduct, name, price, stock, img, categorie, setFavourites,handleDeleteFavourites,index }) => {
    const {user} = useSelector(state => state)

  return (
    <React.Fragment>
      <div className="container-Card-Favourite">
        <div className="container-Img">
          <img className="img" src={img} alt="Img Product" maxwidth="500" />
        </div>

        <div className="container-Text">
          <h3> {name}</h3>
          <h3> ${price}</h3>
          {/* <h6> Stock: {stock}</h6> */}
          {/* <h6>Categoria: {categorie}</h6> */}
          <div className="buttonComprar">
            <button
              id="miBoton"
              type="button"
              className="btn btn-success fw-bold botonDetalleComprar"
              onClick={()=> paymentMPFavourites([{
                  idUser: user.id,
                  idProduct,
                  quantity:1
                }]) }
            >
              Comprar
            </button>
            <button
              id="miBoton"
              type="button"
              className="btn btn-success fw-bold botonDetalleQuitar"
              onClick={()=>{handleDeleteFavourites(index,idProduct);
              setFavourites((f)=>{
                  return f.filter((fa)=>fa.id !== idProduct)
              }) }}
            >
              Quitar
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Favourite;
