import React from "react";
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import backgroundRestaurant from './Props/restaurant.jpg'
import waitress from './Props/waitress.png'


export default function Welcome(){

    return(
        <WelcomeWrapper>
            <Arrival id='arrival' onClick={()=>{
                document.getElementById("audio").play();
                document.getElementById("audio").volume=.3;
                document.getElementById('arrival').style.opacity='0'
                document.getElementById('arrival').style.pointerEvents='none'
                setTimeout(() => {
                    let waitressMedia = document.getElementById('waitress')
                    if(window.matchMedia("(max-width:600px)").matches) waitressMedia.style.right='-140px'
                    else waitressMedia.style.right='50px'
                    waitressMedia.style.opacity='1'
                    waitressMedia.style.transition='2s ease-in-out'
                },1000)

                setTimeout(() => {
                    document.getElementById('invitation').style.cssText=`
                        opacity: 1;
                        visibility: visible;
                        height: 20%;
                        border:4px solid #dd5c98;
                        padding: 10px;
                    `
                },2500)
                
                setTimeout(() => {
                    document.getElementById('tilde').style.cssText=`
                        animation: typewritter 5s steps(100);
                        width:100%;
                    `
                    setTimeout(() => {
                        document.getElementById('invitation').style.pointerEvents='unset'
                        document.getElementById('invitation').style.cursor='pointer'
                        document.getElementById('go').style.opacity='1'
                        document.getElementById('go').style.animation='next infinite 3s ease-in-out'
                        document.getElementById('go').style.cursor='pointer'
                    },3000);
                },4000)
                
            }}>
                
                After a 5 minute drive, you finally arrive at the restaurant.
                <p>➜</p>
            </Arrival>
            <Waitress id='waitress' src={waitress} alt='waitress'/>
            <Invitation id='invitation' onClick={()=>{
                document.getElementById('invitation').style.cssText=`
                    opacity: 0;
                    visibility: hidden;
                    pointer-events:none;
                `
                document.getElementById('enter').style.cssText=`
                    visibility:visible;
                    opacitiy:0;
                `
                document.getElementById('waitress').style.right='-100vmax'
            }}>
                <Text style={{margin:0}}>Waitress</Text>
                <hr/>
                <Text id='text'><span id='tilde'>Welcome! Please seat wherever, I'll be with you shortly&#126;</span></Text>
                <p id='go' style={{position:'absolute', right:'10px', bottom:0}}>➜</p>
            </Invitation>
            <Enter id='enter'><Link to='/home'>Take a seat</Link></Enter>
        </WelcomeWrapper>
    )
}

const WelcomeWrapper = styled.div`
    background-image: url(${backgroundRestaurant});
    display: flex;
    justify-content: center;
    align-items: center;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 100%;
    width: 100vw;
    position: fixed;
    *{
        position: fixed;
    }
    @keyframes next{
        from{
            padding-right:20px;
            border-right:0px solid black;
        }
        40%{
            padding-right:0px;
            border-right:5px solid black;
        }
        60%{
            padding-right:0px;
            border-right:5px solid black;
        }
        to{
            padding-right:20px;
            border-right:0px solid black; 
        }
    }
    
`

const Arrival = styled.div`
    z-index: 2;
    background-color: #f5f5f5ce;
    padding: 10px;
    border-radius: 10px;
    border:4px solid #e45d0f;
    transition: .5s;
    font-size: large;
    font-weight:bold;
    max-width:80%;
    margin-left:20px;
    margin-right:20px;
    cursor: pointer;
    p{
        text-align: end;
        position: unset;
        font-size: large;
        font-weight: bolder;
        animation: next infinite 3s ease-in-out;
    }
`

const Waitress = styled.img`
    width:90vh;
    bottom:0;
    right:100vw;
    opacity: .85;
`

const Enter = styled.div`
    background-color:#333030f2;
    border-radius: 15px;
    padding: 10px;
    box-sizing: border-box;
    z-index: 2;
    visibility: hidden;
    opacity: 1;
    transition: .5s;
    a{
        position: unset;
        color:white;
        text-decoration: none;
        font-size: xx-large;
        text-align: start;
    }
    :hover{
        background-color: #0c0c42ea;
    }
`

const Invitation = styled.div`
    opacity: 0;
    background-color: #f5f5f5e6;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: larger;
    height: 0%;
    border:0px solid #dd5c98;
    padding: 0px;
    border-radius: 10px;
    left:10px;
    right:10px;
    bottom:10px;
    visibility: hidden;
    transition: 1s ease-in-out;
    z-index: 2;
    pointer-events: none;
    #go{
        transition: .5s;
        opacity: 0;
        position: unset;
        text-align: end;
        position: absolute;
        padding-right:20px;
        border-right:0px solid black;
    }
    hr{
        position: unset;
        width: 100%;
        border:1px solid black;
    }
    #text{
        @keyframes typewritter {
            from {width: 0px}
            to {width:100%}
        }
        #tilde{
            width: 0%;
            white-space: nowrap;
            text-align: left;
            //font-size: 2vw;
            overflow: hidden;
            margin:0;
            @media (max-width:520px){
                font-size:3.7vw;
            }
            @media (max-width:420px){
                font-size:3vw;
            }
        }   
    }
    
`

const Text = styled.p`
    position:unset;
`