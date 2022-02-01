import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import './LandingPage.css'
import axiosInstance from '../../AxiosInstance';


function LandingPage() {

  const history = useHistory()
  const [inputToken,setInputToken] = useState();

  const verifyToken = () =>{
    sessionStorage.setItem('token',inputToken)
    axiosInstance.post("verify",{token:inputToken}).then((res)=>{
      if(res.data === "Success"){
        history.push('/admin/dashboard')
      }
      else{
        window.location.href = '/'
      }
    })
  };

  const handleInputTokenChange = (event) =>{
    setInputToken(event.target.value)
  };

    return (
      <div className="background">
        <p className="line-1 anim-typewriter">IPL Auction</p>
            <input className="c-checkbox" type="checkbox" id="checkbox"/>
            <div className="c-formContainer">
              <div className="c-form">
                <input className="c-form__input" placeholder="Token" onChange={handleInputTokenChange} required/>
                <label className="c-form__buttonLabel" htmlFor="checkbox" onClick={verifyToken}>
                  <button className="c-form__button" type="button" onClick={verifyToken}>Send</button>
                </label>
                <label className="c-form__toggle" htmlFor="checkbox" data-title="Login "></label>
              </div>
        </div>    
      </div>
    )
}

export default LandingPage
