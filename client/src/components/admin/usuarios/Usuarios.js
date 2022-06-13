import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { fetchConToken } from "../../../helpers/fetch";
import { banearUser } from "../../../redux/actions";
import { Buscador } from "./Buscador";
import { Filtros } from "./Filtros";

export const Usuarios = () => {
  const { adminAllUsers } = useSelector((state) => state);

  const dispatch = useDispatch();

  const handleBanear = async (id, name) => {
    const resp = await fetchConToken(`users/${id}`, {}, "DELETE");
    const data = await resp.json();

    if (data.ok) {
      dispatch(banearUser(data.user));
      Swal.fire("Success", `El usuario ${name} baneado`, "success");
    } else {
      console.log(data);
    }
  };

  const handleDesBanear = async (id, name) => {
    const resp = await fetchConToken(`users/${id}`, {}, "PATCH");
    const data = await resp.json();

    if (data.ok) {
      dispatch(banearUser(data.user));
      Swal.fire("Success", `Usuario ${name} desbloqueado`, "success");
    } else {
      console.log(data);
    }
  };

  return (
    <>
      <div className="main-filtros">
        <Buscador />
        <Filtros />
      </div>
      <table className="table table-dark table-striped text-center">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Email</th>
            <th scope="col">Celular</th>
            <th scope="col">Estado</th>
            <th scope="col">Rol</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {adminAllUsers.map((user, index) => (
            <tr key={user.id}>
              <th scope="row">{index + 1}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.state ? "Activo" : "Baneado"}</td>
              <td>{user.rol.rol}</td>
              <td>
                {user.state ? (
                  <button
                    className="btn btn-danger botonBanear"
                    onClick={() => handleBanear(user.id, user.name)}
                  >
                    Banear
                  </button>
                ) : (
                  <button
                    className="btn btn-success botonBanear"
                    onClick={() => handleDesBanear(user.id, user.name)}
                  >
                    Activar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
