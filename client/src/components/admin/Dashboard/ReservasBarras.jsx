import React from "react";
import { useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  LinearScale,
  BarElement,
  PointElement,
  BarController,
  CategoryScale,
} from "chart.js";
Chart.register(
  LinearScale,
  BarElement,
  PointElement,
  BarController,
  CategoryScale
);

export const ReservasBarras = () => {
  const meses = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  var hoy = new Date();
  const [dia, setDia] = React.useState({
    date: new Date(
      hoy.getMonth() +
        1 +
        "-" +
        hoy.getDate() +
        "-" +
        hoy.getFullYear() +
        " 00:00:00"
    ),
  });
  const { allCitas } = useSelector((state) => state);
  const citasFecha = [];
  const citasCant = [];
  function calcular_fecha_correcta(diaCorrecto, mesCorrecto, añoCorrecto, i) {
    if (diaCorrecto < 1) {
      mesCorrecto--;
      if (mesCorrecto < 0) {
        mesCorrecto = 11;
        añoCorrecto--;
      }
      diaCorrecto = meses[mesCorrecto] + i;
    } else {
      if (diaCorrecto > meses[mesCorrecto]) {
        mesCorrecto++;
        if (mesCorrecto > 11) {
          mesCorrecto = 0;
          añoCorrecto++;
          diaCorrecto = i - meses[11];
        } else {
          diaCorrecto = i - meses[mesCorrecto - 1];
        }
      }
    }
    return [
      mesCorrecto + 1 + "-" + diaCorrecto + "-" + añoCorrecto,
      diaCorrecto + "-" + (mesCorrecto + 1) + "-" + añoCorrecto,
    ];
  }
  for (let i = dia.date.getDate() - 7; i <= dia.date.getDate() + 7; i++) {
    var diaCorrecto = i;
    var mesCorrecto = dia.date.getMonth();
    var añoCorrecto = dia.date.getFullYear();
    var fecha2 = calcular_fecha_correcta(
      diaCorrecto,
      mesCorrecto,
      añoCorrecto,
      i
    );
    var fechaDateIni = new Date(fecha2[0] + " 00:00:00");
    var fecha1 = calcular_fecha_correcta(
      diaCorrecto + 1,
      mesCorrecto,
      añoCorrecto,
      i + 1
    );
    var fechaDateFin = new Date(fecha1[0] + " 00:00:00");
    const cont = 0;
    for (let i = 0; i < allCitas.length; i++) {
      var dateCita = new Date(allCitas[i].date);
      if (dateCita < fechaDateFin && dateCita > fechaDateIni) {
        cont++;
      }
    }
    citasFecha.push(fecha2[1]);
    citasCant.push(cont);
  }
  const data = {
    labels: citasFecha,
    datasets: [
      {
        label: "Citas",
        backgroundColor: "rgba(255, 224, 130,1)",
        borderColor: "black",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255, 224, 130,0.2)",
        hoverBorderColor: "#FFFF00",
        data: citasCant,
      },
    ],
  };
  const opciones = {
    maintainAspectRatio: false,
    responsive: true,
  };
  const handleChange = (e) => {
    e.preventDefault();
    setDia({
      ...dia,
      date: new Date(e.target.value + " 00:00:00"),
    });
  };
  return (
    <div className="col text-center" style={{ width: "100%", height: "600px" }}>
      <h3 className="text-center">Citas Reservadas</h3>
      <input type={"date"} onChange={handleChange} />
      <div style={{ width: "100%", height: "480px" }}>
        <Bar data={data} options={opciones} />
      </div>
    </div>
  );
};
