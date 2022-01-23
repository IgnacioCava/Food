import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { detailedSearch } from '../Actions'
import { Link } from 'react-router-dom'
import score from './score.png'
import hScore from './healthScore.png'
import timer from './timer.png'


export default function Recipe({id}){
    
    // const dispatch=useDispatch()

    // useEffect(()=>{
    //     dispatch(detailedSearch(id))
    // },[])

    const thisRecipe = useSelector(state=>state.foundRecipes.find(r=>r.id===id))
    console.log(thisRecipe)

    const details = useSelector(state=>state.currentRecipeDetail)
    console.log(details)
    let a=0
    if(thisRecipe){
        return(
            
            <Holder>
                <Link to={`/home/${id}`} style={{position:'absolute', width:'100%', height:'100%', zIndex:'2'}}>
                </Link>
                <Title>{thisRecipe.name}</Title>
                <Poster src={thisRecipe.image} alt='Img'/>
                {/* <DishTypes>{thisRecipe.dishTypes.join(', ')}</DishTypes> */}
                <Score>
                    <div>
                        <img src={score} alt='score'/>
                        {thisRecipe.score}%
                    </div> 
                    <div>
                        <img src={hScore} alt='hScore'/>
                        {thisRecipe.healthScore}%
                    </div>
                </Score>
                <Time>
                    <img src={timer} alt='Ready in:'/>
                    {thisRecipe.time} min
                </Time>
                <DietTypes>{thisRecipe.dietTypes.map(e=><Diet key={a++}>{e}</Diet>)}</DietTypes>
                
            </Holder>  
        )
    } else return null
}

const Holder = styled.div`
position: relative;
width: 30%;
height: 30%;
max-height: 30vh;
margin-right:1.6%;
margin-left: 1.5%;
margin-top:1.3vh;
margin-bottom: 1.3vh;
display: flex;
flex-direction:column;
border: 1px solid black;
justify-content: space-between;
>*{
    position: absolute;
}
`

const Title = styled.p`
font-weight: bold;
z-index: 1;
top:3px;
padding:2px;
background-color: #ffffffb0;
border-radius: 0 5px 5px 0;
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
background-color: #e4e4e46c;
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

const DishTypes = styled.p`
bottom:0;

`



const Poster = styled.img`
height: 100%;
width: 100%;
object-fit: cover;
object-position: bottom;
position: absolute;
z-index: 0;
`