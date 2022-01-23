export const SIMPLE_SEARCH = 'SIMPLE_SEARCH'
export const DETAILED_SEARCH = 'DETAILED_SEARCH'
export const GET_DIET_TYPES='GET_DIET_TYPES'
export const FILTER_BY_DIET_TYPE='FILTER_BY_DIET_TYPE'
export const FILTER_BY_ALPHA='FILTER_BY_ALPHA'
export const FILTER_BY_SCORE='FILTER_BY_SCORE'
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
        return await fetch(`${LOCALHOST}/api/recipe`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name:recipe.name, 
                resume:recipe.resume, 
                dietTypes:recipe.dietTypes, 
                score:recipe.score, 
                healthScore:recipe.healthScore, 
                time:recipe.time, 
                dishTypes:recipe.dishTypes, 
                steps:recipe.steps
            })
        })
    }
}

export function filterByDietType(payload) {
    return {
        type: FILTER_BY_DIET_TYPE,
        payload
    }
};

export function filterByAlpha(payload){
    return {
        type:FILTER_BY_ALPHA,
        payload
    }
}

export function filterByScore(payload){
    return {
        type:FILTER_BY_SCORE,
        payload
    }
}