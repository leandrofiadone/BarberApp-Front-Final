import NavBar from "../NavBar/NavBar";
import Carrousel from "../Carrousel/Carrousel";
import { Servicios } from "../Servicios/Servicios";
import Contenido from "../Chatbot/Chatbot";

// import Geolocalizacion from "../Geolocalizacion/Geolocalizacion";

import "./Home.css";
// import { MDBFooter } from "mdb-react-ui-kit";

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

      
    </div>
  );
}
