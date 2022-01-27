import React from "react";
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import background from './restaurant.jpg'
import waitress from './waitress.png'

export default function Welcome(){

    return(
        <WelcomeWrapper>
            <Arrival id='arrival' onClick={()=>{
                document.getElementById('arrival').style.opacity='0'
                setTimeout(() => {
                    if(window.matchMedia("(max-width:600px)")) document.getElementById('waitress').style.right='-100px'
                    else document.getElementById('waitress').style.right='-50px'
                    document.getElementById('waitress').style.opacity='1'
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
                    document.getElementById('text').style.cssText=`
                        animation: typewritter 4s steps(110);
                        width:600px
                    `
                    setTimeout(() => {
                        document.getElementById('tilde').style.opacity='1'
                        document.getElementById('invitation').style.pointerEvents='unset'
                    }, 4000);
                },4000)
                
            }}>
                After a 5 minute drive, you finally arrive at the restaurant.
                <p>➜</p>
            </Arrival>
            <Waitress id='waitress' src={waitress} alt='waitress'/>
            <Invitation id='invitation' onClick={()=>{
                document.getElementById('enter').style.cssText=`
                visibility:visible;
                opacitiy:0;
                `
                document.getElementById('invitation').style.cssText=`
                            opacity: 0;
                            visibility: hidden;
                        `
            }}>
                <Text style={{margin:0}}>Waitress</Text>
                <hr/>
                <Text id='text'>Welcome to X Restaurant! Please seat wherever, I'll be with you shortly <span id='tilde'>&#126;</span></Text>
                <p id='go' style={{position:'absolute', right:'10px', bottom:0}}>➜</p>
            </Invitation>
            <Enter id='enter'><Link to='/home'>Take a seat</Link></Enter>
        </WelcomeWrapper>
    )
}

const WelcomeWrapper = styled.div`
    background-image: url(${background});
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
    
`

const Arrival = styled.div`
    z-index: 2;
    background-color: #f5f5f5ce;
    padding: 10px;
    border-radius: 10px;
    border:4px solid #e45d0f;
    transition: .5s;
    p{
        transition: .5s;
        position: unset;
        text-align: end;
        position: relative;
        padding-right:20px;
        border-right:0px solid black;
    }
    :hover{
        p{
            font-size: large;
            font-weight: bolder;
            padding-right:0px;
            border-right:5px solid black;
        }
    }
`

const Waitress = styled.img`
    width:90vh;
    bottom:0;
    right:100vw;
    opacity: .8;
    transition: 2.5s ease-in-out;
`

const Enter = styled.div`
    background-color:#333030ce;
    border-radius: 15px;
    padding: 10px;
    box-sizing: border-box;
    z-index: 2;
    visibility: hidden;
    opacity: 1;
    transition: 1s;
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
    left:15px;
    right:15px;
    bottom:10px;
    visibility: hidden;
    transition: 1s ease-in-out;
    z-index: 2;
    pointer-events: none;
    #go{
        transition: .5s;
        position: unset;
        text-align: end;
        position: relative;
        padding-right:20px;
        border-right:0px solid black;
    }
    :hover{
        #go{
            font-size: large;
            font-weight: bolder;
            padding-right:0px;
            padding-bottom: 10px 0 10px 0;
            border-right:5px solid black;
        }
    }
    hr{
        position: unset;
        width: 100%;
        border:1px solid black;
    }
    #text{
        width: 0%;
        white-space: nowrap;
        overflow: hidden;
        *{
            opacity:0;
        }
        
    }
    @keyframes typewritter {
            from {width: 0px}
            to {width:600px}
        }
`

const Text = styled.p`
    position:unset;
`