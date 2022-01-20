import { SIMPLE_SEARCH, DETAILED_SEARCH, GET_DIET_TYPES, FILTER_BY_DIET_TYPE,
    FILTER_BY_ALPHA, FILTER_BY_SCORE } from '../Actions'

const initialState = {
    foundRecipes: [],
    currentRecipeDetail: [],
    dietTypes:[],
}

export default function reducer(state=initialState, action){
    switch (action.type) {
        case SIMPLE_SEARCH:
            return {...state, foundRecipes: action.payload}

        case DETAILED_SEARCH:
            return {...state, currentRecipeDetail: state.currentRecipeDetail.concat(action.payload)}

        case GET_DIET_TYPES:
            return {...state, dietTypes:action.payload.map(diet=>diet.name)}

        case FILTER_BY_DIET_TYPE:
            return {...state, foundRecipes: state.foundRecipes.filter(recipe=>recipe.dietTypes.includes(action.payload.toLowerCase()))}
            
        case FILTER_BY_ALPHA:
            return {...state, foundRecipes: state.foundRecipes.sort((a, b) => a.firstname.localeCompare(b.firstname))}

        case FILTER_BY_SCORE:
            return {...state, foundRecipes: state.foundRecipes.sort((a, b) => {
                if(a.score<b.score) return -1
                if(a.score>b.score) return 1
                return 0
            })}

        default:
            return state
    }
}