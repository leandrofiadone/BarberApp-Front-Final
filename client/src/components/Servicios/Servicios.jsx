

import React from "react";
import ServiciosCard from "./ServiciosCard";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import { getServices } from "../../redux/actions";

import "./Servicios.css";

export function Servicios() {
  const dispatch = useDispatch();
  const allServices = useSelector((state) => state.servicios);

  console.log(allServices)

  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);


  return (
    <div >

      <div className="divTituloService">
        <h1 className="tituloServicios" >Nuestros Servicios</h1>
      </div>
      <div className="containerCardService" id="servicios">
        <div className="serviciosCard">
          {          
          allServices?.map((s) => (
            <ServiciosCard
              key={s.id}
              name={s.name}
              detail={s.detail}
              price={s.price}
              time={s.time}
              img={s.img}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

