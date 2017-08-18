import React from 'react';
import Forecast from 'react-forecast';

export class Weather extends React.Component {
    constructor() {
        super();
        this.state = {
            // default longitude and latitude is set for Kathmandu, Nepal
            longitude: 27.7172,
            latitude: 85.3240,
            name: 'Kathmandu'
        }
    }

    componentWillMount() { 
    /*    if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, err)
        }

        console.log(longitude);
        function showPosition(position) {
            console.log("Function - Longitude: " + position.coords.longitude + " | " + "Latitude: " + position.coords.latitude);
            var longitude = position.coords.longitude;
            var latitude = position.coords.latitude;
            console.log("Function - Longitude: " + longitude);
        }
        function err() {
            console.log("Error getting your current Location details, Try Again or check your Internet Connection!")
        } */
    }
    
    render() {
        // console.log("State - Longitude: " + this.state.longitude + " | " + "Latitude: " + this.state.latitude)
        return(
            <div>
                <Forecast longitude={this.state.longitude} latitude={this.state.latitude} name= {this.state.name}/>
            </div>
        );
    }
}
