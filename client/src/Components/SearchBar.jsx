import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import { previousPage, simpleSearch } from "../Actions"
import styled from 'styled-components'
import mag from './mag.png'

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
                    <input type="text" value={searchedRecipe} onChange={(recipe) => setSearched(recipe.target.value)}/>
                    <input type="image" id='submit' src={mag} alt='search' style={{height:'22px',width:'22px'}}/>
                </SearchInput>
                
            </form>
        </SearchWrapper>
    )
}

const SearchWrapper = styled.div`
/* box-sizing: border-box;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
border-radius: 15px;
overflow: hidden;
margin-bottom:5px; */
*{
    outline:none;
}
form{
    padding:0;
}

`

const SearchInput = styled.div`
display: flex;
border-radius: 10px;
overflow: hidden;
margin: 10px;
    *{
        padding: 10px;
        background-color:white;
        border:0;
    }
    #submit{
        transition: .3s;
        font-weight:bold;
        :hover{
            background-color: #62e462;
        }
    }
`