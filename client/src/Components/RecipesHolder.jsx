import React, {useEffect} from 'react'
import { useSelector, useDispatch} from 'react-redux'
import Recipe from './Recipe'
import styled from 'styled-components'
import { previousPage, nextPage, currentPage, filter } from '../Actions'

export default function RecipesHolder(){

    const dispatch=useDispatch()

    let foundrecipes=useSelector(state=>state.foundRecipes)
    let filteredRecipes=useSelector(state=>state.filteredRecipes)
    let filteredDiets=useSelector(state=>state.filteredDiets)
    let recipes=useSelector(state=>state.currentPage)

    useEffect(()=>{
        if(!foundrecipes.message){ 
            //dispatch(filter('sortName', 'Ascending'))
            dispatch(currentPage())
        }
    },[dispatch, filteredRecipes, filteredDiets, foundrecipes.message])

    if(recipes){
        return(
            <Holder>
                {foundrecipes.message
                    ?<NoRec>No recipes found</NoRec>
                    :<>
                        <Recipes>
                            {recipes.map(recipe=>
                                <Recipe
                                    key={recipe.id}
                                    id={recipe.id}
                                />
                            )}
                        </Recipes>
                        <Paginator>
                            <button type='button' id='a' onClick={()=>{
                                dispatch(previousPage())
                            }}>{'<'}</button>
                            <button type='button' id='b' onClick={()=>{
                                if(filteredDiets==='Unused') dispatch(nextPage(filteredRecipes.length/9))
                                else dispatch(nextPage(filteredDiets.length/9))
                            }}>{'>'}</button>
                        </Paginator>
                    </>}
                
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
    *{
        position: fixed;
        bottom:0;
        padding:30px;
        background-color:#2a2a2af0;
        border: 0;
        color:white;
        z-index: 2;
        font-weight: bold;
        font-size:large;
    }
    #a{
        left:0;
        border-radius:0 10px 0 0;
    }
    #b{
        right:0;
        border-radius:10px 0 0 0;
    }
`

const Recipes = styled.div`
    display:flex;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: flex-start;
    width: 100%;
    
    @media (max-width:700px){
        flex-direction: column;
        flex-wrap: nowrap;
    } 
`

const Holder = styled.div`
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    width:100%;
    height: 100%;
    overflow: auto;
    ::-webkit-scrollbar{
        background-color: transparent;
        }
    ::-webkit-scrollbar-thumb{
        background-color: #241711;
        border:2px solid #66480d;
        border-right:0;
        border-radius: 7px 0 0 7px;
    }
    p {
        margin:0;
    }
`