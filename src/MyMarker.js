import React from 'react'
import {Marker, Popup} from 'react-leaflet'
import FourSquarePopup from './FoursquarePopup.js'

// Functional react component to render the marker and it's associated popup.
// Note that I have added some custom code to force it to show the popup when selected.
// This code was taken from https://github.com/PaulLeCam/react-leaflet/issues/317
function MyMarker(props) {
    const position=[props.place.lat, props.place.lng];
    return (
        <Marker position={position}>
            <Popup ref={ref => props.place.selected && setTimeout(() => x(ref, [props.place.lat, props.place.lng]))}>
                <FourSquarePopup place={props.place}></FourSquarePopup>
            </Popup>
        </Marker>
    )
}

// this is a workaround taken from https://github.com/PaulLeCam/react-leaflet/issues/317
function x(ref, pos) {
    if (ref && ref.props) {
        ref.props.leaflet.map.openPopup(ref.leafletElement, pos);
    }
}

export default MyMarker;
