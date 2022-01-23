import React from 'react'
import { useSelector} from 'react-redux'
import Recipe from './Recipe'
import styled from 'styled-components'

export default function RecipesHolder(){

    let recipes=useSelector(state=>state.foundRecipes)
    console.log(recipes)

        return(
            <Holder>
                <HorizontalSeparator>
                    <HS/>
                    <HS/>
                </HorizontalSeparator>
                <VerticalSeparator>
                    <VS/>
                    <VS/>
                </VerticalSeparator>
                <Recipes>
                    {recipes?.length
                    ?recipes.map(recipe=>
                
                        <Recipe
                            key={recipe.id}
                            id={recipe.id}
                        />
                    )
                    :<p style={{height:'100%', position:'absolute'}}>No se encontraron recetas</p>}
                </Recipes>
                
            </Holder>
        )
    
}

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
    //justify-content: space-evenly;
    background-color: #be853b;
    p {
        margin:0;
    }
`