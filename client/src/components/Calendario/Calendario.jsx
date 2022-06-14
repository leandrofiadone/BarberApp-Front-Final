import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { allCitas } from "../../redux/actions/index";

registerLocale("es", es);

function Calendario({ date, setState, state }) {
  const [startDate, setStartDate] = useState(new Date());
  const [fechaUser, setFechauser] = useState();
  const [joina, setJoina] = useState();
  const [joinb, setJoinb] = useState();
  const [joinc, setJoinc] = useState();
  const [joind, setJoind] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allCitas());
  }, [dispatch]);

  const { citas } = useSelector((state) => state);
  const { user } = useSelector((state) => state);
  let idUsuarioLogin = user.id;
  let idEmpleadoSel = state.idEmployee;
  // console.log("calendario/ citas global: ", citas, "\n user global: ", user);
  console.log("----en calendario las citas", citas);
  console.log("-----el usuario ", user);

  console.log("-----el usuario que se logueo es con el id", idUsuarioLogin);
  console.log("-----el empleado seleccionado", idEmpleadoSel);

  // const handleChange = (e) => {
  //   //console.log("aqui b handleChange en calendario.js", e);
  //   setState({
  //     ...state,
  //     date: e,
  //   });
  // };
  //-----------  handleChange
  const handleChange = (e) => {
    console.log("----------la eeeeeeee ews e--- ", e);
    console.log("fecha desglosada", e.toString().split(" "));
    let desgloce = e.toString().split(" ");
    setJoina(desgloce.slice(0, 4));
    setJoinb(desgloce[4]);
    setJoinc(desgloce.slice(5, desgloce.length));
    //console.log("aqui b handleChange en calendario.js", e);
    let ee = new Date(
      "Thu Jun 17 2022 9:30:00 GMT-0500 (hora estándar de Colombia)"
    );
    console.log("el eeeee date new", ee);
    console.log("----------la eeeeeeee ews e--- ", e);

    console.log("fechasYaEmpleado:--- ", fechasYaEmpleado);
    console.log("el eeeee", e.getDate());
    let y = e.getMonth() + 1;
    let x = e.getDate();
    let z = e.getFullYear();
    let d = y + "/" + x + "/" + z;
    setFechauser(d);

    console.log("el date completo", d);

    //---------------------------------------

    //--------------------------------------
    setState({
      //lo pase a handlechangeb
      ...state,
      date: e,
    });
  };
  //----------- fin handleChange
  //----------- handleChangeb
  const handleChangeb = (e) => {
    setStartDate(e);
    console.log("--------tiempo  sta", joinb);
    console.log(joinb);
    //...........sacando hora exacta
    const selectedH = new Date(e);
    let ho = selectedH.getHours();
    let fr;
    if (ho <= 9) {
      ho = "0" + ho;
    }
    if (ho >= 13) {
      // ho = ho - 12;
      fr = "PM";
    } else {
      fr = "AM";
    }
    let mi = selectedH.getMinutes();
    let x1 = selectedH.getMinutes();
    if (mi == 0) {
      mi = "00";
    }
    let hora = ho + ":" + mi + ":00";

    //...........sacando hora exacta
    //...........sacando cadena fecha deseada
    // let d = joina.concat(joinb).concat(joinc);
    let d = joina.concat(hora).concat(joinc);
    let tot = "";
    for (let i = 0; i < d.length; i++) {
      if (i == 0) {
        tot = tot + d[i];
      } else {
        tot = tot + " " + d[i];
      }
    }
    console.log("------total-----", tot);
    setJoind(d);
    //..........fin sacando cadena fecha deseada
    //.........creando fecha..
    let ee = new Date(tot);
    console.log("listoooooooooopara entrega", ee.getDate());
    //.........creando fecha..
    //seteando fecha--------
    setState({
      ...state,
      date: ee,
    });
    //seteando fecha--------
  };
  //----------- fin handleChangeb

  //----------- handleChange2
  const handleChange2 = (e) => {
    setState({
      ...state,
      date: e,
    });
  };
  //-----------fin  handleChange2
  let citasarray = [];
  let citasarrayEmpleado = [];
  let citasarrayEmpleadoF = [];
  let citasUser;
  if (citas) {
    console.log(
      "citas..dentro de is weekday:",
      citas?.map((e) => e.date.split(","))
    );
    citasUser = citas.map((e) => {
      if (e.idUser === idUsuarioLogin) {
        console.log("este usuario tiene citas", e.date.split(","));
        citasarray.push(e.date.split(","));
      } else {
        if (e.idEmployee === idEmpleadoSel) {
          // citasarray.push(e.date.split(","));
          citasarrayEmpleado.push(e.date.split(","));
          citasarrayEmpleadoF.push(e.date.split(","));
        }
        console.log("este usuario no tiene citas");
      }
    });
    console.log("{{{{{{{{{{{citas array", citasarray);
    // citasarray = citas.map((e) => e.date.split(","));
  }
  let fechasYa = citasarray?.map((e) => e[0]);
  let tiempoYa = citasarrayEmpleado?.map((e) => e[1]);
  let fechasYaEmpleado = citasarrayEmpleado?.map((e) => e[0]);
  console.log("fechas ya", fechasYa);
  console.log("fechas ya fechasYaEmpleado---", fechasYaEmpleado);

  let r = 0;

  //filter 2---------------------------------------------
  const isWeekday = (datex) => {
    // console.log("dentro de is weekda");
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

    // console.log("fechas ya:", fechasYa);
    // return day !== 0 && day !== 6;
    return datex2 !== r;
  };
  // console.log("fecha", f);
  // console.log("fecha estado", state.date);
  // if (citas)
  //   console.log(
  //     "citas",
  //     citas.map((e) => e.date.split(","))
  //   );
  // //-------------filter passed time---------------------
  // // if (validarhora === true) {
  // let filterPassedTime = (time) => {
  //   let r2 = 0;
  //   let r3 = null;
  //   const currentDate = new Date();
  //   const selectedDate = new Date(time);
  //   // console.log("proto de selectedDate", selectedDate);
  //   // console.log("selectedDatehora: ", selectedDate.getHours());
  //   // console.log("selectedDateminutos", selectedDate.getMinutes());
  //   let y = selectedDate.getHours();
  //   let fr;
  //   if (y >= 13) {
  //     y = y - 12;
  //     fr = "PM";
  //   } else {
  //     fr = "AM";
  //   }
  //   let x = selectedDate.getMinutes();
  //   let x1 = selectedDate.getMinutes();
  //   if (x == 0) {
  //     x = "00";
  //   }
  //   let d = " " + y + ":" + x + ":00 " + fr;
  //   // console.log("hora---------", d);

  //   console.log("-----dentro de filtrotime-----\n", fechasYaEmpleado);
  //   console.log("-----dentro de filtrotime-----\n", selectedDate.getDate());
  //   let a = selectedDate.getMonth() + 1;
  //   let b = selectedDate.getDate();
  //   let c = selectedDate.getFullYear();
  //   let e = a + "/" + b + "/" + c;
  //   fechasYaEmpleado?.forEach((el) => {
  //     if (el == e) {
  //       return console.log("encontro iguales osea z= mamotreto");
  //     } else {
  //       return console.log("encontro iguales osea z= sin filtro");
  //     }
  //   });
  //   //--------------------------
  //   tiempoYa?.forEach((e) => {
  //     // console.log("horas ya esta--------------", e);
  //     // console.log(e);
  //     // console.log("hora calendario--------------", d);
  //     // console.log(d);
  //     if (e === d) {
  //       // console.log("\n ------entro al if-----------\n");

  //       r2 = y;
  //       r3 = x;
  //       return;
  //     }
  //   });
  //   // console.log("errrrr2222", r2, ":", r3);
  //   // console.log("-------- filterpassedtime1 -----", currentDate);
  //   // console.log("-------- filterpassedtime2 -----", selectedDate);
  //   let z = selectedDate.getHours() !== r2 && selectedDate.getMinutes() !== r3;
  //   // let z= currentDate.getTime() < selectedDate.getTime();
  //   //--------------------------

  //   return z;
  //   return (
  //     selectedDate.getHours() > 9 &&
  //     selectedDate.getHours() < 20 &&
  //     selectedDate.getMinutes() === 30
  //   );
  //   return currentDate.getTime() < selectedDate.getTime();
  // };
  // // } else {
  // //   filterPassedTime = null;
  // // }

  // //---------fin -filter passed time---------------------
  //-------------filter passed time---------------------
  // if (validarhora === true) {
  let filterPassedTime = (time) => {
    console.log("\n \n \n fechauser----------", fechaUser);

    let r2 = 0;
    let r3 = null;
    const currentDate = new Date();
    const selectedDate = new Date(time);
    let y = selectedDate.getHours();
    let fr;
    if (y >= 13) {
      y = y - 12;
      fr = "PM";
    } else {
      fr = "AM";
    }
    let x = selectedDate.getMinutes();
    let x1 = selectedDate.getMinutes();
    if (x == 0) {
      x = "00";
    }
    let d = " " + y + ":" + x + ":00 " + fr;
    let a = selectedDate.getMonth() + 1;
    let b = selectedDate.getDate();
    let c = selectedDate.getFullYear();
    let e = a + "/" + b + "/" + c;
    fechasYaEmpleado?.forEach((el, i) => {
      console.log("eentro a este for", el);
      if (el == fechaUser) {
        //++++++
        // tiempoYa?.forEach((e) => {//-------++
        if (tiempoYa) {
          // console.log("horas ya esta--------------", e);
          // console.log(e);
          // console.log("hora calendario--------------", d);
          // console.log(d);
          if (tiempoYa[i] === d) {
            // console.log("\n ------entro al if-----------\n");

            r2 = y;
            r3 = x;
            return;
          }
        }
        // });--------------------------------++
        //++++++
        return console.log("encontro iguales osea z= mamotreto");
      } else {
        return console.log("encontro iguales osea z= sin filtro");
      }
    });
    //--------------------------
    // //++++++
    // tiempoYa?.forEach((e) => {
    //   // console.log("horas ya esta--------------", e);
    //   // console.log(e);
    //   // console.log("hora calendario--------------", d);
    //   // console.log(d);
    //   if (e === d) {
    //     // console.log("\n ------entro al if-----------\n");

    //     r2 = y;
    //     r3 = x;
    //     return;
    //   }
    // });
    // //++++++

    // console.log("errrrr2222", r2, ":", r3);
    // console.log("-------- filterpassedtime1 -----", currentDate);
    // console.log("-------- filterpassedtime2 -----", selectedDate);
    let z = selectedDate.getHours() !== r2 && selectedDate.getMinutes() !== r3;
    // let z= currentDate.getTime() < selectedDate.getTime();
    //--------------------------

    return z;
    return (
      selectedDate.getHours() > 9 &&
      selectedDate.getHours() < 20 &&
      selectedDate.getMinutes() === 30
    );
    return currentDate.getTime() < selectedDate.getTime();
  };
  // } else {
  //   filterPassedTime = null;
  // }

  //---------fin -filter passed time---------------------
  // const birthday = new Date("August 19, 1975 23:15:30");
  // console.log(birthday.getDate());
  // console.log(birthday.getMonth()); // (January gives 0)
  // console.log(birthday.getFullYear());
  // console.log(birthday.getHours());
  // console.log(birthday.getMinutes());

  // console.log("ffff", fx);

  return (
    <div>
      <DatePicker
        selected={date}
        onChange={handleChange}
        timeInputLabel="Horario:"
        dateFormat="MM/dd/yyy"
        // dateFormat="MM/dd/yyy"
        // showTimeSelect //PODER SELECCIONAR UNA HORA
        filterDate={isWeekday}
        timeIntervals={15} //CADA CUANTOS MINUTOS QUIERO QUE SE PUEDA RESERVAR
        minDate={new Date()} //CANCELAR LOS DIAS QUE YA PASARON
        // filterTime={filterPassedTime} // CANCELANDO LAS HORAS QUE YA PASARON
        // minTime={setHours(setMinutes(new Date(), 0), 9)} //inicio 9:00
        //  maxTime={setHours(setMinutes(new Date(), 30), 16)} //fin 9:30 para ilustrar
        locale="es"
      />
      <DatePicker
        selected={startDate}
        dateFormat="h:mm aa"
        onChange={handleChangeb}
        filterTime={filterPassedTime}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption="Time"
        locale="es"
      />
    </div>
  );
}
export default Calendario;
//{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}
//{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}
