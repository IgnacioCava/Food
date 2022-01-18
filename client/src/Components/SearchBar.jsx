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
                <input type="text" value={searchedRecipe} onChange={(recipe) => setSearched(recipe.target.value)}/>
                <input type="submit" value="Search"/>
            </form>
        </SearchWrapper>
    )
}

const SearchWrapper = styled.div`
height: 25%;
display: flex;
flex-direction: column;
justify-content: center;
border:3px solid black;
`
