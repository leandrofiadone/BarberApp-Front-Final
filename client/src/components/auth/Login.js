import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { Link, useHistory } from "react-router-dom";
import { types } from "../../types/types";
import Swal from "sweetalert2";

export const Login = () => {
  const { isAuth } = useSelector((state) => state);

  const dispatch = useDispatch();
  const history = useHistory();

  const [form, handleInputChange, reset] = useForm({
    email: "",
    password: "",
  });

  const { email, password } = form;

  const handleLogin = (e) => {
    e.preventDefault();

    fetch("https://barber-app-henry.herokuapp.com/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.ok) {
          localStorage.setItem("token", data.token);
          dispatch({
            type: types.login,
            payload: {
              id: data.id,
              email: data.email,
              name: data.name,
              rol: data.rol,
            },
          });
          history.replace("/");
        } else {
          Swal.fire("Error", "Verifica tus datos", "error");
        }
      })
      .catch((err) => console.log(err));

    reset();
  };

  if (isAuth) {
    return (
      <>
        <h1>
          Que diablos haces aqui andate al
          <Link to="/"> Home</Link>
        </h1>
      </>
    );
  }

  return (
    <div>
      <hr />
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="email"
          name="email"
          value={email}
          onChange={handleInputChange}
        />

        <input
          type="password"
          placeholder="password"
          name="password"
          value={password}
          onChange={handleInputChange}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};
