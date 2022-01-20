import React from "react";
import cook from './cooking.png'
import button from './button.png'
import styled from 'styled-components'
import background from './backg.png'

export default function Welcome(){



    return(
        <WelcomeWrapper img={background}>
             {/* <img src={background} alt={cook}/> */}
            <Enter>
            <button type='button' onClick={()=>{
                window.location.replace('/home')
            }}><p style={{marginTop: '-40%', fontFamily:'cursive'}}>Click here to start</p></button> 
            </Enter>
            
        </WelcomeWrapper>
    )
}

const WelcomeWrapper = styled.div`
background-image: url(${background});
display: flex;
justify-content: center;
align-items: center;
background-size: contain;
background-position: center;
background-repeat: no-repeat;
height: 100%;
width: 100%;
position: absolute;
@keyframes rotating {
    from{
    transform: rotate(0deg);
    }
    to{
    transform: rotate(360deg);
    }
}
animation: rotating 10s linear infinite;

`

const Enter = styled.div`
display: flex;
justify-content: center;
align-items: center;
width:250px;
height: 250px;
max-height: 35%;
border-radius: 50%;
background-color: #BA8C63;
@media (max-width:900px) {
    width: 28%;
    height: 30vw;
}

animation: rotating 10s linear reverse infinite ;

>button{
    cursor: pointer;
    background-image: url(${button});
    background-size: 90% ;
    background-position: center;
    background-repeat: no-repeat;
    background-color: white;
    width: 80%;
    height:80%;
    border-radius: 50%;
    border:10px solid #cfdcec;
    overflow:hidden;
}
`