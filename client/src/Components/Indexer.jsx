import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getDietTypes, filter } from "../Actions"
import styled from "styled-components";

export default function Search(){

    const dispatch = useDispatch()
    
    function handleSort(tag){
        var select = document.getElementById(tag);
        var value = select.options[select.selectedIndex].value;
        console.log(value)
        dispatch(filter(tag, value))
    }

    useEffect(()=>{
        dispatch(getDietTypes())
    },[dispatch])

    useEffect(()=>{
        
    })

    const diets = useSelector(state=>state.dietTypes)

    console.log(diets)

    return(
        <Sorters>
            <div>
                <label>Sort by name</label>
                <select id='sortName' onChange={()=>handleSort('sortName')}>
                    <option value="Ascending">Ascending</option>
                    <option value="Descending">Descending</option>
                </select>
            </div>
            
            <div>
                <label>Sort by diet</label>
                <select id='sortDiet' onChange={()=>handleSort('sortDiet')}>
                    <option value='none'>None</option>
                    {diets?.map(diet=>
                        <option value={diet} key={diet}>{diet}</option>
                    )}
                </select>
            </div>

            <div>
                <label>Sort by score</label>
                <select id='sortScore' onChange={()=>handleSort('sortScore')}>
                    <option value="Ascending">Ascending</option>
                    <option value="Descending">Descending</option>
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
    }
    @media (max-width:430px){
        option, select{
        padding: 5px 0 5px 0 ;
    }
}
`