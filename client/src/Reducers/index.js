import { SIMPLE_SEARCH, DETAILED_SEARCH, GET_DIET_TYPES, FILTER_BY_DIET_TYPE,
    FILTER_BY_ALPHA, FILTER_BY_SCORE, CHANGE_PAGE, CURRENT_PAGE, CLEAR } from '../Actions'

const initialState = {
    currentRecipeDetail: [],
    dietTypes:[],
    filteredRecipes:[],
    filteredDiets:'Unused',
    currentPage:[]
}

export default function reducer(state=initialState, action){
    switch (action.type) {
        case SIMPLE_SEARCH:
            return {...state, filteredRecipes: action.payload, filteredDiets:'Unused',}

        case DETAILED_SEARCH:
            return {...state, currentRecipeDetail: [action.payload]}

        case GET_DIET_TYPES:
            return {...state, dietTypes:action.payload.map(diet=>diet.name)}

        case FILTER_BY_DIET_TYPE:
            if(state.filteredRecipes.filter(recipe=>recipe.dietTypes.includes(action.payload.toLowerCase())).length===0){
                if(action.payload==='none') return {...state, filteredDiets:'Unused'}
                else return {...state, filteredDiets: 'Nothing was found'}
            }
            else return {...state, filteredDiets: state.filteredRecipes.filter(recipe=>recipe.dietTypes.includes(action.payload.toLowerCase()))}
            
            case FILTER_BY_ALPHA:
            if(state.filteredRecipes.message) return {...state}
            if(action.payload==='Ascending'){
                if(Array.isArray(state.filteredDiets)){
                    return {...state, filteredDiets: state.filteredDiets.sort((a, b) => {
                        if(a.name.toLowerCase()<b.name.toLowerCase()) return -1
                        if(a.name.toLowerCase()>b.name.toLowerCase()) return 1
                        return 0
                    })}
                } else {
                    return {...state, filteredRecipes: state.filteredRecipes.sort((a, b) => {
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
                    return {...state, filteredRecipes: state.filteredRecipes.sort((a, b) => {
                        if(a.name.toLowerCase()<b.name.toLowerCase()) return 1
                        if(a.name.toLowerCase()>b.name.toLowerCase()) return -1
                        return 0
                    })}
                }
            }
        
        case FILTER_BY_SCORE:
            if(action.payload.includes('H')){
                if(action.payload.includes('Ascending')){
                    if(Array.isArray(state.filteredDiets)){
                        return {...state, filteredDiets: state.filteredDiets.sort((a, b) => {
                            if(a.healthScore<b.healthScore) return 1
                            if(a.healthScore>b.healthScore) return -1
                            return 0
                        })}
                    }
                    else return {...state, filteredRecipes: state.filteredRecipes.sort((a, b) => {
                        if(a.healthScore<b.healthScore) return 1
                        if(a.healthScore>b.healthScore) return -1
                        return 0
                    })}
                } else {
                    if(Array.isArray(state.filteredDiets)){
                        return {...state, filteredDiets: state.filteredDiets.sort((a, b) => {
                            if(a.healthScore<b.healthScore) return -1
                            if(a.healthScore>b.healthScore) return 1
                            return 0
                        })}
                    } else {
                        return {...state, filteredRecipes: state.filteredRecipes.sort((a, b) => {
                            if(a.healthScore<b.healthScore) return -1
                            if(a.healthScore>b.healthScore) return 1
                            return 0
                        })}
                    }
                } 
            }
            else if(action.payload==='Ascending'){
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
        
        case CHANGE_PAGE:
            if(state.filteredDiets==='Unused') return {...state, currentPage: state.filteredRecipes.slice(action.payload*9,action.payload*9+9)}
            else return {...state, currentPage: state.filteredDiets.slice(action.payload*9,action.payload*9+9)}

        case CURRENT_PAGE:
            if(state.filteredDiets==='Nothing was found') return {...state, currentPage:[]}
            if(Array.isArray(state.filteredDiets)) return {...state, currentPage:state.filteredDiets.slice(action.payload*9,action.payload*9+9)}
            if(state.filteredRecipes.message) return {...state}
            else return {...state, currentPage: state.filteredRecipes.slice(action.payload*9,action.payload*9+9)}

        case CLEAR:
            return {...state, currentRecipeDetail:[]}

        default:
            return state
    }
}