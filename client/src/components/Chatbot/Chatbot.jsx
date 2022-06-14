import React, { Component } from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import "./Chatbot.css";
import { Link } from "react-router-dom";

const theme = {
  background: "#f5f8fb",
  headerBgColor: "#000000",
  headerFontColor: "#F7DC6F",
  headerFontSize: "20px",
  botBubbleColor: "#F7DC6F",
  botBubbleSize: "100%",
  botBubbleWidth: "100rem",
  botFontColor: "#000000",
  userBubbleColor: "#000000",
  userFontColor: "#F7DC6F",
  placeholder: "xxx"
};

export default function Contenido() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <div className=" botonAyuda">
          <button
            type="button"
            className="btn"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            data-bs-whatever="@mdo"
          >
            <img
              src="https://universitas.space/pluginfile.php/1178/mod_resource/content/1/icono_seo.png"
              alt=""
            />
          </button>
        </div>

        <div
          className="modal fade "
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog allContainerChat">
            <div className="modal-content">
              <button
                type="button"
                className="btn-close bg-danger"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
              <div className="mb-3 containerChat">
                <ChatBot
                  steps={[
                    {
                      id: "1",
                      message:
                        "Hola, soy BarberBot!. Antes de comenzar, cual es tu nombre?",
                      trigger: "2",
                    },
                    {
                      id: "2",
                      user: true,
                      validator: (value) => {
                        if (/^[a-z]{2,15}$/.test(value.toLowerCase())) {
                          return true;
                        } else {
                          return "Ingrese sólo letras minusculas.";
                        }
                      },
                      trigger: "3",
                    },
                    {
                      id: "3",
                      message: "Hola {previousValue}, es un placer saludarte!",
                      trigger: "4",
                    },
                    {
                      id: "4",
                      message: "Necesitas algo el dia de hoy?",
                      trigger: "5",
                    },
                    {
                      id: "5",
                      options: [
                        { value: "y", label: "Si", trigger: "6A" },
                        { value: "n", label: "No", trigger: "6B" },
                      ],
                    },
                    {
                      id: "6A",
                      message: "Genial! Dime lo que estas buscando...",
                      trigger: "seleccion",
                    },

                    {
                      id: "6B",
                      component: (
                        <div className="text-danger">
                          <b>
                            Gracias por contactarte! <br />
                            <i>chat finalizado</i>
                          </b>
                        </div>
                      ),
                      trigger: "reiniciar",
                    },
                    {
                      id: "reiniciar",
                      options: [
                        { value: "n", label: "Reiniciar Chat", trigger: "1" },
                      ],
                    },
                    {
                      id: "seleccion",
                      options: [
                        { value: "f", label: "Como Comprar", trigger: "7A" },
                        { value: "b", label: "Como Reservar", trigger: "7B" },
                      ],
                    },

                    {
                      id: "7A",
                      component: (
                        <div className="accordion" id="accordionExample">
                          <div className="accordion-item">
                            <h2 className="accordion-header" id="headingTwo">
                              <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseTwo"
                                aria-expanded="false"
                                aria-controls="collapseTwo"
                              >
                                Como Comprar
                              </button>
                            </h2>
                            <div
                              id="collapseTwo"
                              className="accordion-collapse collapse"
                              aria-labelledby="headingOne"
                              data-bs-parent="#accordionExample"
                            >
                              <div className="accordion-body">
                                1. Selecciona tu producto y agregalos al{" "}
                                <b>carrito</b> <br />
                                2. Agrega todos los items que quieras <br />
                                3. Presiona <b>Comprar Ahora</b> <br />
                                4. Una vez derivado a <i>MercadoPago</i> seguis
                                los pasos y completa tus datos personales y de
                                envío <br />
                                5. Por último compras y te llega un mail con
                                todos los datos! <br />
                                <i>
                                  <b>Listo!</b>
                                </i>
                              </div>
                            </div>
                          </div>
                        </div>
                      ),
                      // asMessage: true,
                      trigger: "9",
                    },
                    {
                      id: "7B",
                      component: (
                        <div className="accordion" id="accordionExample">
                          <div className="accordion-item">
                            <h2 className="accordion-header" id="headingTwo">
                              <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseTwo"
                                aria-expanded="false"
                                aria-controls="collapseTwo"
                              >
                                Como Reservar
                              </button>
                            </h2>
                            <div
                              id="collapseTwo"
                              className="accordion-collapse collapse"
                              aria-labelledby="headingOne"
                              data-bs-parent="#accordionExample"
                            >
                              <div className="accordion-body">
                                1. Selecciona tu servicio <br />
                                2. Elije al <b>Barbero</b> <br />
                                3. Marca la fecha en el <i>calendario</i> que te
                                quede mejor <br />
                                4. También la <i>hora</i> <br />
                                5. Por último dale a Reservar! <br />
                                <i>
                                  <b>Listo!</b>
                                </i>
                              </div>
                            </div>
                          </div>
                        </div>
                      ),
                      trigger: "9",
                    },

                    {
                      id: "9",
                      message: "Necesitas algo más el dia de hoy?",
                      trigger: "respuestaVuelta",
                    },
                    {
                      id: "respuestaVuelta",
                      options: [
                        { value: "y", label: "Si", trigger: "6A" },
                        { value: "n", label: "No", trigger: "6B" },
                      ],
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
