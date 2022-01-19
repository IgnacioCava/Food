const { Router } = require('express');
const { Recipes } = require('../db');

const router = Router();

//POST recipe
router.post('/', async (req,res)=>{
    try {
        const { name, resume, dietTypes, score, healthScore, time, dishTypes, steps } = req.body

        const createdRecipe = await Recipes.create({
            name, resume, dietTypes, score, healthScore, time, dishTypes, steps
        })
        return res.json({createdRecipe})
    } catch (error) {
        next(error)
    };
})

module.exports = router