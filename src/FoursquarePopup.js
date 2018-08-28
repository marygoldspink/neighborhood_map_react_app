import React from 'react'
import * as FoursquareAPI from './FoursquareAPI.js'

// This is my custom implementation of the contents of the Leaflet popup
// it maintains a state property called detail which is the
// details of the venue retrieved from Foursquare and an second state
// property called error for when an error is returned from foursquare
class FourSquarePopup extends React.Component {
    state = {
        details: null,
        error: false
    }

    // this call has to be made after the component is mounted I found
    // otherwise if it returns before then the setState call fails.
    componentDidMount() {
        this.loadPlaceFromFoursquare(this.props.place.id);
    }

    // load my place from foursquare.
    // if there is an error I set the error state to true
    loadPlaceFromFoursquare(placeId) {
        FoursquareAPI.get(placeId)
            .then(response => {
                this.setState({
                    details: response
                });
            })
            .catch(() => {
                this.setState({
                    details: null,
                    error: true
                });

            });
    }

    render() {
        // if there is an error then show a popup which says that.
        if (this.state.error) {
            return (
                <section className="foursquare-popup">
                    <h3>{this.props.place.label}</h3>
                    <div class="errorMessage">Additional details couldn't be loaded</div>
                </section>
            )
        }
        // Show the details about the place, or if it hasn't yet loaded, just show the place name.
        return this.state.details ? (
            <section className="foursquare-popup" aria-label="Place details">
                <h3>{this.props.place.label}</h3>
                <address aria-label="Place addresss">
                    {this.state.details.location.formattedAddress.join(', ')}
                </address>
                <div className="description">{this.state.details.description}</div>
                <div className="opening">{this.state.details.hours ? this.state.details.hours.richStatus.text : ''}</div>
                <div className="rating">Rating: {this.state.details.rating}/10</div>
                <a href={this.state.details.url} aria-label="Place website">Website</a>
                <footer>Data provided by Foursquare</footer>
            </section>
        ) : (
            <section className="foursquare-popup">
                <h3>{this.props.place.label}</h3>
            </section>
        )
    }
}

export default FourSquarePopup
