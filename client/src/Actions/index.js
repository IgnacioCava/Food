const { API } = process.env;

export const SIMPLE_SEARCH = 'SIMPLE_SEARCH'
export const DETAILED_SEARCH = 'DETAILED_SEARCH'

export function simpleSearch(query){
    return function(dispatch){
        return fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=77db10a2f5df4b41a45edb245858ac51`)
        .then(response => response.json())
        .then(json =>{
            dispatch({
                type: SIMPLE_SEARCH,
                payload: json.results
            })
        })
    }
}

export function detailedSearch(id, includeNutrition){
    return function(dispatch){
        return fetch(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=${includeNutrition}&apiKey=77db10a2f5df4b41a45edb245858ac51`)
        .then(response => response.json())
        .then(json =>{
            dispatch({
                type: DETAILED_SEARCH,
                payload: json
            })
        })
    }
}

