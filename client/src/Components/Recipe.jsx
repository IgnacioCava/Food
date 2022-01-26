import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import score from './score.png'
import hScore from './healthScore.png'
import timer from './timer.png'


export default function Recipe({id}){
    
    const thisRecipe = useSelector(state=>state.currentPage.find(r=>r.id===id))
    
    let a=0
    if(thisRecipe){
        return(
            
            <Holder>
                <Link to={`/recipe/${id}`} style={{position:'absolute', width:'100%', height:'100%', zIndex:'2'}}>
                </Link>
                <Title>{thisRecipe.name}</Title>
                <Poster src={thisRecipe.image} alt='Img'/>
                <Score>
                    {thisRecipe.score?
                    <div>
                        <img src={score} alt='score'/>
                        {thisRecipe.score}
                    </div>:null }
                    
                    {thisRecipe.healthScore?
                    <div>
                        <img src={hScore} alt='hscore'/>
                        {thisRecipe.healthScore}
                    </div>:null }
                </Score>
                {thisRecipe.time?
                <Time>
                    <img src={timer} alt='Ready in:'/>
                    {thisRecipe.time} min
                </Time>:null }
                
                <DietTypes>{thisRecipe.dietTypes.map(e=><Diet key={a++}>{e}</Diet>)}</DietTypes>
                
            </Holder>  
        )
    } else return null
}

const Holder = styled.div`
    position: relative;
    width: 30%;
    height: 30%;
    margin-right:1.5%;
    margin-left: 1.4%;
    margin-top:1.3vh;
    margin-bottom: 1.3vh;
    display: flex;
    flex-direction:column;
    border: 1px solid black;
    justify-content: space-between;
    >*{
        position: absolute;
    }
    @media (max-width:700px){
        width: 96.5%;
        height: 300px
    }
`

const Title = styled.p`
    font-weight: bold;
    z-index: 1;
    top:3px;
    padding:2px;
    background-color: #ffffffb0;
    border-radius: 0 5px 5px 0;
    max-width: 90%;
    overflow: hidden;
    `
    const Score = styled.div`
    right:0;
    top:30%;
    div{
        display: flex;
        flex-direction: column;
        background-color: #3232ff;
        color:white;
        font-weight: bold;
        margin: 5px;
        border-radius: 15px 15px 10px 10px;
    }
    img{
        width: 30px;
        height: 30px;
    }
`

const Time = styled.div`
    display: flex;
    align-items: center;
    right:3px;
    padding:2px;
    padding-right:4px;
    border-radius: 0 0 7px 7px;
    background-color: #ffc400;
    font-weight: bold;
    img{
        width: 30px;
    }
`

const Diet = styled.span`
    background-color: #e4e4e4be;
    border-radius: 5px;
    padding: 3px;
    margin:3px;
    line-height: 14px;
`

const DietTypes = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    position: absolute;
    bottom:0;
`

const Poster = styled.img`
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: middle;
    position: absolute;
    z-index: 0;
`