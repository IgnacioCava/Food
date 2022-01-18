import { SIMPLE_SEARCH, DETAILED_SEARCH } from '../Actions'

const initialState = {
    foundRecipes: [],
    currentRecipeDetail: []
}

export default function reducer(state=initialState, action){
    switch (action.type) {
        case SIMPLE_SEARCH:
            return {...state, foundRecipes: action.payload}

        case DETAILED_SEARCH:
            return {...state, currentRecipeDetail: state.currentRecipeDetail.concat(action.payload)}
    
        default:
            return state
    }
}