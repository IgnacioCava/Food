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
    'Pescetarian', 
    'Paleo', 
    'Primal', 
    'Low FODMAP',
    'Whole30'
]

function DT_Preloader(){
    DB_DietTypes.forEach(diet=>{
        DietTypes.findOrCreate({
            where: {
                name: {[Op.like]: `%${diet.toLowerCase()}%`}
            },
        })
        
    })
}

async function fetchDiets(){
    const diets = await DietTypes.findAll()
    return diets
}

async function createDiet(diet){
    DietTypes.findOrCreate({
        where: {name:diet}
    })
}

module.exports = {
    DT_Preloader,
    fetchDiets,
    createDiet
}