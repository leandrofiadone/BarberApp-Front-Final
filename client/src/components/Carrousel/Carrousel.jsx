import React from "react";
import "./Carrousel.css";
import "bootstrap";

export default function Carrousel(){
    return(
        <div id="xxxcarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">

          <div className="carousel-item active sliderOne" data-bs-interval="3000" >
           
          </div>
          
          <div className="carousel-item  sliderTwo" data-bs-interval="3000" >

          </div>
 
          <div className="carousel-item  sliderThree" data-bs-interval="3000" >

          </div>
 
 
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#xxxcarousel"  data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#xxxcarousel"  data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>    
    )
}
