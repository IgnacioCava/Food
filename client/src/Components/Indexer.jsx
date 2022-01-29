import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getDietTypes, filter, currentPage } from "../Actions"
import styled from "styled-components";

export default function Search(){

    const dispatch = useDispatch()
    
    function handleSort(tag){
        var select = document.getElementById(tag);
        var value = select.options[select.selectedIndex].value;
        dispatch(filter(tag, value.toString()))
        dispatch(currentPage())
    }

    const diets = useSelector(state=>state.dietTypes)

    useEffect(()=>{
        dispatch(getDietTypes())
        dispatch(currentPage())
    },[dispatch])

    return(
        <Sorters>
            <div>
                <label>Sort by name</label>
                <select id='sortName' onClick={()=>handleSort('sortName')}>
                    <option value="Ascending">▲ Ascending</option>
                    <option value="Descending">▼ Descending</option>
                </select>
            </div>
            
            <div>
                <label>Sort by diet</label>
                <select id='sortDiet' onClick={()=>{dispatch(getDietTypes())}} onChange={()=>handleSort('sortDiet')}>
                    <option value='none'>Any</option>
                    {diets?.map(diet=>
                        <option value={diet} key={diet}>{diet}</option>
                    )}
                </select>
            </div>

            <div>
                <label>Sort by score</label>
                <select id='sortScore' onClick={()=>handleSort('sortScore')}>
                    <optgroup label="Score">
                    <option value="Ascending">▲ Ascending</option>
                    <option value="Descending">▼ Descending</option>
                    </optgroup>
                    <optgroup label="Health score">
                    <option value="AscendingH">▲ Ascending</option>
                    <option value="DescendingH">▼ Descending</option>
                    </optgroup>
                </select>
            </div>
        </Sorters>
    )
}

const Sorters = styled.div`
    display: flex;
    flex-direction: row;
    width: available;
    label{
        font-weight: bold;
        color:white;
    }
    div{
        margin:5px;
        display: flex;
        flex-direction: column;
    }
    option, select{
        background-color: #464646;
        color:white;
        padding:10px;
        border-radius: 10px;
        outline:none;
        cursor:pointer;
    }
    @media (max-width:430px){
        option, select{
        padding: 5px 0 5px 0 ;
    }
}
`