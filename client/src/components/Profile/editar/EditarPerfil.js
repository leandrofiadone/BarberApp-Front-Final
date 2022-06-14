import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { fetchConToken } from "../../../helpers/fetch";
import { useForm } from "../../../hooks/useForm";
import { types } from "../../../types/types";
import "./editarPerfil.css";
import { useHistory } from "react-router-dom";
export const EditarPerfil = () => {
  const { user } = useSelector((state) => state);

  const [formValues, handleInputChange, reset] = useForm({
    name: user.name,
    password: "",
    phone: user.phone,
  });

  const dispatch = useDispatch();
  const navigate = useHistory();

  const handleUpdate = async () => {
    const resp = await fetchConToken(`users/${user.id}`, formValues, "PUT");
    const data = await resp.json();

    if (data.ok) {
      const payload = {
        id: data.id,
        email: data.email,
        name: data.name,
        phone: data.phone,
        img: data.img,
        rol: data.rol,
      };
      dispatch({ type: types.login, payload });
      Swal.fire("Success", "Cambios realizados correctamente", "success");
    } else {
      console.log(data);
    }
  };

  return (
    <div className="caja">
      <div className="card">
        <div className="info">
          <div className="bigote"></div>
        </div>
        <div className="forms">
          <div className="inputs">
            <h3>Nombre y Apellido</h3>
            <input
              className="borde"
              type="text"
              name='name'
              placeholder={user.name}
              // value={formValues.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="inputs">
            <h3>Email</h3>
            <input
              className="borde"
              type="email"
              readOnly
              value={user.email}
              disabled
            />
          </div>
          <div className="inputs">
            <h3>Telefono</h3>
            <input
              className="borde"
              type="text"
              name="phone"
              // value={formValues.phone}
              onChange={handleInputChange}
              placeholder={user.phone}
            />
          </div>
          <button
            type="button"
            className="btn btn-dark botonEditar"
            onClick={handleUpdate}
          >
            Editar
          </button>

          <button
            type="button"
            className="btn btn-dark botonCambiarContraseña"
            onClick={() => navigate.push("/sendMail")}
          >
            Cambiar Contraseña
          </button>
        </div>
      </div>
    </div>
  );
};
