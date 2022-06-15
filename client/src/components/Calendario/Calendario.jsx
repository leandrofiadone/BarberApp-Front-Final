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
 const [tiempoUser, settiempoUser] = useState();
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

 //-----------  handleChange
const handleChange = (e) => {
 let desgloce = e.toString().split(" ");
 setJoina(desgloce.slice(0, 4));
setJoinb(desgloce[4]);
 setJoinc(desgloce.slice(5, desgloce.length));

let ee = new Date(
 "Thu Jun 17 2022 9:30:00 GMT-0500 (hora estándar de Colombia)"
 );

 let y = e.getMonth() + 1;
 let x = e.getDate();
 let z = e.getFullYear();
let d = y + "/" + x + "/" + z;
 setFechauser(d);

 settiempoUser();

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
    // console.log("--------tiempo  sta", joinb);
    // console.log(joinb);
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
    setJoind(d);
    //..........fin sacando cadena fecha deseada
    //.........creando fecha..
 let ee = new Date(tot);
 // console.log("listoooooooooopara entrega", ee.getDate());
 //.........creando fecha..
    //seteando fecha--------
    setState({
      ...state,
      date: ee,
    });
    //seteando fecha--------
 }; //----------- fin handleChangeb

//----------- handleChange2
 const handleChange2 = (e) => {
 setState({
...state,
 date: e,
 });
 };
 //-----------fin  handleChange2
 let citasarray = [];
let citasarrayEmpleado = [];
let citasarrayEmpleadoF = [];
 let citasUser;
 if (citas) {
 // console.log(
//   "citas..dentro de is weekday:",
//   citas?.map((e) => e.date.split(","))
 // );
citasUser = citas.map((e) => {
 if (e.idUser === idUsuarioLogin) {
 //console.log("este usuario tiene citas", e.date.split(","));
citasarray.push(e.date.split(","));
 } else {
 if (e.idEmployee === idEmpleadoSel) {
// citasarray.push(e.date.split(","));
 citasarrayEmpleado.push(e.date.split(","));
 citasarrayEmpleadoF.push(e.date.split(","));
 }
//console.log("este usuario no tiene citas");
 }
});
//console.log("{{{{{{{{{{{citas array", citasarray);
// citasarray = citas.map((e) => e.date.split(","));
 }
 let fechasYa = citasarray?.map((e) => e[0]);
 let horasYaUserlogin = citasarray?.map((e) => e[1]);
 let tiempoYa = citasarrayEmpleado?.map((e) => e[1]);let fechasYaEmpleado = citasarrayEmpleado?.map((e) => e[0]);

let r = 0;

 //filter 2---------------------------------------------
 const isWeekday = (datex) => {
 // console.log("dentro de is weekda");
const fecha = datex;
//const day = getDay(datex);
const day = datex.getDay();
 const datex2 = datex.getDate();
 const timex = datex.getTime();

 let y = datex.getMonth() + 1;
 let x = datex.getDate();
 let z = datex.getFullYear();
let d = y + "/" + x + "/" + z;
 fechasYa?.forEach((e) => {
 if (e == d) {
 return (r = x);
 }
 });

 return datex2 !== r && day !== 0;
};

let arregli = [];
 let arregli2 = [];
  let filterPassedTime = (time) => {
 // si la fecha user es igual a alguna de las fechas sel usuario loguado (citasarray[]) que tambien filtre ese tiempo

 let r2 = 0;
 let r3 = null;
 let r4 = null;
 let r5 = null;
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

 //-------------1k
 for (let i = 0; i < fechasYa.length; i++) {
 if (fechaUser == fechasYa[i]) {
 if (horasYaUserlogin[i] === d) {
 r4 = y;
r5 = x;
arregli.push(r4);
 arregli2.push(r5);
 return;
}
 }
 }

 //---------------1k
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
 if (tiempoYa[i] === d) {
r2 = y;
 r3 = x;
 return;
 }
}

 return console.log("encontro iguales osea z= mamotreto");
 } else {
 return console.log("encontro iguales osea z= sin filtro");
 }
 });

 let z =
 selectedDate.getHours() !== r2 &&
 selectedDate.getHours() !== r4 &&
 selectedDate.getMinutes() !== r3 &&
 selectedDate.getMinutes() !== r5;
 // let z= currentDate.getTime() < selectedDate.getTime();
//--------------------------

return z;
 };

 return (
 <div>
 <DatePicker
 selected={date}
 onChange={handleChange}
 timeInputLabel="Horario:"
 dateFormat="MM/dd/yyy"
 // dateFormat="MM/dd/yyy"
 // showTimeSelect //PODER SELECCIONAR UNA HORA
//filterDate={isWeekday}
timeIntervals={15} //CADA CUANTOS MINUTOS QUIERO QUE SE PUEDA RESERVAR
 minDate={new Date()} //CANCELAR LOS DIAS QUE YA PASARON
// filterTime={filterPassedTime} // CANCELANDO LAS HORAS QUE YA PASARON
 // minTime={setHours(setMinutes(new Date(), 0), 9)} //inicio 9:00
 // maxTime={setHours(setMinutes(new Date(), 30), 16)} //fin 9:30 para ilustrar
 locale="es"
 />
 <DatePicker
selected={startDate}
 dateFormat="h:mm aa"
 onChange={handleChangeb}
 filterTime={filterPassedTime}
 showTimeSelect
showTimeSelectOnly
timeIntervals={30}
 timeCaption="Time"
 locale="es"
 minTime={setHours(setMinutes(new Date(), 0), 9)} //inicio 9:00
 maxTime={setHours(setMinutes(new Date(), 30), 16)} //fin 9:30 para ilustrar
 />
</div>
);
}
export default Calendario;