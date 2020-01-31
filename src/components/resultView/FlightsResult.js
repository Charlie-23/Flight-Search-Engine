import React, { Component } from 'react';
import moment from 'moment';
import FlightDetails from './Flight-details';
import flights from '../../Data/data';
import './flights.css';

class FlightsResult extends Component 
{

  constructor(props) {
    super(props);

    this.state = {
      isReturnTrip: true,
      flights:flights ,
      searchData:'',
      returnFlight:''
    };
    this.checkFlightAvailability=this.checkFlightAvailability.bind(this);
  }

  componentWillReceiveProps (nextProps){
    this.setState({searchData:nextProps.data});
  }


  checkFlightAvailability(flight) {
    let result=this.state.searchData;
    console.log("dlkndskjvnskj");
      if((result.originCity===flight.originCity) &&(result.destinationCity===flight.destinationCity) && ((result.price.min<=flight.price)&&(flight.price<=result.price.max)))
      { 
           
          if(result.returnTrip)
          {
            if((moment(result.startDate._d).format("MM/DD/YYYY") === moment(flight.departureDate).format("MM/DD/YYYY")))
            {
              flight.returnTrip=true;
              flight.endDate=result.endDate;
              return flight
            }
          }
        //changed date format to "DD/MM/YYYY"
          else
          {
            if((moment(result.date._d).format("MM/DD/YYYY") === moment(flight.departureDate).format("MM/DD/YYYY"))){
              flight.returnTrip=false;
              return flight
              }
         }
      }  

  }

  render() {

      var flightsAvailable;  
      if(this.state.searchData==='')
      {
        flightsAvailable= this.state.flights.map((flight)=> {
            return <FlightDetails flights={flight}></FlightDetails>
        });
      }
      else
      {
       flightsAvailable= this.state.flights.map((flight)=> {
            return <FlightDetails flights={this.checkFlightAvailability(flight)}></FlightDetails>
      });
     }

     debugger;
       let flightDetails = this.state.searchData;
    if (flightDetails) 
    {
      flightDetails = {
        depart_day: moment(flightDetails.startDate).format("MM/DD/YYYY"),
        return_day: moment(flightDetails.endDate).format("MM/DD/YYYY"),
        date:      moment(flightDetails.date).format("MM/DD/YYYY")
      };    
    }

    return (
        <section className="flights">
       <div className="flight__container">
      
        <h2>Available Flights:</h2>
                {this.state.searchData &&
                <h2>
                  <span>{this.state.searchData.originCity}&raquo; </span> 
                  <span> {this.state.searchData.destinationCity} </span> 
                  
                  {
                  this.state.searchData.returnTrip &&
                  <span> &raquo; {this.state.searchData.originCity} </span> 
                  }
              </h2>}
              {this.state.searchData &&
                <h3>
                  <span>Date:{flightDetails.date}</span> <br/>                  
                  {
                  this.state.searchData.returnTrip &&<span>
                  <span>Depart:{flightDetails.depart_day} </span> 
                   <span>Return:{flightDetails.return_day} </span> </span>
                  }
              </h3>}
          {flightsAvailable}
        </div>
      </section>
    );
  }
}

export default FlightsResult;