const { Router } = require('express');
const { fetchDiets } = require('../controllers/DietsFetcher.js')


const router = Router()

router.get('/', async (req,res)=>{
    let diets = await fetchDiets()
    return res.json({diets})
})

module.exports = router