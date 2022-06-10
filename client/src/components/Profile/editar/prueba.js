import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { fetchConToken } from "../../../helpers/fetch";
import { useForm } from "../../../hooks/useForm";
import { types } from "../../../types/types";

export const EditarPerfil = ({ id }) => {
  const { user } = useSelector((state) => state);

  const [formValues, handleInputChange, reset] = useForm({
    name: user.name,
    password: "",
    phone: user.phone,
  });

  const dispatch = useDispatch();

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
    <div className="main-editar">
      <h1 className="display-3 text-light">Mi Informacion</h1>
      <div className="row">
        <div className="col-md-3">
          <input
            className="form-control"
            type="email"
            value={user.email}
            disabled
          />
        </div>
        <div className="col-md-3">
          <input
            className="form-control"
            type="text"
            name="name"
            value={formValues.name}
            onChange={handleInputChange}
            placeholder="Nombre"
          />
        </div>
        {/*   </div> */}

        {/*    <div className="row mt-2"> */}
        <div className="col-md-3">
          <input
            className="form-control"
            type="text"
            name="phone"
            value={formValues.phone}
            onChange={handleInputChange}
            placeholder="Phone"
          />
        </div>
      </div>
      {/*      <button className="btn btn-primary mt-3" onClick={handleUpdate}>
        Editar
      </button> */}
    </div>
  );
};
