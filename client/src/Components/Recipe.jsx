import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { detailedSearch } from '../Actions'
import { Link } from 'react-router-dom'


export default function Recipe({id}){
    
    const dispatch=useDispatch()
    console.log(id)

    useEffect(()=>{
        dispatch(detailedSearch(id, false))
    },[])

    const thisRecipe = useSelector(state=>state.foundRecipes.find(r=>r.id===id))
    console.log(thisRecipe)

    const details = useSelector(state=>state.currentRecipeDetail)
    console.log(details)
    

    if(thisRecipe){
        return(
            
            <Holder>
                a
                {id}
                {thisRecipe.title}
                <img src={thisRecipe.image} alt='recipe'/>
            </Holder>  
        )
    } else return null
}

const Holder = styled.div`
    //height: 10%;
    display: flex;
    flex-direction:column-reverse;
    border: 3px solid black;
    margin:5px;
`