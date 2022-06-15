import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { Link, useHistory } from "react-router-dom";
import { types } from "../../types/types";
import Swal from "sweetalert2";
import "./auth.css";
import { Google } from "./Google";
import { fetchConToken, fetchSinToken } from "../../helpers/fetch";
import {
  adminGetAllProducts,
  getCategories,
  login,
  getAllUsers,
} from "../../redux/actions";

export const Login = () => {
  const { isAuth } = useSelector((state) => state);

  const dispatch = useDispatch();
  const history = useHistory();

  const [formLogin, handleLoginInputChange, resetLogin] = useForm({
    email: "",
    password: "",
  });

  const [formRegister, handleRegisterInputChange, resetRegister] = useForm({
    email: "",
    password: "",
    password2: "",
    name: "",
    phone: "",
    rol: "client",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    const resp = await fetchSinToken("auth/login", formLogin, "POST");
    const data = await resp.json();

    if (data.ok) {
      localStorage.setItem("token", data.token);
      const payload = {
        id: data.id,
        email: data.email,
        name: data.name,
        phone: data.phone,
        img: data.img,
        rol: data.rol,
      };

      if (data.rol === "ADMIN") {
        dispatch(getAllUsers());
        dispatch(adminGetAllProducts());
      }

      dispatch(getCategories());
      dispatch(login(payload));
      history.replace("/");
    } else {
      if (data.errors) {
        if (data.errors.email) {
          Swal.fire("Error", data.errors.email.msg, "error");
        } else if (data.errors.password) {
          Swal.fire("Error", data.errors.password.msg, "error");
        }
      } else {
        Swal.fire("Error", data.msg, "error");
      }
    }

    resetLogin();
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formRegister.password !== formRegister.password2) {
      return Swal.fire(
        "Error",
        "Las contraseñas tienen que ser iguales",
        "error"
      );
    }

    const resp = await fetchSinToken("users", formRegister, "POST");
    const data = await resp.json();

    if (data.ok) {
      console.log(data);
      localStorage.getItem("token", data.token);
      const payload = {
        id: data.id,
        email: data.email,
        name: data.name,
        phone: data.phone,
        img: data.img,
        rol: data.rol,
      };
      dispatch(login(payload));
      history.replace("/");
    } else {
      if (data.errors.email) {
        Swal.fire("Error", data.errors.email.msg, "error");
      } else if (data.errors.password) {
        Swal.fire("Error", data.errors.password.msg, "error");
      } else if (data.errors.name) {
        Swal.fire("Error", data.errors.name.msg, "error");
      }
    }

    // resetRegister()
  };

  if (isAuth) {
    history.replace("/");
  }

  return (
    <div className="main">
      <div className="btn-volver">
        <Link to="/">Volver</Link>
      </div>
      <div className="col-login">
        <div className="form-login">
          <h1>Ingresar</h1>
          <form onSubmit={handleLogin} autoComplete="off">
          <div className="logobigote justify-content-center">
            <img src="https://images.vexels.com/media/users/3/132674/isolated/preview/5de3fc4efa4d8ff72773bfc119c1a8e9-bigote-blanco-hipster-3.png" className="justify-content-center"/>
          </div>
            <div className="form-group mb-2 inputIngresar">
            <br/>

              <input
                type="email"
                placeholder="Email"
                className="form-control"
                name="email"
                value={formLogin.email}
                onChange={handleLoginInputChange}
              />
            </div>
            <br/>

            <div className="form-group mb-2">
              <input
                type="password"
                placeholder="Password"
                name="password"
                className="form-control"
                value={formLogin.password}
                onChange={handleLoginInputChange}
              />
            </div>

            <div className="form-group mb-4 botonLogin">
              <button type="submit" className="btn btn-dark">
                Login
              </button>
            </div>

            <div className="form-group mb-2 botonGoogle">
              <Google />
            </div>
          </form>
        </div>
      </div>
      <div className="col-register">
        <div className="form-register">
          <h1>Registro</h1>
          <form onSubmit={handleRegister} autoComplete="off">
            <div className="form-group mb-2">
              <input
                type="email"
                placeholder="Email"
                className="form-control"
                name="email"
                value={formRegister.email}
                onChange={handleRegisterInputChange}
              />
            </div>
            <br/>

            <div className="form-group mb-2">
              <input
                type="password"
                placeholder="Password"
                name="password"
                className="form-control"
                value={formRegister.password}
                onChange={handleRegisterInputChange}
              />
            </div>
            <br/>

            <div className="form-group mb-2">
              <input
                type="password"
                placeholder="Repita su password"
                name="password2"
                className="form-control"
                value={formRegister.password2}
                onChange={handleRegisterInputChange}
              />
            </div>
            <br/>

            <div className="form-group mb-2">
              <input
                type="text"
                placeholder="Tu Nombre"
                name="name"
                className="form-control"
                value={formRegister.name}
                onChange={handleRegisterInputChange}
              />
            </div>
            <br/>

            <div className="form-group mb-2">
              <input
                type="text"
                placeholder="Example: +54 1234567899"
                name="phone"
                className="form-control"
                value={formRegister.phone}
                onChange={handleRegisterInputChange}
              />
            </div>
            <br/>

            <div className="form-group mb-2 botonRegist">
              <button type="submit" className="btn btn-dark">
                Registrarse
              </button>
            </div>

            <div className="form-group mb-2 botonGoogle">
              <Google />
            </div>
          </form>
        </div>
      </div>
      
    </div>
  );
};
