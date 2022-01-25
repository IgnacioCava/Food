import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import { simpleSearch } from "../Actions"
import styled from 'styled-components'

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
                <input type="text" id='input' value={searchedRecipe} onChange={(recipe) => setSearched(recipe.target.value)}/>
                <button type="submit" id='submit'>Search</button>
            </form>
        </SearchWrapper>
    )
}

const SearchWrapper = styled.div`
box-sizing: border-box;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
border-radius: 15px;
overflow: hidden;
margin-bottom:5px;
*{
    outline:none;
    padding:10px;
}
form{
    padding:0;
}
#submit{
    background-color:white;
    border:0;
    transition: .3s;
    :hover{
        background-color: #62e462;
    }
}
#input{
    background-color:white;
    border:0;
}
`