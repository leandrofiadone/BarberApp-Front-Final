import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { allCitas } from "../../redux/actions/index";

registerLocale("es", es);

function Calendario({ date, setState, state }) {
  // console.log(
  //   "entro a calendario con date",
  //   date,
  //   "\n setstate \n",
  //   setState,
  //   "\n state \n",
  //   state
  // );
  const { citas } = useSelector((state) => state);
  const { user } = useSelector((state) => state);
  let idUsuarioLogin = user.id;
  let idEmpleadoSel = state.idEmployee;
  // console.log("calendario/ citas global: ", citas, "\n user global: ", user);
  console.log("----en calendario las citas", citas);
  console.log("-----el usuario ", user);
  console.log("-----el usuario que se logueo es con el id", idUsuarioLogin);
  console.log("-----el empleado seleccionado", idEmpleadoSel);

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
    console.log("proto de selectedDate", selectedDate);
    console.log("selectedDatehora: ", selectedDate.getHours());
    console.log("selectedDateminutos", selectedDate.getMinutes());

    // console.log("-------- filterpassedtime1 -----", currentDate);
    // console.log("-------- filterpassedtime2 -----", selectedDate);

    return (
      selectedDate.getHours() > 9 &&
      selectedDate.getHours() < 12 &&
      selectedDate.getMinutes() === 30
    );
    return currentDate.getTime() < selectedDate.getTime();
  };
  let x = filterPassedTime();
  // console.log("probando funcion filterpassedtime xxxxxxx\n", x);
  let y = setHours(setMinutes(new Date(), 0), 9);
  // console.log("probando funcion setHours yyyyy \n", y);

  const handleChange = (e) => {
    //console.log("aqui b handleChange en calendario.js", e);
    setState({
      ...state,
      date: e,
    });
  };
  let d = [];
  let f = [];
  let fx;
  let citasarray = [];
  let citasUser;
  if (citas) {
    console.log(
      "citas..dentro de is weekday:",
      citas.map((e) => e.date.split(","))
    );
    citasUser = citas.map((e) => {
      if (e.idUser === idUsuarioLogin) {
        console.log("este usuario tiene citas", e.date.split(","));
        citasarray.push(e.date.split(","));
      } else {
        if (e.idEmployee === idEmpleadoSel) {
          citasarray.push(e.date.split(","));
        }
        console.log("este usuario no tiene citas");
      }
    });
    console.log("{{{{{{{{{{{citas array", citasarray);
    // citasarray = citas.map((e) => e.date.split(","));
  }
  let fechasYa = citasarray?.map((e) => e[0]);
  let joinFechas = [];
  let r = 0;
  const isWeekday = (datex) => {
    console.log("dentro de is weekda");
    const fecha = datex;
    // const day = datex.getDay();
    const datex2 = datex.getDate();
    const timex = datex.getTime();
    // console.log("dia:", datex.getDate());
    // console.log("mes-1: ", datex.getMonth()); // (January gives 0)
    // console.log("año: ", datex.getFullYear());
    // console.log("hora: ", datex.getHours());
    // console.log("minutos", datex.getMinutes());
    let y = datex.getMonth() + 1;
    let x = datex.getDate();
    let z = datex.getFullYear();
    let d = y + "/" + x + "/" + z;
    fechasYa?.forEach((e) => {
      if (e == d) {
        return (r = x);
      }
    });

    console.log("fechas ya:", fechasYa);
    // return day !== 0 && day !== 6;
    return datex2 !== r;
  };
  // console.log("1111", d);
  console.log("fecha", f);
  console.log("fecha estado", state.date);
  // if (citas)
  //   console.log(
  //     "citas",
  //     citas.map((e) => e.date.split(","))
  //   );
  const birthday = new Date("August 19, 1975 23:15:30");
  console.log(birthday.getDate());
  console.log(birthday.getMonth()); // (January gives 0)
  console.log(birthday.getFullYear());
  console.log(birthday.getHours());
  console.log(birthday.getMinutes());

  // console.log("ffff", fx);

  return (
    <DatePicker
      selected={date}
      onChange={handleChange}
      timeInputLabel="Horario:"
      dateFormat="MM/dd/yyy h:mm aa"
      showTimeSelect //PODER SELECCIONAR UNA HORA
      filterDate={isWeekday}
      timeIntervals={15} //CADA CUANTOS MINUTOS QUIERO QUE SE PUEDA RESERVAR
      minDate={new Date()} //CANCELAR LOS DIAS QUE YA PASARON
      filterTime={filterPassedTime} // CANCELANDO LAS HORAS QUE YA PASARON
      minTime={setHours(setMinutes(new Date(), 0), 9)} //inicio 9:00
      maxTime={setHours(setMinutes(new Date(), 30), 15)} //fin 9:30 para ilustrar
      locale="es"
    />
  );
}
export default Calendario;
