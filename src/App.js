import React, { Component } from 'react';
import './App.css';
import MyMap from './MyMap';
import hamburgerIcon from './icon-hamburger-menu.svg';
import SidebarListView from './SidebarListView';

// This is the main entry point into my applicaton.
// The state manages:
// - the initial zoom of the map
// - the current searchText used to filter the places
// - whether the side bar is open or not
// - my list of 5 places. The id's are the foursquare id's
class App extends Component {
  state = {
    zoom: 17,
    searchText: '',
    showSidebar: false,
    mapLoadError: false,
    places: [{
      id: "50b0bb32e4b03c6b1e26d2ae",
      label: "Patty & Bun",
      lat: 51.52442120668638,
      lng: -0.07538762264556896
    }, {
      id: '4eb28c766da1df5f01d3db7d',
      label: 'BOXPARK Shoreditch',
      lat: 51.52358395816026,
      lng: -0.0761542685722114
    }, {
      id: '4acda5bbf964a5207ecc20e3',
      label: 'Shoreditch House',
      lat: 51.52388468468652,
      lng: -0.07626056671142578
    }, {
      id: "5040721ae4b01446aa41d438",
      label: "Dishoom",
      lat: 51.52452361919365,
      lng: -0.07674786755631656
    }, {
      id: "4ac518e9f964a520d2ab20e3",
      label: "Rich Mix Cultural Foundation",
      lat: 51.524202849011516,
      lng: -0.07321058358600689
    }]
  }

  // show or hide the sidebar.
  toggleSidebar() {
    this.setState({showSidebar: !this.state.showSidebar});
  }

  // this sets the current searchText.
  // originally I did the filtering here too, but then I found I lost my original
  // set of data, so I decided that doing the filter down in the render() function
  // was better than either losing the data or maintaining two arrays of data.
  filterPlaces(text) {
    if (!text || text.length === 0) {
      this.setState({
        searchText: ''
      });
      return;
    }
    this.setState({
      searchText: text
    });
  }

  handleMapLoadError(error) {
    this.setState({
      mapLoadError: error
    });
    // I'll remove the message after a few seconds in case connectivity was restored.
    setTimeout(() => {
      this.setState({
        mapLoadError: false
      });
    }, 10000)
  }

  // This handles a place being selected in the sidebar menu and sets its
  // state to be selected.
  handlePlaceSelected(place) {
    let places = this.state.places.slice();
    places.forEach(placeInState => {
      if (placeInState.id === place.id) {
        placeInState.selected = true
      } else {
        placeInState.selected = false
      }
    });
    this.setState({
      places: places
    })
  }

  render() {
    // we'll set our initial position to be the first place in our list
    const position = [this.state.places[0].lat, this.state.places[0].lng];
    // we filter our places here based on the search text
    const places = this.state.places.filter(place => {
      return place.label.toLowerCase().indexOf(this.state.searchText.toLowerCase()) > -1;
    });
    return (
      <div className={this.state.showSidebar ? 'App active' : 'App'}>
        <header className="App-header">
          <button className="menu-button" onClick={() => this.toggleSidebar()} aria-label="Toggle sidebar visibility">
            <img className="menu-button-image" alt="menu" src={hamburgerIcon} />
          </button>
          <h1 className="App-title">Hipster Shoreditch</h1>
        </header>
        <div aria-label="Map of places" role="application">
          {this.state.mapLoadError ? (<div className="errorMessage">Some parts of the map could not be loaded</div>) : ''}
          <MyMap position={position} zoom={this.state.zoom} places={places}
                 handleMapLoadError={(error) => this.handleMapLoadError(error)}></MyMap>
        </div>
        <SidebarListView places={places} handleSearch={(text) => this.filterPlaces(text)} handlePlaceSelected={(place) => this.handlePlaceSelected(place)}></SidebarListView>
      </div>
    );
  }
}

export default App;
