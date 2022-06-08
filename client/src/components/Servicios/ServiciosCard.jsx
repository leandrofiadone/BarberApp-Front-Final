import React from "react";
import './Servicios.css'

export default function ServiciosCard({ name, detail, price, time, img  }) {

  return (
    
  <div >

    <div className="serviciosCard">
    
      <div className="divdetailserv " >
        <div className="face front">
          <img src={img} alt="Img not found"  />
        </div>
        <div className="textServicios face back">
          <h3><i>{name}</i></h3>
          <h3 ><i><b>$ {price}</b></i></h3>
          <h5 ><i>{detail}</i></h5>
          <h5 ><img className="imgReloj" src="https://i.ibb.co/w4R0hHz/Dise-o-sin-t-tulo.png"/>{time + " min"}</h5>
        </div>
      </div>
          
    </div>
    </div>
  

    
  
  );
}