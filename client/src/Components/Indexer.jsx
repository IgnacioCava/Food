import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import { simpleSearch } from "../Actions"

export default function Search(){

    const dispatch = useDispatch()
    const [searchedRecipe, setSearched] = useState('')

    return(
        <div>
            <select name="select">
                <option value="value1">Value 1</option>
                <option value="value2" selected>Value 2</option>
                <option value="value3">Value 3</option>
            </select>
            <select name="select">
                <option value="value1">Value 1</option>
                <option value="value2" selected>Value 2</option>
                <option value="value3">Value 3</option>
            </select>
            <select name="select">
                <option value="value1">Value 1</option>
                <option value="value2" selected>Value 2</option>
                <option value="value3">Value 3</option>
            </select>
        </div>
    )
}