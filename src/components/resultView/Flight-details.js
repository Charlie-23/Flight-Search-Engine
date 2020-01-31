import React, { Component } from 'react';
import './flights.css';
import moment from 'moment';
import flights from '../../Data/data'


class FlightDetails extends Component 
{

  constructor(props) {
    super(props);
    this.state = {
      isReturnTrip: false,
      flights:flights,
      bookingText: 'Book this flight'
    }
  }

  componentWillReceiveProps (nextProps)
  {
      if(nextProps.flights!==undefined)
      {
          if(nextProps.flights.returnTrip)
          {
            this.setState({isReturnTrip:nextProps.flights.returnTrip});
          }
          else
          {
            this.setState({isReturnTrip:nextProps.flights.returnTrip});            
          }  
        }
  }
  render() 
  {    
      if(this.props.flights!==undefined)
      {
        let flight = this.props.flights;
        flight.date=moment(this.props.flights.departureDate).format("D M YYYY");
        let returnTrip={};
        if(this.state.isReturnTrip)
        {
              flights.map((allFlight)=> 
              {
                  if((flight.destinationCity===allFlight.originCity) &&(flight.originCity===allFlight.destinationCity
                    && (moment(flight.endDate._d).format("D M YYYY") === moment(allFlight.departureDate).format("D M YYYY"))))
                  {
                    returnTrip.departureTime = allFlight.departureTime;
                    returnTrip.number=allFlight.number;
                    returnTrip.originCity=allFlight.originCity;
                    returnTrip.name=allFlight.name;
                    returnTrip.destinationCity=allFlight.destinationCity;
                    returnTrip.price=allFlight.price;
                    returnTrip.date=moment(allFlight.departureDate).format("D M YYYY");
                  }
                return null;
              });
         }
    
      return (
        <div className="flight" ref="flightRef">
          <div className="flight__details">
            <div className="flight__timings">
                <div className="flight__departure">
                <h3 className="flight__number">₹ {this.props.flights.price}</h3>
                <p className="flight__number">{this.props.flights.name.toUpperCase()}</p>
                <p className="flight__codes">{this.props.flights.originCity} &raquo; {this.props.flights.destinationCity}</p>
                <p className="flight__depart__time">Date: {flight.departureDate}</p>
                <p className="flight__depart__time">Depart: {flight.departureTime}</p>
              </div>
              { 
                this.state.isReturnTrip &&
                <div className="flight__return">
                  <h3 className="flight__number">₹ {returnTrip.price}</h3>
                  <p className="flight__number">{returnTrip.name.toUpperCase()}</p>
                  <p className="flight__codes">{returnTrip.originCity} &raquo; {returnTrip.destinationCity}</p>
                  <p className="flight__depart__time">Date: {returnTrip.departureDate}</p>
                  <p className="flight__depart__time">Depart Time: {returnTrip.departureTime}</p>
                </div>
              }          
            </div>
          </div>
          <div className="flight__logo">
            <button 
              className="booking--button"
              onClick={() => this.setState({bookingText: 'Booked'})}>
              {this.state.bookingText}
            </button>
          </div>
        </div>    
        );
    }
    else
    {
      return(<span></span>)
    }
 }
}

export default FlightDetails;