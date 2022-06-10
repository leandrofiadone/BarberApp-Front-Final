import React from "react";

const pruebas = () => {
  return (
    <div class="container">
      <div class="card">
        <div class="info">
          <span>Edit form</span> <button id="savebutton">edit</button>
        </div>
        <div class="forms">
          <div class="inputs">
            <span>Nombre y Apellido</span>{" "}
            <input type="text" readonly value={user.name} />
          </div>
          <div class="inputs">
            <span>nose Aun</span>{" "}
            <input type="text" name="name" readonly value="Doe" />{" "}
          </div>
          <div class="inputs">
            <span>Email</span>
            <input type="email" readonly value={user.email} />
          </div>
          <div class="inputs">
            <span>Telefono</span>{" "}
            <input type="text" readonly name="phone" value={formValues.phone} />{" "}
          </div>{" "}
          <div class="inputs">
            <span>Country</span>{" "}
            <input type="text" readonly value="United States" />{" "}
          </div>{" "}
        </div>{" "}
      </div>
    </div>
  );
};

export default pruebas;
