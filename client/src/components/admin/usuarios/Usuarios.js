import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchConToken } from "../../../helpers/fetch";
import { banearUser } from "../../../redux/actions";

export const Usuarios = () => {
  const { adminAllUsers } = useSelector((state) => state);

  const dispatch = useDispatch();

  const handleBanear = async (id) => {
    const resp = await fetchConToken(`users/${id}`, {}, "DELETE");
    const data = await resp.json();

    if (data.ok) {
      dispatch(banearUser(data.user));
    } else {
      console.log(data);
    }
  };

  const handleDesBanear = async (id) => {
    const resp = await fetchConToken(`users/${id}`, {}, "PATCH");
    const data = await resp.json();

    if (data.ok) {
      dispatch(banearUser(data.user));
    } else {
      console.log(data);
    }
  };

  return (
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
                  className="btn btn-danger"
                  onClick={() => handleBanear(user.id)}
                >
                  Banear
                </button>
              ) : (
                <button
                  className="btn btn-success"
                  onClick={() => handleDesBanear(user.id)}
                >
                  Activar
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
