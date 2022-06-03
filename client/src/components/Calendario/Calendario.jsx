import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
/* import { addDays } from "date-fns"; */

import "react-datepicker/dist/react-datepicker.css";

registerLocale("es", es);

function Calendario({ date, setState, state }) {
  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

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
      /* maxDate={new Date().setMonth(new Date().getMonth() + 2)} */
      filterTime={filterPassedTime} // CANCELANDO LAS HORAS QUE YA PASARON
      /*  excludeDates={[addDays(new Date(), 1), addDays(new Date(), 5)]}
      includeDates={[new Date(), addDays(new Date(), 1)]} */ //excluye la hora, pero cuando yo se la expecifico, deberia intentar una logica que lo maneje directamente con lo que me llega del back
      placeholderText="This only includes today and tomorrow"
      locale="es"
    />
  );
}
export default Calendario;
