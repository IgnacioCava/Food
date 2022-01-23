const { DietTypes } = require('../db');
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const DB_DietTypes = [
    'Gluten Free',
    'Ketogenic', 
    'Vegetarian',
    'Lacto-Vegetarian', 
    'Ovo-Vegetarian',
    'Vegan',
    'Pescatarian', 
    'Paleo', 
    'Primal', 
    'Low FODMAP',
    'Whole30'
]

async function DietTypes_Preloader(){
    DB_DietTypes.forEach(diet=>{
        DietTypes.findOrCreate({
            where: {
                name: diet
                //name: {[Op.like]: `%${diet.toLowerCase()}%`}
            },
        })
    })
}

async function fetchDiets(){
    const diets = await DietTypes.findAll()
    return diets
}

async function createDiet(dietTypes){
    if(dietTypes)
    {dietTypes.forEach(diet=>{
        DietTypes.findOrCreate({
            where: {name:diet.charAt(0).toUpperCase()+diet.slice(1)}
        })
    })}
    
}

module.exports = {
    DietTypes_Preloader,
    fetchDiets,
    createDiet
}