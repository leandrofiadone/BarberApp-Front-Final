import React, { useState } from "react";
import validatePassword from "./validatePassword.js"
import './SendMail.css';
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { bottomNavigationClasses } from "@mui/material";

const ResetPassword = () => {
  const [input, setInput] = useState({password1:"",password2:"",notification:""});
  const [error, setError] = useState({});
  const {idUser, token} = useParams();
  const navigate = useHistory();
  const handleChange = (e) =>{
      
    setInput((input) => {
        return {
          ...input,
          [e.target.name]: e.target.value,
        }
    })
    setError(validatePassword({
         ...input,
          [e.target.name]: e.target.value }));
    }

    const handleSubmit = async() =>{
        const data = {idUser,password:input.password1}
        try {   
                             //await fetch(`http://localhost:3001/api/resetPassword/confirmation`
                             //Ruta del deploy->>>
            const response = await fetch("https://barber-app-henry.herokuapp.com/api/resetPassword/confirmation",
            {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
            "Content-Type": "application/json",
            "x-token": token,
                     }
           });

           const json = await response.json();
           console.log(json);
           setInput((input)=>{
               return{
                   ...input,
                   notification: json.msg
               }
           })
                     
        } catch (error) {
            
        }
    }
  return (
    <div className="caja-change">
      <div className="card-change">
        <div className="info-change">
          <div className="bigote-change"></div>
        </div>
        <div className="forms-change">
          <div className="inputs-change">
            <h3>Cambio de Contraseña</h3>
            <form>
              <input className="inputEmail-change"
                type={"password"}
                placeholder={"*******"}
                value={input.password1}
                name="password1"
                onChange={(e)=> handleChange(e)}
              ></input>
              <input className="inputEmail-change"
                type={"password"}
                placeholder={"*******"}
                value={input.password2}
                name="password2"
                onChange={(e)=> handleChange(e)}
              ></input>
            </form>
            {error.password && <h4 className="error-change">{error.password}</h4>}
          </div>
          {input.notification && <h4 className="notification-change">{input.notification}</h4>}
          <button
            type="submit"
            className="btn btn-dark botonEditar-change"
            onClick={() => handleSubmit()}
          >
            Cambiar Contraseña
          </button>
          <button
            className="btn btn-dark botonVolver-change"
            onClick={() => navigate.push('/')}
          >
            Volver
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;