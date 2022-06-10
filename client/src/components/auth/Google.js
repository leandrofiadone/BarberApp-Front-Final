import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchSinToken } from "../../helpers/fetch";
import { login } from "../../redux/actions";
import Swal from "sweetalert2";

export const Google = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const responseGoogle = async (response) => {
    const id_token = response.credential;
    const resp = await fetchSinToken("auth/google", { id_token }, "POST");
    const data = await resp.json();
    if (data.ok) {
      const payload = {
        id: data.id,
        email: data.email,
        name: data.name,
        rol: data.rol,
        img: data.img,
        phone: data.phone,
      };
      localStorage.setItem("token", data.token);
      dispatch(login(payload));
      history.replace("/");
    } else {
      Swal.fire("Error", data.msg, "error");
    }
  };

  return (
    <GoogleLogin
      clientId=""
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={"single_host_origin"}
    />
  );
};
