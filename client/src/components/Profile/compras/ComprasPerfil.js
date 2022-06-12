import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { crearCompra } from "../../../redux/actions";
import { id } from "date-fns/locale";

export const ComprasPerfil = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state);
  const { compras } = useSelector((state) => state);

//   useEffect(() => {
//     dispatch(crearCompra(user.id));
//   }, [dispatch, id]);
//   console.log(compras)

  // aqui no pueden ir useEffect porque? no sabemos PROBAR UN TRY-CATCH EN LA ACTION
  // useEffect(() => {
  //   dispatch(crearCompra(user.id));
  // }, [dispatch, id]);

  console.log(compras.notification);

  return (
    <div>
      <div>
        <h1 className="row justify-content-center mt-4">Mis Compras</h1>
      </div>
      <section className="py-4 container">
        <div className="row">
          <div className="col-12">
            <table className="table table-dark m-0">
              <thead>
                <tr>
                  <th scope="col">Total:</th>
                  <th scope="col">Status</th>
                  <th scope="col">Producto</th>
                  <th scope="col">Cantidad</th>
                  <th scope="col">Precio Unitario</th>
                </tr>
              </thead>
              <tbody>
                {compras.map((e, index) => (
                  <tr key={index}>
                    <td className="text-light">$ {e.transaction_amount}</td>
                    <td className="text-light">{e.status}</td>
                    <td className="text-light">{e.dataProducts[0].title}</td>
                    <td className="text-light">{e.dataProducts[0].quantity}</td>
                    <td className="text-light">
                      $ {e.dataProducts[0].unit_price}
                    </td>
                    <td className="text-light">
                      <img
                        src={e.dataProducts[0].picture_url}
                        style={{ height: "6rem" }}
                      />
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
