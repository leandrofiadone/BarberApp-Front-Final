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
  const { citas } = useSelector((state) => state);
  const { user } = useSelector((state) => state);

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  const filtrado = citas.map((e) => e.date !== date);

  console.log(filtrado);

  const handleChange = (e) => {
    setState({
      ...state,
      date: e,
    });
  };

  return (
    <DatePicker
      selected={date}
      onChange={handleChange}
      timeInputLabel="Horario:"
      dateFormat="MM/dd/yyy h:mm aa"
      showTimeSelect //PODER SELECCIONAR UNA HORA
      timeIntervals={15} //CADA CUANTOS MINUTOS QUIERO QUE SE PUEDA RESERVAR
      minDate={new Date()} //CANCELAR LOS DIAS QUE YA PASARON
      filterTime={filterPassedTime} // CANCELANDO LAS HORAS QUE YA PASARON
      minTime={setHours(setMinutes(new Date(), 0), 9)}
      maxTime={setHours(setMinutes(new Date(), 30), 20)}
      locale="es"
    />
  );
}
export default Calendario;
