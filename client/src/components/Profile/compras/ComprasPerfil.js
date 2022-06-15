import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { crearCompra } from "../../../redux/actions";
// import { useEffect, useState } from "react";
// import { crearCompra } from "../../../redux/actions";
// import { id } from "date-fns/locale";

import "./ComprasPerfil.css";

export const ComprasPerfil = () => {
  const dispatch = useDispatch();

  const { user, compras } = useSelector((state) => state);


  useEffect(() => {
    dispatch(crearCompra(user.id))
  }, [dispatch]);


  return (
    <div>
      <div>
        <h1 className="row justify-content-center mt-4 text-light">
          Mis Compras
        </h1>
      </div>
      <section className="py-4 container">
        <div className="row">
          <div className="col-12">
            <table className="table table-dark m-0 table-striped">
              <thead>
                <tr>
                  <th scope="col">Total:</th>
                  <th scope="col">Status</th>
                  <th scope="col">Producto/s</th>
                  <th scope="col">Cantidad</th>
                  <th scope="col">Precio Unitario</th>
                </tr>
              </thead>
              <tbody>
                {compras.map(e => (
                  <tr key={e.id}>
                    <td className="text-light fw-bold montototal">$ {e.transaction_amount}</td>
                    <td className="text-light statusCompra">{e.status}</td>
                    
                    <td className="text-light ">
                      {e.dataProducts.map((c, index) => (
                        <div key={index} className="text-light tituloproducto">{c.title}</div>
                      ))}
                      </td>
                      
                     
                    <td className="text-light ">
                      {e.dataProducts.map((c, index) => (
                        <div key={index} className="text-light tituloproducto">
                          {c.quantity}
                        </div>
                      ))}
                    </td>
                    <td className="text-light ">
                      {e.dataProducts.map((c, index) => (
                        <div key={index} className="text-light tituloproducto fw-bold">
                          $ {c.unit_price}
                        </div>
                      ))}
                      </td>
                      
                      <td className="text-light ">
                      {e.dataProducts.map((c, index) => (
                        <img key={index} src={c.picture_url} className="text-light tituloproductoimg" style={{ height: "4rem" }} alt="img Not Found"/>
                      ))}
                    </td>
                      
                   
                  </tr>
                  
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};
