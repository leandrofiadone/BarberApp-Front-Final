import React from "react";
import './Servicios.css'

export default function ServiciosCard({ name, detail, price, time, img  }) {

  return (
    
  <div >

    <div className="serviciosCard">
    
      <div className="divdetailserv " >
        <div className="face front">
          <img src={img} alt="Img not found"  />
          <h3 className="nombreService"><i>{name}</i></h3>
        </div>
        <div className="textServicios face back">
          <h3 ><i>$ {price}</i></h3>
          <h5 ><i>{detail}</i></h5>
          <div className="tiemposervice">

          <img className="imgReloj" src="https://i.ibb.co/w4R0hHz/Dise-o-sin-t-tulo.png" />
          <h5 className="d-flex "><i >{time + " min"}</i></h5>
          </div>
        </div>
      </div>
          
    </div>
    </div>
  

    
  
  );
}