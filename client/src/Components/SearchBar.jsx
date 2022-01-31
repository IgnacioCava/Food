import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import { simpleSearch } from "../Actions"
import styled from 'styled-components'
import mag from './Props/mag.png'

export default function Search(){

    const dispatch = useDispatch()
    const [searchedRecipe, setSearched] = useState('')

    return(
        <SearchWrapper>
            <form onSubmit={(event)=>{
                event.preventDefault()
                dispatch(simpleSearch(searchedRecipe))
                setSearched('')
            }}>
                <SearchInput>
                    <input type="text" placeholder='Search for a recipe' value={searchedRecipe} onChange={(recipe) => setSearched(recipe.target.value)}/>
                    <input type="image" id='submit' src={mag} alt='search' style={{height:'22px',width:'22px'}}/>
                </SearchInput>
                
            </form>
        </SearchWrapper>
    )
}

const SearchWrapper = styled.div`
*{
    
}
form{
    padding:0;
}

`

const SearchInput = styled.div`
display: flex;
border-radius: 0 10px 10px 0;
overflow: hidden;
margin: 10px 0 10px 0;
    *{
        padding: 10px;
        background-color:white;
        border:0;
        outline:none;
    }
    #submit{
        transition: .3s;
        font-weight:bold;
        :target, :hover{
            background-color: #62e462;
        }
        /* :hover{
            background-color: #62e462;
        } */
    }
`