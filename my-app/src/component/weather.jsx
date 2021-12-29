import React from 'react';


const Weather = (props) =>{
    // the i tag is for icons
    // the wi-day-sunny is to get the sunny icon
    //Note: display-1 increases the size of the icon
    return (
        <div className="container">
         <div className="cards pt-4">
             <h1>{props.city}</h1>
             <h5 className="py-4">
                 <i className={`wi ${props.weatherIcon} display-1`}></i>
              

             </h5>
             {props.temp_celsius ? <h1 className="py-2">{props.temp_celcius}&deg;</h1>: null}
             {/** shows max and min temperature */}
             {minmaxTemp(props.temp_min,props.temp_max)}

             <h4 className="py-3">{props.description}</h4>
         </div>
        </div>
    )
}

//&degree adds the degree symbol to your app

// this allows for the user to see the minimum and maximum temperature
function minmaxTemp(min,max){
    if(min && max){
       
    return (
        <h3>
            <span className="px-4">{min}&deg;</span>
            <span className="px-4">{max}&deg;</span>
        </h3>
    )
    }

}

export default Weather;