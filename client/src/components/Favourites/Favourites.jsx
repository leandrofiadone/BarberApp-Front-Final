import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
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
  const [favouriteState, setFavourites] = useState([]);
  const location = useLocation();
  const {handleDeleteFavourites} = location.state
  
  useEffect(() => {
    dispatch(getFavourites(id));
  },[id]);

  useEffect(()=>{
     setFavourites(favoritesRender(allFavorites, productosBarberia));
  },[allFavorites])



  return (
    <div className="container-General">
      <h1 className="title-Favoritos">Favoritos</h1>
      <div className="container-Favourites">
        {favouriteState
          ? favouriteState.map((f,i) => {
              return (
                <Favourite
                  key={i}
                  name={f.name}
                  price={f.price}
                  img={f.img}
                  stock={f.stock}
                  categorie={f.categorie}
                  idProduct={f.id}
                  allFavorites={allFavorites}
                  setFavourites={setFavourites}
                  handleDeleteFavourites={handleDeleteFavourites}
                  index={i}
                />
              );
            })
          : null}
       
      </div>
      <Link to="/tienda">
          <button className="botonVolverFav">Volver </button>
        </Link>
    </div>
  );
};

export default Favourites;
