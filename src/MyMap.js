import React from "react";
import { Map, TileLayer } from "react-leaflet";
import MyMarker from "./MyMarker.js";
import "leaflet/dist/leaflet.css"

// A react component for my leaflet map.
// This was based on the example code in react-leaflet here:
// https://github.com/PaulLeCam/react-leaflet/blob/master/example/components/simple.js
class MyMap extends React.Component {
  constructor(props) {
    super(props);

    // We need to use bind here so that the this object
    // is available within the tileerror callback.
    this.tileRef = this.tileRef.bind(this);
  }

  // get a reference to the tile and then listen to
  // tile load errors and tell the parent when one occurs.
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
