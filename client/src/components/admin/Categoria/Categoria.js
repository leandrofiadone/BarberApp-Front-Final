import React from "react";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Producto() {
  const { categorias } = useSelector((state) => state);
  return (
    <>
      <h1 className="display-3">Categorias</h1>
      <table className="table table-dark table-striped text-center">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Categoria</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((categoria, index) => {
            return (
              <tr key={categoria.id}>
                <th scope="row">{index + 1}</th>
                <td className="text-white"> {categoria.categorie}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div>
        <Link to={`/admin/categories/add`} className="div_pie">
          <button className="btn_agregar btn btn-outline-success">+</button>
        </Link>
      </div>
    </>
  );
}
