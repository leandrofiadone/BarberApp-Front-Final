import { Link, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { crearCita, getServices, allBarberos } from "../../redux/actions";

import Calendario from "../Calendario/Calendario";

import Swal from "sweetalert2";

import "./Reserva.css";

const validate = (state) => {
  let errors = {};

  if (!state.service.length) {
    errors.service = "Seleccione un servicio";
  } else if (!state.barberos.length) {
    errors.barberos = "Seleccione un barbero";
  } else if (!state.date.length) {
    errors.date = "Elija la fecha y la hora";
  }

  return errors;
};

export function Reserva() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);
  const history = useHistory();

  const allServices = useSelector((state) => state.servicios);
  const subBarberos = useSelector((state) => state.barberos);

  const [errors, setError] = useState({});
  const [state, setState] = useState({
    date: new Date(),
    service: "",
    idEmployee: "",
    barberos: "",
    idUser: user,
  });

  useEffect(() => {
    dispatch(getServices());
    dispatch(allBarberos());
  }, [dispatch]);

  const handleChange = (e) => {
    e.preventDefault();
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    setError(
      validate({
        ...state,
        [e.target.name]: e.target.value,
      })
    );
  };
  const handleChangeBarberia = (e) => {
    e.preventDefault();
    setState({
      ...state,
      idEmployee: e.target.value,
      barberos: e.target.value,
    });
    setError(
      validate({
        ...state,
        idEmployee: e.target.value,
        barberos: e.target.value,
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userId = state.idUser.id;

    if (Object.values(errors).length <= 0)
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Complete la informacion requerida ",
        confirmButtonText: "OK",
      });
    else if (state.service.length === 0)
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Complete la informacion requerida ",
        confirmButtonText: "OK",
      });
    else if (state.barberos.length === 0)
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Complete la informacion requerida ",
        confirmButtonText: "OK",
      });
    else if (state.date.length === 0)
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Complete la informacion requerida D",
        confirmButtonText: "OK",
      });
    else {
      dispatch(
        crearCita({
          date: state.date.toLocaleString("en-US"),
          service: state.service,
          idEmployee: state.idEmployee,
          idUser: userId,
        })
      );

      Swal.fire({
        icon: "success",
        title: "Cita creada con exito",
        showConfirmButton: false,
        timer: 1500,
      });

      setTimeout(() => {
        history.push("/");
        window.location.reload();
      }, 2000);
    }
    console.log(state);
    console.log(state);
  };
  console.log(state);

  return (
    <div className="foto">
      <Link to="/">
        <button className="boton">Volver</button>
      </Link>

      <div className="contenedor">
        <div className="col-login">
          <div className="form-login">
            <form onSubmit={(e) => handleSubmit(e)} data-netlify="true">
              <div className="  form-group mb-2">
                <label className="palabra">Servicio</label>
                <select
                  onChange={(e) => handleChange(e)}
                  className="form-select"
                  name="service"
                  value={state.service}
                >
                  <option hidden> Seleccione un servicio</option>
                  {allServices?.map((e) => (
                    <option key={e.id} value={e.name}>
                      {e.name}
                    </option>
                  ))}
                </select>
                {errors.service && <p className="errorMjs">{errors.service}</p>}
              </div>

              <div className=" form-group mb-2">
                <label className="text-light">Barbero</label>
                <select
                  onChange={(e) => handleChangeBarberia(e)}
                  className="form-select "
                  name="barberos"
                >
                  <option hidden>Seleccione un barbero</option>
                  {subBarberos?.map((e, index) => (
                    <option key={index} value={[e.id]}>
                      {e.name}
                    </option>
                  ))}
                </select>
                {errors.barberos && (
                  <p className="textoError">{errors.barberos}</p>
                )}
              </div>

              <label>
                Fecha y hora
                <Calendario
                  name="date"
                  date={state.date}
                  value={state.date}
                  setState={setState}
                  state={state}
                  onChange={(e) => handleChange(e)}
                />
              </label>
              <br />
              <br />
              <br />
              <br />
              <div className="mb-3">
                <button type="submit" className=" btn btn-primary w-100 fs-5">
                  Reservar!
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Reserva;
