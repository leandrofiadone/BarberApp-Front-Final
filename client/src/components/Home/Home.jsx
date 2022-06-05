import React from "react";
import NavBar from "../NavBar/NavBar";
import Carrousel from "../Carrousel/Carrousel";
import { Servicios } from "../Servicios/Servicios";
import Contenido from "../Chatbot/Chatbot";

import Geolocalizacion from "../Geolocalizacion/Geolocalizacion";

import "./Home.css";
import { MDBFooter } from "mdb-react-ui-kit";

export default function Home() {
  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div className="p-3 backdrop-blur-sm bg-white/30 ">
        <Carrousel />
      </div>

      <br />

      <div className="backdrop-blur-sm bg-white/10">
        <div className="text-light" id="servicios">
          <Servicios />
        </div>
      </div>
      <div className="p-3"></div>

      <div>
        <Contenido />
      </div>

      <div className="contenidoChat" id="chatHome"></div>

      <div>
        {
          <MDBFooter
            bgColor="light"
            className="text-center text-lg-start text-muted"
          >
            <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
              <div className="me-5 d-none d-lg-block" />
              <div className="text-light" id="quienesSomos"></div>
              <span>QUIENES SOMOS</span>
            </section>

            <section>
              <div className="container text-center text-md-start mt-5">
                <div className="row mt-3">
                  <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-1">
                    <div style={{ marginBottom: "5px" }}></div>
                  </div>

                  <div className="col-md-6 col-lg- col-xl-8 mx-auto mb-3">
                    <div style={{ marginBottom: "40px", marginLeft: "35px" }}>
                      <span style={{ fontSize: "20px" }}>
                        Nosotros somos BarberApp, ofrecemos un trato
                        personalizado para que nuestros clientes se sientan
                        comodos, ya que nuestro negocio se basa en la calidad,
                        el acabado de nuestros trabajos y la constate evolucion
                        en estilo y moda para el mejor servicio. Aqui
                        encontraras ese espacio que hemos perdido los hombres,
                        donde cortarse el pelo y afeitarse se convierten en una
                        terapia de amigos y relajacion, mas que un habito. Si
                        aun no encuentras tu estilo nosotros te aconsejaremos el
                        estilo de corte, peinado y afeitado que te favorecera a
                        tu personalidad. Contamos con un equipo de colaboradores
                        que cuenta con una gran experiencia en la innovacion de
                        la juventud. Haganos una visita para que pueda disfrutar
                        de nuestro servicio. Les aseguramos que no se van a
                        arrepentir!
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div
              className="text-center p-4"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
            >
              <a className="text-reset fw-bold" href="https://mdbootstrap.com/">
                BarberApp
              </a>
            </div>
          </MDBFooter>
        }
      </div>
    </div>
  );
}
