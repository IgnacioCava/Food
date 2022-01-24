import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { detailedSearch, createRecipe } from '../Actions'
import { Link } from 'react-router-dom'
import CreateRec from './CreateRec.jpg'


export default function Creator(){
    
        return( 
            <CreatorWrapper>
                <Backg></Backg>
                <Holder>
                    a
                </Holder>
            </CreatorWrapper>
        )
    
}

const Holder = styled.div`
height: 90%;
width: 50%;
background-color: #1f1f1f6c;
border-radius: 15px;
`

const Backg = styled.div`
    position: absolute;
    background-image: url(${CreateRec});
    background-repeat:no-repeat;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    filter: blur(2px);
    width: 100%;
    height: 100%;
    z-index: -1;
`

const CreatorWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`