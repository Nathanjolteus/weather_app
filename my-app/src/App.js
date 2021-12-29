import React, { Component } from 'react'
import './App.css';

//importing form component
import Form from './component/form';
//importing the weather component
import Weather from './component/weather';
//importing bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
// this is to use the weather icons clone from the github
import 'weather-icons/css/weather-icons.css';


//this const variable stores the apikey --> access to the data
const API_KEY = 'ae551be6b062f8360d933b29fa3c0adb';





export class App extends React.Component {
  //declaring /creating state
  constructor(){
    super();
    this.state= {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celcius: undefined,
      temp_max: undefined,
      temp_min: undefined,
      description: "",
      error:false
    };
    

    this.weatherIcon ={
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    }
  }
  //calculating celsuis temp
  calCelsius(temp){
    //using math.floor to round number
let cell = Math.floor(temp -273.15);
return cell;
  }


  get_WeatherIcon(icons, rangeID){
    switch(true){
      case rangeID >= 200 && rangeID <=232:
        this.setState({icon:this.weatherIcon.Thunderstorm})
        break;
        case rangeID >= 300 && rangeID <=321:
        this.setState({icon:this.weatherIcon.Drizzle})
        break;
        case rangeID >= 500 && rangeID <=531:
        this.setState({icon:this.weatherIcon.Rain})
        break;
        case rangeID >=  600 && rangeID <=622:
        this.setState({icon:this.weatherIcon.Snow})
        break;
        case rangeID >=  701 && rangeID <=781:
        this.setState({icon:this.weatherIcon.Atmosphere })    
         break;
         case rangeID >=  800:
          this.setState({icon:this.weatherIcon.Clear })    
           break;
           case rangeID >=  800:
          
           default: 
           this.setState({icon: this.weatherIcon.Clouds})
        
    }
  }
  //making an api call
  getWeather = async (e)=>{

    //fixes the page needing to reload problem (after each click)
    e.preventDefault();

    //this store the value of the type inputs (when the user types a city or a country)
    //(that city/country) is going to be dynamically/asynchorunously
    //store in the const variables city and country --> respectively
    const city= e.target.elements.city.value;
    const country= e.target.elements.country.value;
   if(city && country){
     
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`);

    
    //converting data into a JSON format-- A MUST
    const response = await api_call.json();

    console.log(response);
// response.name and response.sys.country are gotten from when you console log after doing first api call
// important practie --> always console log after doing an api call to see what data your dealing with 
// and how to change it

// response. is important
    this.setState({
      city: `${response.name},${response.sys.country}`,
      country: response.sys.country,
      celcius: this.calCelsius(response.main.temp),
      temp_max: this.calCelsius(response.main.temp_max),
      temp_min: this.calCelsius(response.main.temp_min),
      description: response.weather[0].description,
      


    })
    this.get_WeatherIcon(this.weatherIcon,response.weather[0].id)
   }else{
     this.setState({error: true})
   }
  }


  render() {
    return (
      
          <div className="App">
            <Form  loadweather={this.getWeather} error={this.state.error}/>

      <Weather 
      city={this.state.city} 
      country={this.state.country} 
      temp_celsius={this.state.celcius}
      temp_max={this.state.temp_max}
      temp_min={this.state.temp_min}
      description={this.state.description}
      weatherIcon ={this.state.icon}

      
      
      />
    </div>
      
    )
  }
}



export default App;
