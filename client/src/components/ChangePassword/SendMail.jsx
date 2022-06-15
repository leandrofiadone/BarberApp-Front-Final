import React, { useState } from "react";
import validateEmail from "./validationForm.js"
import './SendMail.css';

const SendMail = () => {
  const [input, setInput] = useState({email:"",notification:""});
  const [error, setError] = useState({});

  const handleChange = (e) =>{
    setInput((input) => {
        return {
          ...input,
          email: e.target.value,
        }
    })
    setError(validateEmail({ ...input, email: e.target.value }));
    }

    const handleSubmit = async() =>{
        const token = localStorage.getItem("token");
        try {
                           //await fetch("http://localhost:3001/api/resetPassword",
            const response = await fetch("https://barber-app-henry.herokuapp.com/api/resetPassword",
            {
            method: "POST",
            body: JSON.stringify(input),
            headers: {
            "Content-Type": "application/json",
            "x-token": token,
                     }
           });

           const json = await response.json();
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
            <h3>Email</h3>
            <form>
              <input className="inputEmail-change"
                type={"email"}
                placeholder={"emailUsuario@mail.com"}
                value={input.email}
                onChange={(e)=> handleChange(e)}
              ></input>
            </form>
            {error.email && <h4 className="error-change">{error.email}</h4>}
          </div>
          <button
            type="submit"
            className="btn btn-dark botonEditar-change"
            onClick={() => handleSubmit()}
          >
            Cambiar Contraseña
          </button>
          {input.notification && <h4 className="notification-change">{input.notification}</h4>}
        </div>
      </div>
    </div>
  );
};

export default SendMail;
