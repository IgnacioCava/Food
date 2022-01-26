import { SIMPLE_SEARCH, DETAILED_SEARCH, GET_DIET_TYPES, FILTER_BY_DIET_TYPE,
    FILTER_BY_ALPHA, FILTER_BY_SCORE, NEXT_PAGE, PREVIOUS_PAGE, CURRENT_PAGE } from '../Actions'

const initialState = {
    foundRecipes: [],
    currentRecipeDetail: [],
    dietTypes:[],
    filteredRecipes:[],
    filteredDiets:'Unused',
    currentPage:[]

}

export default function reducer(state=initialState, action){
    switch (action.type) {
        case SIMPLE_SEARCH:
            return {...state, foundRecipes: action.payload, filteredRecipes: []}

        case DETAILED_SEARCH:
            return {...state, currentRecipeDetail: state.currentRecipeDetail.concat(action.payload)}

        case GET_DIET_TYPES:
            return {...state, dietTypes:action.payload.map(diet=>diet.name)}

        case FILTER_BY_DIET_TYPE:
            if(state.filteredRecipes.filter(recipe=>recipe.dietTypes.includes(action.payload.toLowerCase())).length===0){
                if(action.payload==='none') {
                    
                    return {...state, filteredDiets:state.filteredRecipes}
                }
                else return {...state, filteredDiets: 'Nothing was found'}
            }
            else return {...state, filteredDiets: state.filteredRecipes.filter(recipe=>recipe.dietTypes.includes(action.payload.toLowerCase()))}
            
            case FILTER_BY_ALPHA:
            if(state.foundRecipes.message) return {...state}
            if(action.payload==='Ascending'){
                if(Array.isArray(state.filteredDiets)){
                    return {...state, filteredDiets: state.filteredDiets.sort((a, b) => {
                        if(a.name.toLowerCase()<b.name.toLowerCase()) return -1
                        if(a.name.toLowerCase()>b.name.toLowerCase()) return 1
                        return 0
                    })}
                } else {
                    return {...state, filteredRecipes: state.foundRecipes.sort((a, b) => {
                        if(a.name.toLowerCase()<b.name.toLowerCase()) return -1
                        if(a.name.toLowerCase()>b.name.toLowerCase()) return 1
                        return 0
                    })}
                }
            } else{
                if(Array.isArray(state.filteredDiets)){
                    return {...state, filteredDiets: state.filteredDiets.sort((a, b) => {
                        if(a.name.toLowerCase()<b.name.toLowerCase()) return 1
                        if(a.name.toLowerCase()>b.name.toLowerCase()) return -1
                        return 0
                    })}
                } else {
                    return {...state, filteredRecipes: state.foundRecipes.sort((a, b) => {
                        if(a.name.toLowerCase()<b.name.toLowerCase()) return 1
                        if(a.name.toLowerCase()>b.name.toLowerCase()) return -1
                        return 0
                    })}
                }
            }
        
        case FILTER_BY_SCORE:
            if(action.payload==='Ascending'){
                if(Array.isArray(state.filteredDiets)){
                    return {...state, filteredDiets: state.filteredDiets.sort((a, b) => {
                        if(a.score<b.score) return 1
                        if(a.score>b.score) return -1
                        return 0
                    })}
                }
                else return {...state, filteredRecipes: state.filteredRecipes.sort((a, b) => {
                    if(a.score<b.score) return 1
                    if(a.score>b.score) return -1
                    return 0
                })}
            } else {
                if(Array.isArray(state.filteredDiets)){
                    return {...state, filteredDiets: state.filteredDiets.sort((a, b) => {
                        if(a.score<b.score) return -1
                        if(a.score>b.score) return 1
                        return 0
                    })}
                } else {
                    return {...state, filteredRecipes: state.filteredRecipes.sort((a, b) => {
                        if(a.score<b.score) return -1
                        if(a.score>b.score) return 1
                        return 0
                    })}
                }
            }      
        
        case NEXT_PAGE:
            console.log(NEXT_PAGE)
            return {...state, currentPage: state.filteredRecipes.slice(action.payload*9,action.payload*9+9)}

        case PREVIOUS_PAGE:
            return {...state, currentPage: state.filteredRecipes.slice(action.payload*9,action.payload*9+9)}

        case CURRENT_PAGE:
            if(state.filteredDiets==='Nothing was found') return {...state, currentPage:[]}
            if(Array.isArray(state.filteredDiets)) return {...state, currentPage:state.filteredDiets.slice(action.payload*9,action.payload*9+9)}
            if(state.filteredRecipes.length) return {...state, currentPage: state.filteredRecipes.slice(action.payload*9,action.payload*9+9)}
            else return {...state, currentPage: state.foundRecipes.slice(action.payload*9,action.payload*9+9)}

        default:
            return state
    }
}