const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const recipesRouter = require('./RecipesRoutes.js');
const recipeRouter = require('./RecipeRoute.js');
const dietRouter = require('./DietsRoutes.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/recipes', recipesRouter);
router.use('/types', dietRouter);
router.use('/recipe', recipeRouter);

module.exports = router;
