import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch} from 'react-redux'
import Recipe from './Recipe'
import styled from 'styled-components'
import { previousPage, nextPage, currentPage } from '../Actions'

export default function RecipesHolder(){

    const dispatch=useDispatch()

    let found=useSelector(state=>state.foundRecipes)
    let recipes=useSelector(state=>state.currentPage)

    useEffect(()=>{
        if(!found.message) dispatch(currentPage())
    },[found])

    if(recipes){
        return(
            <Holder>
                {found.message?
                <NoRec>
                    No recipes found
                </NoRec>
                :
                <><HorizontalSeparator>
                    <HS/>
                    <HS/>
                </HorizontalSeparator>
                <VerticalSeparator>
                    <VS/>
                    <VS/>
                </VerticalSeparator>
                <Recipes>
                    {recipes.map(recipe=>
                        <Recipe
                            key={recipe.id}
                            id={recipe.id}
                        />
                    )
                    }
                </Recipes>
                <Paginator>
                    <button type='button' id='a' onClick={()=>{
                        dispatch(previousPage())
                    }}>{'<'}</button>
                    <button type='button' onClick={()=>{
                        dispatch(nextPage())
                    }}>{'>'}</button>
                </Paginator></>}
                
            </Holder>
        )
    } else return null
        
}

const NoRec = styled.div`
position: absolute;
left:50%;
transform:translate(-50%);
top:20%;
font-weight: bold;
font-size: 30px;
`

const Paginator = styled.div`
    position: absolute;
    bottom:0;
`

const Recipes = styled.div`
    display:flex;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: flex-start;
    width: 100%;
`

const HorizontalSeparator = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    width: 100%;
    height: 100%;
    justify-content: space-evenly;
`

const VerticalSeparator = styled.div`
    display: flex;
    flex-direction: row;
    position: absolute;
    width: 100%;
    height: 100%;
    justify-content: space-evenly;
`

const HS = styled.hr`
    width: 100%;
    height: 1px;
    background-color: #ff9100;
    border-right: 0;
    border-left: 0;
    margin:0;
`

const VS = styled.hr`
    height: 100%;
    width: 1px;
    background-color: #ff9100;
    border-top: 0;
    border-bottom: 0;
    margin:0;
`

const Holder = styled.div`
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    height: 100%;
    width:100%;
    background-color: #be853b;
    p {
        margin:0;
    }
`