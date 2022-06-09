import React from "react";
import './Servicios.css'

export default function ServiciosCard({ name, detail, price, time, img  }) {

  return (
    
  <div >

    <div className="serviciosCard">
    
      <div className="divdetailserv " >
        <div className="face front">
          <img src={img} alt="Img not found"  />
          <h3><i>{name}</i></h3>
        </div>
        <div className="textServicios face back">
          <h2 ><i><b>$ {price}</b></i></h2>
          <h4 ><i>{detail}</i></h4>
          <h5 ><img className="imgReloj" src="https://i.ibb.co/w4R0hHz/Dise-o-sin-t-tulo.png"/>{time + " min"}</h5>
        </div>
      </div>
          
    </div>
    </div>
  

    
  
  );
}