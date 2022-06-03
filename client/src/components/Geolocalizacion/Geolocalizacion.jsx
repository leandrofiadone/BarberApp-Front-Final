import { Map, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";

const Geolocalizacion = () => {
  return (
    //center seria el lugar donde quiera que este ubicado
    <Map center={{ lat: "51.528845", lng: "-0.172728" }} zoom={13}>
      {/* TileLayer es para que me aparezca informacion en el mata */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
    </Map>
  );
};
export default Geolocalizacion;
