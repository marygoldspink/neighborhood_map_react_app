import React from 'react'
import {Marker, Popup} from 'react-leaflet'
import FourSquarePopup from './FoursquarePopup.js'
import markerActive from './marker-icon-active.png'
import marker from './marker-icon.png'
import L from 'leaflet'

// Functional react component to render the marker and it's associated popup.
// Note that I have added some custom code to force it to show the popup when selected.
// This code was taken from https://github.com/PaulLeCam/react-leaflet/issues/317
function MyMarker(props) {
    // loading two different marker icons to use when a place selected
    // the other properties I copied from the leaflet.js source code.
    const customMarker = L.icon({ iconUrl: markerActive, iconSize:    [25, 41],
		iconAnchor:  [12, 41],
		popupAnchor: [1, -34],
		tooltipAnchor: [16, -28],
		shadowSize:  [41, 41]})
    const defaultMarker = L.icon({ iconUrl: marker, iconSize:    [25, 41],
		iconAnchor:  [12, 41],
		popupAnchor: [1, -34],
		tooltipAnchor: [16, -28],
		shadowSize:  [41, 41] })
    const position=[props.place.lat, props.place.lng];
    return (
        <Marker position={position} icon={props.place.selected ? customMarker : defaultMarker}>
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
