import React from "react";
import { Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";
import "chart.piecelabel.js";
import { Chart, ArcElement, Legend, Title, Tooltip, SubTitle } from "chart.js";
Chart.register(ArcElement, Legend, Title, Tooltip, SubTitle);

export const CategoriasPastel = () => {
  const categorias = useSelector((state) => state.categorias);
  const coloresDef = [
    "#82E0AA",
    "#AF7AC5",
    "#138D75",
    "#E6B0AA",
    "#AED6F1",
    "#AED6F1",
    "#DC7633",
    "#2E86C1",
  ];
  const categoriasNombre = [];
  const cantidad = [];
  const generarCaracter = () => {
    const caracter = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
    ];
    const numero = (Math.random() * 15).toFixed(0);
    return caracter[numero];
  };
  const colorHEX = () => {
    var color = "";
    for (let i = 0; i < 6; i++) {
      color = color + generarCaracter();
    }
    return "#" + color;
  };
  //------------------Generar Colores--------------------
  const colores = [];
  for (let i = 0; i < categorias.length; i++) {
    var numero = categorias[i].products.length.toString();
    categoriasNombre.push(categorias[i].categorie);
    cantidad.push(numero);
    if (i < 7) {
      colores.push(coloresDef[i]);
    } else {
      colores.push(colorHEX());
    }
  }
  //-------------Configuracion Grafica-------------
  const datas = {
    labels: categoriasNombre,
    datasets: [
      {
        data: cantidad,
        backgroundColor: colores,
      },
    ],
  };
  const opciones = {
    responsive: true,
    maintainAspectRatio: false,
    pieceLabel: {
      render: function(args) {
        return args.label + ": " + args.value;
      },
      fontSize: 15,
      fontColor: "#fff",
      fontFamily: "Arial",
    },
  };
  return (
    <div className="col" style={{ width: "100%", height: "520px" }}>
      <h3 className="text-center">Productos segun su Categoria</h3>
      <div style={{ width: "100%", height: "450px" }}>
        <Pie data={datas} options={opciones} />
      </div>
    </div>
  );
};
