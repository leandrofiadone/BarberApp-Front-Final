import React, { Component } from "react";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
let DefaultIcon = L.icon({
  ...L.Icon.Default.prototype.options,
  iconUrl: icon,
  iconRetinaUrl: iconRetina,
  shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

export default class MapDisplay extends Component {
  state = {
    lat: -34.6063835,
    lng: -58.5362838,
    zoom: 10,
  };

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <MapContainer
        center={position}
        zoom={this.state.zoom}
        style={{ height: "400px", width: "400px" }}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker icon={DefaultIcon} position={position}>
          <Popup>Son Konum</Popup>
        </Marker>
      </MapContainer>
    );
  }
}
