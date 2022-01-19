const db = require("../db");
const { Recipes, DietTypes } = require("../db");
const { API_KEY } = process.env;
const Sequelize = require("sequelize");
const Op = Sequelize.Op; //Sequelize exposes symbol operators that can be used for to create more complex comparisons 
                        // https://sequelize.org/v5/manual/querying.html

console.log(DietTypes, Recipes)

async function fetchByApiQuery(query){
    try{
        return await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&addRecipeInformation=true&apiKey=${API_KEY}&number=9`)
        .then(response => response.json())
        .then(json => {
            if(json.results){
                let recs = []
                json.results.map(recipe=>{
                    recs.push({
                        id: recipe.id,
                        title: recipe.title,
                        image: recipe.image,
                        resume: recipe.summary,
                        dietTypes: recipe.diets,
                        score: recipe.spoonacularScore,
                        healthScore: recipe.healthScore,
                        time: recipe.readyInMinutes,
                        dishTypes: recipe.dishTypes,
                    })
                })
                return recs
            }
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
            return {
                id: json.id,
                title: json.title,
                image: json.image,
                resume: json.summary,
                dietTypes: json.diets,
                score: json.spoonacularScore,
                healthScore: json.healthScore,
                dishTypes: json.dishTypes,
                steps: json.analyzedInstructions[0]?.steps.map(pos=>{
                    return {
                        number: pos.number,
                        step: pos.step
                    }
                })
            }
        })
    } catch (err) {
        return 'Error found while fetching API by id, please try again'
    }
}

async function fetchByDBQuery(query){
    return Recipes.findAll({
        where: {
            name: {[Op.like]: `%${query}%`} // Explanation at top of file
        },
        include: {
            model: DietTypes,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    });
}

async function fetchByDBId(id){
    return Recipes.findByPk(id, {
        include: {
            model: DietTypes,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    });
}

async function fetchWholeDB(){
    return Recipes.findAll({
        include: {
            model: DietTypes,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    });
}

module.exports = {
    fetchByApiQuery,
    fetchByApiId,
    fetchByDBQuery,
    fetchByDBId,
    fetchWholeDB
}