export const SIMPLE_SEARCH='SIMPLE_SEARCH'
export const DETAILED_SEARCH='DETAILED_SEARCH'
export const GET_DIET_TYPES='GET_DIET_TYPES'
export const FILTER_BY_DIET_TYPE='FILTER_BY_DIET_TYPE'
export const FILTER_BY_ALPHA='FILTER_BY_ALPHA'
export const FILTER_BY_SCORE='FILTER_BY_SCORE'
export const NEXT_PAGE='NEXT_PAGE'
export const PREVIOUS_PAGE='PREVIOUS_PAGE'
export const CURRENT_PAGE='CURRENT_PAGE'
export const FILTER='FILTER'
export const LOCALHOST = 'http://localhost:3001'

export function simpleSearch(query){
    return function(dispatch){
        return fetch(`${LOCALHOST}/recipes?name=${query}`)
        .then(response => response.json())
        .then(json =>{
            console.log(json)
            dispatch({
                type: SIMPLE_SEARCH,
                payload: json
            })
        })
    }
}

export function detailedSearch(id){
    return function(dispatch){
        return fetch(`${LOCALHOST}/recipes/${id}`)
        .then(response => response.json())
        .then(json =>{
            dispatch({
                type: DETAILED_SEARCH,
                payload: json.rec
            })
        })
    }
}

export function getDietTypes(){
    return function(dispatch){
        return fetch(`${LOCALHOST}/types`)
        .then(response => response.json())
        .then(json =>{
            dispatch({
                type: GET_DIET_TYPES,
                payload: json.diets
            })
        })
    }
}

export function createRecipe(recipe) {
    return async function() {
        return await fetch(`${LOCALHOST}/recipe`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name:recipe.name, 
                resume:recipe.resume, 
                dietTypes:recipe.dietTypes, 
                score:Number(recipe.score), 
                healthScore:Number(recipe.healthScore), 
                time:Number(recipe.time), 
                dishTypes:recipe.dishTypes, 
                steps:recipe.steps
            })
        })
    }
}

export function filter(sort, by) {
    if(sort==='sortName') return {
        type: FILTER_BY_ALPHA,
        payload: by
    }

    if(sort==='sortDiet') return {
        type: FILTER_BY_DIET_TYPE,
        payload: by
    }

    if(sort==='sortScore') return {
        type: FILTER_BY_SCORE,
        payload: by
    }
}

let page=0;

export function currentPage(){
    return{
        type:CURRENT_PAGE,
        payload:page
    }
}

export function nextPage(){
    //console.log(page)
    return{
        type:NEXT_PAGE,
        payload:++page
    }
}

export function previousPage(){
    //console.log(page)
    if(page===0){
        return{
            type:CURRENT_PAGE,
            payload:page
        }
    }
    else return{
        type:PREVIOUS_PAGE,
        payload:--page
    }
}