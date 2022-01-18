import React from 'react'
import { useSelector} from 'react-redux'
import Recipe from './Recipe'
import styled from 'styled-components'

export default function RecipesHolder(){

    let recipes=useSelector(state=>state.foundRecipes)
    console.log(recipes)

        return(
            <Holder>
                <div>
                    {recipes?.length
                    ?recipes.map(recipe=>
                
                        <Recipe
                            key={recipe.id}
                            id={recipe.id}
                        />
                    )
                    :<p style={{height:'100%', position:'absolute'}}>No se encontraron recetas</p>}
                </div>
                <HR/>
            </Holder>
        )
    
}

const HR = styled.hr`
height: 100%;
background-color: red;
position: absolute;
left:50%;
margin-top: 0;
margin-bottom: 0;
border-bottom:0;
border-top:0;
`

const Holder = styled.div`
position: relative;
    display: flex;
    flex-wrap: wrap;
    height: 100%;
    width:100%;
    //justify-content: space-evenly;
    background-color: lightblue;
    p {
        margin:0;
    }
`