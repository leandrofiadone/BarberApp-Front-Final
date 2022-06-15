import React from "react";
import { useSelector } from "react-redux";

export const VentasBarras = () => {
  const ventas = useSelector((state) => state.ventas);
  return (
    <div className="col" style={{ width: "100%", height: "520px" }}>
      <h3 className="text-center">Ventas Mas Recientes</h3>
      <table className="table table-dark table-striped text-center">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Fecha y Hora</th>
            <th scope="col">Usuario</th>
            <th scope="col">Monto</th>
          </tr>
        </thead>
        {ventas.map((venta, index) => {
          return (
            <tbody key={index}>
              {index < 10 ? (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td className="text-white"> {venta.date}</td>
                  <td className="text-white"> {venta.name}</td>
                  <td className="text-white"> {venta.total}</td>
                </tr>
              ) : (
                <tr key={index}></tr>
              )}
            </tbody>
          );
        })}
      </table>
    </div>
  );
};
