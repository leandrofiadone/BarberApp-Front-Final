import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFavourites } from "../../redux/actions";
import Favourite from "./Favourite";
import { favoritesRender } from "../../helpers/functionsFavorites/favorites";
import "./Favourites.css";
import { Link } from "react-router-dom";

const Favourites = () => {
    const {id} = useParams();
  
  const allFavorites = useSelector((state) => state.favourites.allFavorites);
  const productosBarberia = useSelector((state) => state.productos);
  const dispatch = useDispatch();
  let favourites = favoritesRender(allFavorites, productosBarberia);
  const [favouriteState, setFavourites] = useState(favourites);

  useEffect(() => {
    dispatch(getFavourites(id));
  },[id]);

  return (
    <div className="container-General">
      <h1 className="title-Favoritos">Favoritos</h1>
      <div className="container-Favourites">
        {favouriteState
          ? favouriteState.map((f) => {
              return (
                <Favourite
                  name={f.name}
                  price={f.price}
                  img={f.img}
                  stock={f.stock}
                  categorie={f.categorie}
                  idProduct={f.id}
                  allFavorites={allFavorites}
                  setFavourites={setFavourites}
                />
              );
            })
          : null}
       
      </div>
      <Link to="/tienda">
          <button className="boton">Volver </button>
        </Link>
    </div>
  );
};

export default Favourites;
