import React from "react";
import { Map, TileLayer } from "react-leaflet";
import MyMarker from "./MyMarker.js";

// a functional react component for my leaflet map.
// This was based on the example code in react-leaflet here:
// https://github.com/PaulLeCam/react-leaflet/blob/master/example/components/simple.js
function MyMap(props) {
  return (
    <Map center={props.position} zoom={props.zoom}>
      <TileLayer
        attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {props.places.map(place => {
        return <MyMarker key={place.id} place={place}></MyMarker>;
      })}
    </Map>
  );
}

export default MyMap;
