import React, { Component } from 'react';
import { Map, Polyline, GoogleApiWrapper, Marker } from 'google-maps-react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

export class App extends React.Component {
  state = {
    coordinates: {
      from: {
        lat: 0.0,
        lon: 0.0
      },
      to: {
        lat: 0.0,
        lon: 0.0
      }
    },
    results: {
      code: -1,
      message: '',
      distance: 0
    }
  };

  onChange = (e) => {
    var coordinates = { ...this.state.coordinates };
    switch (e.target.name) {
      case 'fromlat':
        coordinates.from.lat = e.target.value;
        this.setState({ coordinates });
        break;
      case 'fromlon':
        coordinates.from.lon = e.target.value;
        this.setState({ coordinates });
        break;

      case 'tolat':
        coordinates.to.lat = e.target.value;
        this.setState({ coordinates });
        break;
      case 'tolon':
        coordinates.to.lon = e.target.value;
        this.setState({ coordinates });
        break;

      default:
        break;
    }
  };

  pathCoordinates = [

  ];

  sendRequest = () => {
    var obj = this;
    fetch('http://127.0.0.1:8000/api/distance/', {
      method: 'post',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.coordinates)
    }).then(function (response) {
      return response.json();
    }).then(function (responseData) {
      console.log(responseData);
      obj.setState({ results: responseData });
    });

  }

  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    this.sendRequest();
  }

  getResultsStyle = () => {
    switch (this.state.results.code) {
      case 1:
        return 'alert-success';
      case 0:
        return 'alert-danger';
      default:
        return;
    }
  }

  render() {
    return (
      <div className="container">
        <form method="POST" className="mt-5" onSubmit={this.onSubmit}>
          <div className="form-group row">
            <label htmlFor="employeesnumber" className="col-sm-2 col-form-label">From</label>
            <div className="col-sm-5">
              <input type="text" step="any" className="form-control" placeholder="Latitude" id="fromlat" onChange={this.onChange} name="fromlat" />
            </div>
            <div className="col-sm-5">
              <input type="text" step="any" className="form-control" placeholder="Longitude" id="fromlon" onChange={this.onChange} name="fromlon" />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="employeesnumber" className="col-sm-2 col-form-label">To</label>
            <div className="col-sm-5">
              <input type="text" step="any" className="form-control" placeholder="Latitude" id="tolat" onChange={this.onChange} name="tolat" />
            </div>
            <div className="col-sm-5">
              <input type="text" step="any" className="form-control" placeholder="Longitude" id="tolon" onChange={this.onChange} name="tolon" />
            </div>
          </div>


          <div className="row">
            <div className="col text-center">
              <button type="submit" className="btn btn-primary">Caluclate</button>
            </div>
          </div>
        </form>

        {this.state.results.code !== -1
          ?
          <div>
            <div className={'mt-5 alert ' + this.getResultsStyle()} role="alert">
              <h4 className="alert-heading">{this.state.results.message}</h4>
              <hr />
              <p className="mb-0"> Distance: {this.state.results.distance} Km</p>
            </div>
            <Map google={this.props.google}
              initialCenter={{ 'lat': parseFloat(this.state.coordinates.from.lat), 'lng': parseFloat(this.state.coordinates.from.lon) }}
              style={{ width: '100%', height: '100%', position: 'relative' }}
              className={'map'}
              zoom={10}>
              <Marker
                title={'PointA'}
                name={'PointA'}
                position={{ 'lat': parseFloat(this.state.coordinates.from.lat), 'lng': parseFloat(this.state.coordinates.from.lon) }} />

              <Marker
                title={'PointB'}
                name={'PointB'}
                position={{ 'lat': parseFloat(this.state.coordinates.to.lat), 'lng': parseFloat(this.state.coordinates.to.lon) }} />

              <Polyline
                path={[{ 'lat': parseFloat(this.state.coordinates.from.lat), 'lng': parseFloat(this.state.coordinates.from.lon) },
                { 'lat': parseFloat(this.state.coordinates.to.lat), 'lng': parseFloat(this.state.coordinates.to.lon) }]}
                strokeColor="#0000FF"
                strokeOpacity={0.8}
                strokeWeight={2} />

            </Map>
          </div>
          : null
        }



      </div>



    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDYZqu2-X2m4a1OTBw1VP_JXo5CGV8z9-E'
})(App);
