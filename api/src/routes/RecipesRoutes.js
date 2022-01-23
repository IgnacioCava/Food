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
    
    if(!name||name.trim().length===0) return res.status(200).send({message:'Queries must not be empty. Please send a valid request'})
    console.log(name)
    let ApiRecipes = await fetchByApiQuery(name)
    let DBRecipes = await fetchByDBQuery(name)
    console.log(DBRecipes)
    let foundRecipes = []
    
    //if(typeof ApiRecipes==='object') return res.status(200).json({message:'Error found while fetching API by query, please try again'})
    if(typeof ApiRecipes!=='string'&&ApiRecipes){
        
        ApiRecipes.forEach(recipe=>{
            createDiet(recipe.dietTypes)
        })
        foundRecipes.push(ApiRecipes)
    } else console.log(ApiRecipes)
    
    DBRecipes?foundRecipes.push(DBRecipes):null

    if(!foundRecipes.length) return res.status(200).json({message:'No recipes found'})
    
    else return res.status(200).json(foundRecipes.flat())
})

//By id
router.get('/:id', async (req,res)=>{
    const { id } = req.params
    console.log(id)
    if(!id) return res.status(200).json({message:'No ID was received'})

    if(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(id)){
        let rec = await fetchByDBId(id)
        
        if(!rec) return res.status(200).json({message:'No recipe found matching received ID'})
        else return res.status(200).send({rec})
    } else {
        let rec = await fetchByApiId(id)
        if(!rec) return res.status(200).json({message:'No recipe found matching received ID'})
        else {
            createDiet(rec.dietTypes)
            return res.json({rec})
        }
    }
})

module.exports = router