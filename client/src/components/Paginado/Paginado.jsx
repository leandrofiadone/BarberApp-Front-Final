import React from "react";
import './Paginado.css'

export default function Paginado({ productsPerPage, productosBarberia, paginado }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(productosBarberia / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pageNumbers">
        {pageNumbers &&
          pageNumbers.map((number,index) => {
             return <li key = {index}>
                <button  onClick={() => paginado(number)}>
                {number}
                </button >
            </li>
          })}
      </ul>
    </nav>
  );
}