const { Router } = require('express');
const Sequelize = require('sequelize');
const { fetchDiets } = require('../controllers/DietsFetcher.js')


const router = Router()

router.get('/', async (req,res)=>{
    let diets = fetchDiets()
    return res.json({diets})
})