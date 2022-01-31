export const SIMPLE_SEARCH='SIMPLE_SEARCH'
export const DETAILED_SEARCH='DETAILED_SEARCH'
export const GET_DIET_TYPES='GET_DIET_TYPES'
export const FILTER_BY_DIET_TYPE='FILTER_BY_DIET_TYPE'
export const FILTER_BY_ALPHA='FILTER_BY_ALPHA'
export const FILTER_BY_SCORE='FILTER_BY_SCORE'
export const CHANGE_PAGE='CHANGE_PAGE'
export const CURRENT_PAGE='CURRENT_PAGE'
export const FILTER='FILTER'
export const CLEAR='CLEAR'
export const LOCALHOST = 'http://localhost:3001'


let page=0;

export function simpleSearch(query){
    page=0;
    return function(dispatch){
        return fetch(`${LOCALHOST}/recipes?name=${query}`)
        .then(response => response.json())
        .then(json =>{
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
                payload: json
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
                steps:recipe.steps,
                image:recipe.image
            })
        })
    }
}


export function filter(sort, by) {
    
    if(sort==='sortName') return {
        type: FILTER_BY_ALPHA,
        payload: by
    }

    if(sort==='sortScore') return {
        type: FILTER_BY_SCORE,
        payload: by
    }

    if(sort==='sortDiet'&&by!=='None') {
        page=0;
        return {
            type: FILTER_BY_DIET_TYPE,
            payload: by
        }
    }

    else return {
        type: CURRENT_PAGE,
        payload: page
    }
    
}

export function currentPage(){
    return{
        type:CURRENT_PAGE,
        payload:page
    }
}

export function nextPage(renderedRecipes){
    if((renderedRecipes-1)/page>1) return {
        type:CHANGE_PAGE,
        payload:++page
    }
    else return{
        type:CURRENT_PAGE,
        payload:page
    }
}

export function previousPage(){
    if(page===0){
        return{
            type:CURRENT_PAGE,
            payload:page
        }
    }
    else return{
        type:CHANGE_PAGE,
        payload:--page
    }
}

export function fetchPage(renderedRecipes){
    if(renderedRecipes)console.log(renderedRecipes)
    if(page===0 && renderedRecipes<10) return 'only'
    if(page===0) return 'first'
    if(renderedRecipes/(page+1)<=9) return 'last'
}

export function clear(){
    return {
        type: CLEAR
    }
}