
import React from "react";
import NavBar from "../NavBar/NavBar";
import Carrousel from "../Carrousel/Carrousel";
import { Servicios } from "../Servicios/Servicios";
import Contenido from "../Chatbot/Chatbot";

import QuienesSomos from "../QuienesSomos/QuienesSomos";
import { sortServices, getServices } from "../../redux/actions";
import { useDispatch } from "react-redux";

import './Home.css'

export default function Home() {
  
  const dispatch = useDispatch();

  function onSelectsChange(e) {
    dispatch(sortServices(e.target.value));
  }

  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div className="p-3 backdrop-blur-sm bg-white/30 ">
        <Carrousel />
      </div>

      <br />

      <div className="backdrop-blur-sm bg-white/10">
        <Servicios />
      </div>
      <div className="p-3">
        <QuienesSomos />
      </div>
      {/* <div>
        <CrearProducto />
      </div> */}

      <div className="text-light" id="servicios"></div>
      <div className="text-light" id="quienesSomos"></div>




        <div >

        <Contenido />
        </div>


      <div className="contenidoChat" id="chatHome">
      </div>
      
    </div>
  );
}