import React from "react";
import './Servicios.css'

export default function ServiciosCard({ name, detail, price, time, img  }) {

  return (
    
  <div >

    <div className="serviciosCard">
    
      <div className="divdetailserv" >
          <img src={img} alt="Img not found"  width="300px"/>
        <div className="textServicios">
          <h3>{name}</h3>
          <h5 >{detail}</h5>
          <h3 >$ {price}</h3>
          <h3 >{time}</h3>
        </div>
          
      </div>
    </div>
    </div>
  

    
  
  );
}