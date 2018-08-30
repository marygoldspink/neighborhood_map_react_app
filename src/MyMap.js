import React from "react";
import { Map, TileLayer } from "react-leaflet";
import MyMarker from "./MyMarker.js";
import "leaflet/dist/leaflet.css"

// a functional react component for my leaflet map.
// This was based on the example code in react-leaflet here:
// https://github.com/PaulLeCam/react-leaflet/blob/master/example/components/simple.js
class MyMap extends React.Component {
  constructor(props) {
    super(props);

    this.tileRef = this.tileRef.bind(this);
  }

  tileRef(refArg) {
    refArg.leafletElement.on('tileerror', (error) => {
      this.props.handleMapLoadError(error);
    });
  }
  
  render() {
    return (
      <Map center={this.props.position} zoom={this.props.zoom}>
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          ref={this.tileRef}
        />
        {this.props.places.map(place => {
          return <MyMarker key={place.id} place={place}></MyMarker>;
        })}
      </Map>
    );
  }
}


export default MyMap;
