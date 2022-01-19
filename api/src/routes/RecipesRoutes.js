const { Router } = require('express');
const { DietTypes_Preloader, createDiet } = require('../controllers/DietsFetcher')
const { fetchByApiQuery,
        fetchByApiId,
        fetchByDBQuery,
        fetchByDBId,
        fetchWholeDB } = require('../controllers/RecipesFetcher.js');

const router = Router();

//GET
//By query
router.get('/', async (req,res)=>{
    const { name } = req.query

    if(!name||name.trim().length===0) return res.status(200).json({message:'Queries must not be empty. Please send a valid request'})

    let ApiRecipes = fetchByApiQuery(name)
    let DBRecipes = fetchByDBQuery(name)
    let foundRecipes = []

    if(ApiRecipes==='Exceeded daily API calls') return res.status(200).json({message:'Exceeded daily API calls'})

    if(ApiRecipes){
        ApiRecipes.forEach(recipe=>{
            createDiet(recipe.DietTypes)
        })
        found.push(ApiRecipes)
    }
    
    DBRecipes?found.push(DBRecipes):null

    if(!foundRecipes.length) return res.status(200).json({message:'No recipes found'})
    else return res.json({foundRecipes})
})

//By id
router.get('/:id', async (req,res)=>{
    const { id } = req.params

    if(!id) return res.status(200).json({message:'No ID was received'})

    if(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(id)){
        let rec=fetchByDBId(id)
        if(!rec) return res.status(200).json({message:'No recipe found matching received ID'})
        else return res.status(200).send({rec})
    } else {
        let rec = fetchByApiId(id)
        if(!rec) return res.status(200).json({message:'No recipe found matching received ID'})
        else return res.json({rec})
    }
})

module.exports = router