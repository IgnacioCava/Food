import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import score from './Props/score.png'
import hScore from './Props/hs.png'
import timer from './Props/timer.png'


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
    width: 31.25%;
    box-sizing: border-box;
    height: 27.5vmin;
    margin-right:1%;
    margin-left: 1%;
    margin-top:1.3vh;
    margin-bottom: 1.3vh;
    display: flex;
    flex-direction:column;
    border: 5px solid #b64e08ae;
    border-radius: 10px;
    overflow: hidden;
    justify-content: space-between;
    >*{
        position: absolute;
    }
    @media (max-width:800px){
        width: 96.5%;
        height: 300px
    }
`

const Title = styled.p`
    font-weight: bold;
    font-size:large;
    z-index: 1;
    top:3px;
    padding:2px;
    background-color: #ffffffb0;
    border-radius: 0 5px 5px 0;
    max-width: 90%;
    overflow: hidden; 
`

const Score = styled.div`
    right:0%;
    top:35px;
    display: flex;
    flex-direction: column;
    @media (max-width:800px) {
        transform: scale(120%);
        top:45px;
    }
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
    background-color: #ffc400cc;
    font-weight: bold;
    img{
        width: 30px;
    }
`

const Diet = styled.span`
    background-color: #222222da;
    color:white;
    border-radius: 5px;
    padding: 4px;
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