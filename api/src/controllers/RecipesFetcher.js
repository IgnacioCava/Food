const { Recipes, DietTypes } = require("../db");
const fetch = require("node-fetch")
const { API_KEY } = process.env;
const Sequelize = require("sequelize");
const Op = Sequelize.Op; //Sequelize exposes symbol operators that can be used for to create more complex comparisons 
                        // https://sequelize.org/v5/manual/querying.html
                       //  

async function fetchByApiQuery(query){
    try{
        return await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&addRecipeInformation=true&apiKey=${API_KEY}&number=1`)
        .then(response => response.json())
        .then(json => {
            if(Object.keys(json).includes('totalResults')){
                if(json.totalResults){
                    let recs = []
                    json.results.map(recipe=>{
                        recs.push({
                            id: recipe.id,
                            name: recipe.title,
                            image: recipe.image,
                            resume: recipe.summary,
                            dietTypes: recipe.diets,
                            score: recipe.spoonacularScore,
                            healthScore: recipe.healthScore,
                            time: recipe.readyInMinutes,
                            dishTypes: recipe.dishTypes
                        })
                    })
                    return recs
                } else return false
            } else return 'Exceeded daily API calls'

        })
    } catch (err) {
        return 'Error found while fetching API by query, please try again'
    }
    
}

async function fetchByApiId(id){
    try{
        return await fetch(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${API_KEY}`)
        .then(response => response.json())
        .then(json => {
            if(json.code) return false
            else return {
                id: json.id,
                name: json.title,
                image: json.image,
                resume: json.summary,
                dietTypes: json.diets,
                score: json.spoonacularScore,
                healthScore: json.healthScore,
                dishTypes: json.dishTypes,
                steps: json.analyzedInstructions[0]?.steps.map(pos=>{
                    
                        return pos.step
                    
                })
            }
        })
    } catch (err) {
        return 'Error found while fetching API by id, please try again'
    }
}

async function fetchByDBQuery(query){
    const rec = await Recipes.findAll({
        where: {
            name: {[Op.iLike]: `%${query}%`} // Explanation at top of file
        },
        // include: {
        //     model: DietTypes,
        //     attributes: ['name'],
        //     through: {
        //         attributes: [],
        //     }
        // }
    });
    if(rec.length) return rec
    return false
}

async function fetchByDBId(id){
    const rec = await Recipes.findByPk(id//, {
        // include: {
        //     model: DietTypes,
        //     attributes: ['name'],
        //     through: {
        //         attributes: [],
        //     }
        // }
    /*}*/);
    
    if(Object.keys(rec).length) return rec
    return false
}

async function fetchWholeDB(){
    const rec = await Recipes.findAll({
        include: {
            model: DietTypes,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    });
    rec.length?rec:false
}

module.exports = {
    fetchByApiQuery,
    fetchByApiId,
    fetchByDBQuery,
    fetchByDBId,
    fetchWholeDB
}