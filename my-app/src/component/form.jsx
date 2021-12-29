import React from 'react';

import './form.css';

const Form = props =>{
    //line 9 states that if props.error == true(meaning there is an error) then return the error function else return null 
    return(
        <div className="container">
            <div>{props.error ? error:null}</div>
           <form onSubmit={props.loadweather}>
           <div className="row">
                <div className="col-md-3 offset-md-2">
                    <input type="text" className="form-control" name="city" autoComplete="off"
                    placeholder="City"
                    />
                </div>
                <div className="col-md-3">
                <input type="text" className="form-control" name="country" autoComplete="off"
                placeholder="country"
                />
                </div>
                <div className="col-md-3 mt-md-0 text-md-left">
                    <button className="btn btn-warning">Get Weather</button>
                </div>
            </div>
           </form>
        </div>
    )
}

function error(){
    //this function is responsible for how the site will behave when an error occurs(what will render to the screen)
    // mx here means margin x, setting the danger icon to margin of 5
    return (
        <div className="alert alert-danger mx-5" role="alert">Please Enter City and Country</div>
    )
}


export default Form;