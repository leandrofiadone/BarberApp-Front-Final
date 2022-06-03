
import React from "react";
import NavBar from "../NavBar/NavBar";
import Carrousel from "../Carrousel/Carrousel";
import { Servicios } from "../Servicios/Servicios";
import { CrearProducto } from "../CrearProducto/CrearProducto";
import Contenido from "../Chatbot/Chatbot";

import QuienesSomos from "../QuienesSomos/QuienesSomos";
import { sortServices, getServices } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import './Home.css'

export default function Home() {
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);

  function onSelectsChange(e) {
    dispatch(sortServices(e.target.value));
  }

  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div class="p-3 backdrop-blur-sm bg-white/30 ">
        <Carrousel />
      </div>

      <br />

      <div class="backdrop-blur-sm bg-white/10">
        <Servicios />
      </div>
      <div class="p-3">
        <QuienesSomos />
      </div>
      {/* <div>
        <CrearProducto />
      </div> */}

      <div class="text-light" id="servicios"></div>
      <div class="text-light" id="quienesSomos"></div>




        <div >

        <Contenido />
        </div>


      <div className="contenidoChat" id="chatHome">
      </div>
      
    </div>
  );
}