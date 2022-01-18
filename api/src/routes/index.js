const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
const models = require("C:/Users/User/Desktop/Henry/PI-Food-main/client/src/Actions")
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/recipes", async (req, res) => {
    const recName = req.query.name;
    let recipes = [];
    if(recName){
        models.simpleSearch(recName)
    }
    if(recipes.length===0) res.send(200).json({msg: 'No matching recipes found'})
});

router.get("/recipes/:idReceta", async (req, res) => {
    const { idReceta } = req.params;
    let recipes = [];
    if(recName){
        models.simpleSearch(recName)
    }
    if(recipes.length===0) res.send(200).json({msg: 'No matching recipes found'})
});

router.get("/types", async (req, res) => {
    const { idReceta } = req.params;
    let recipes = [];
    if(recName){
        models.simpleSearch(recName)
    }
    if(recipes.length===0) res.send(200).json({msg: 'No matching recipes found'})
});

router.post("/recipe", async (req, res) => {
    const { idReceta } = req.params;
    let recipes = [];
    if(recName){
        models.simpleSearch(recName)
    }
    if(recipes.length===0) res.send(200).json({msg: 'No matching recipes found'})
});

module.exports = router;
