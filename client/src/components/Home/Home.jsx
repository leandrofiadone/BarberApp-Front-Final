import React, { useRef } from "react";
// import NavBar from "../NavBar/NavBar";
import Carrousel from "../Carrousel/Carrousel";
import { Servicios } from "../Servicios/Servicios";
import Contenido from "../Chatbot/Chatbot";

//NAVBAR

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ComprasPerfil } from "../Profile/compras/ComprasPerfil";

import { logout } from "../../redux/actions/index";

import "../NavBar/NavBar.css";

/////////////////////////////////////////////////////

import Geolocalizacion from "../Geolocalizacion/Geolocalizacion";

import "./Home.css";
// import { MDBFooter } from "mdb-react-ui-kit";

import Typed from "typed.js";

const TypedReactHooksDemo = () => {
  // Create reference to store the DOM element containing the animation
  const el = React.useRef(null);
  // Create reference to store the Typed instance itself
  const typed = React.useRef(null);

  React.useEffect(() => {
    const options = {
      strings: [
        "Nosotros somos BarberApp, ofrecemos un trato personalizado para que nuestros clientes se sientan comodos, ya que nuestro negocio se basa en la calidad, el acabado de nuestros trabajos y la constate evolucion en estilo y moda para el mejor servicio. Aqui encontraras ese espacio que hemos perdido los hombres, donde cortarse el pelo y afeitarse se convierten en una terapia de amigos y relajacion, mas que un habito. Si aun no encuentras tu estilo nosotros te aconsejaremos el estilo de corte, peinado y afeitado que te favorecera a tu personalidad. Contamos con un equipo de colaboradores que cuenta con una gran experiencia en la innovacion de la juventud. Haganos una visita para que pueda disfrutar de nuestro servicio. Les aseguramos que no se van a arrepentir!",
      ],
      typeSpeed: 30,
    };

    // elRef refers to the <span> rendered below
    typed.current = new Typed(el.current, options);
  }, []);

  return (
    <div className="type-wrap">
      <span ref={el} />
    </div>
  );
};
document.getElementById("react-root");

export default function Home() {
  const { isAuth, user } = useSelector((state) => state);

  const dispatch = useDispatch();
  const history = useHistory();
  const handleLogout = () => {
    dispatch(logout());
    history.replace("/");
  };

  const quienesSomos = useRef(null);

  const sectionServicios = useRef(null);

  const handleQuienesSomos = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: "smooth",
    });
  };

  const handleServicios = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: "smooth",
    });
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark p-3" id="menu">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/"></Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            
            <li onClick={() => handleServicios(sectionServicios)}>
              <a className="nav-link text-light botonServicios">
                Servicios
              </a>
            </li>
            <li onClick={() => handleQuienesSomos(quienesSomos)} >
              <a className="nav-link text-light botonQuienes" >
                Quienes Somos
              </a>
            </li>
            <li className="nav-item" id="LinkTienda">
              <Link className="nav-link text-light" to="/tienda">
                Tienda
              </Link>
            </li>
          

              {!isAuth && (
                <Link className="nav-item linkReserva" to="/auth/login">
                  <li className="nav-item">
                    <button className="bg-dark mx-2">
                      Ingresar/Registrarse
                    </button>
                  </li>
                </Link>
              )}

              {isAuth && (
                <Link className="nav-item linkReserva" to={`/profile`}>
                  <li className="nav-item">
                    <button className="bg-dark mx-2">Perfil</button>
                  </li>
                </Link>
              )}

            </ul>

            
            {isAuth && (
              <span className="linkReserva">
                <button
                  onClick={handleLogout}
                  className="btnCita btn btn-warning fw-bold"
                  type="button"
                >
                  Salir
                </button>
              </span>
            )}
            {isAuth && isAuth ? (
              <Link to="/reserva" className="linkReserva">
                <button
                  className="btnCita btn btn-warning fw-bold"
                  type="button"
                >
                  Reserva tu cita
                </button>
              </Link>
            ) : (
              <Link to="auth/login" className="linkReserva">
                <button
                  className="btnCita btn btn-warning fw-bold"
                  type="button"
                >
                  Reserva tu cita
                </button>
              </Link>
            )}
          </div>
          </div>
      </nav>
      
      
      
      <div className="p-3 backdrop-blur-sm bg-white/30 ">
        <Carrousel />
      </div>

      <br />

      <div ref={sectionServicios} className="backdrop-blur-sm bg-white/10">
        <div className="text-light">
          <Servicios />
        </div>
      </div>
      <div className="p-3"></div>

      <div className="divwsp">
        <a href="https://wa.me/+5491138951721" target="_blank">
          <img
            src="https://i.ibb.co/Th1XCXz/Dise-o-sin-t-tulo-1.png"
            alt="..."
          />
        </a>
      </div>

      <div>
        <Contenido />
      </div>

      <div className="contenidoChat" id="chatHome"></div>

      <div>
        {
          // <MDBFooter
          //   bgColor="light"
          //   className="text-center text-lg-start text-muted"
          // >
          <div ref={quienesSomos}>
            <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
              <div className="me-5 d-none d-lg-block" />
              <div className="text-light"></div>
            </section>

            <section>
              <div className="container text-center text-md-start mt-5">
                <div className="row mt-3">
                  <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-1">
                  <Geolocalizacion />
                    <div style={{ marginBottom: "5px" }}></div>
                  </div>
                  <div className="col-md-6 col-lg- col-xl-8 mx-auto mb-3">
                    <div style={{ marginBottom: "40px", marginLeft: "35px" }}>
                      <div id="react-root" style={{ fontSize: "20px" }}>
                        <TypedReactHooksDemo />
                      </div>
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
                Barber App
              </a>
            </div>
          </div>
          // </MDBFooter>
        }
      </div>
    </div>
  );
}
