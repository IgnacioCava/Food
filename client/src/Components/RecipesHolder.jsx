import React, {useEffect} from 'react'
import { useSelector, useDispatch} from 'react-redux'
import Recipe from './Recipe'
import styled from 'styled-components'
import { previousPage, nextPage, currentPage, fetchPage } from '../Actions'

export default function RecipesHolder(){

    const dispatch=useDispatch()

    let foundrecipes=useSelector(state=>state.foundRecipes)
    let filteredRecipes=useSelector(state=>state.filteredRecipes)
    let filteredDiets=useSelector(state=>state.filteredDiets)
    let recipes=useSelector(state=>state.currentPage)

    useEffect(()=>{
        if(!foundrecipes.message) dispatch(currentPage())
    },[dispatch, filteredRecipes, filteredDiets, foundrecipes.message])

    useEffect(()=>{  
        let prev = document.getElementById('prev')
        let next = document.getElementById('next')

        if(prev&&document.getElementById('next')){
            if(fetchPage()==='first')prev.style.visibility='hidden'
            else prev.style.visibility='visible'

            if(filteredDiets==='Unused' && fetchPage(filteredRecipes.length)==='last') next.style.visibility='hidden'
            else if(fetchPage(filteredDiets.length)==='last') next.style.visibility='hidden'
            else next.style.visibility='visible'
            if(!recipes.length){
                prev.style.visibility='hidden'
                next.style.visibility='hidden'
            }
        }
    })

    useEffect(()=>{
        let norec = document.getElementById('norec')
        if(foundrecipes.message&&norec) {
            norec.style.transition='0.3s';
            norec.style.opacity=1;
        }
    },[foundrecipes.message])

    useEffect(()=>{
        
    }, [dispatch])

    if(recipes){
        return(
            <Holder>
                {foundrecipes.message
                    ?<NoRec id='norec'>{foundrecipes.message}</NoRec>
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
                            <button type='button' id='prev' onClick={()=>{
                                if(filteredDiets==='Nothing was found') return
                                dispatch(previousPage())
                                
                            }}>{'<'}</button>
                            <button type='button' id='next' onClick={()=>{
                                if(filteredDiets==='Nothing was found') return 
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
    position: fixed;
    left:50%;
    transform:translate(-50%);
    top:25%;
    font-weight: bold;
    font-size: 35px;
    padding: 20px;
    background-color: #1a1a1aa4;
    color:white;
    border-radius: 15px;
    border:3px solid #c76b0257;
    backdrop-filter: blur(4px);
    opacity:0;
`

const Paginator = styled.div`
    @keyframes paged {
        from{
            background-color:#2a2a2af0;
        }
        50%{
            background-color:lightblue;
            color:black;
        }
        to{
            background-color:#2a2a2af0;
        }
    }
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
    #prev{
        left:0;
        border-radius:0 10px 0 0;
        :active{
            animation: paged .2s linear;
        }
    }
    #next{
        right:0;
        border-radius:10px 0 0 0;
        :active{
            animation: paged .2s linear;
        }
    }
`

const Recipes = styled.div`
    display:flex;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: flex-start;
    width: 100%;
    @media (max-width:850px){
        justify-content: center
    }
`

const Holder = styled.div`
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    width:100%;
    
    /*  */
    p {
        margin:0;
    }
    @media (max-width:850px){
        margin-bottom: 80px;
        
    }
`