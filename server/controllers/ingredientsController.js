const { v4: uuidv4 } = require('uuid');

let ingredients = []; // In-memory databáze pro ingredience

const ingredientsController = {
    getAllIngredients: (req, res) => {
        res.json(ingredients);
    },
    getIngredientById: (req, res) => {
        const ingredient = ingredients.find(i => i.id === req.params.id);
        if (!ingredient) return res.status(404).send('Ingredient not found');
        res.json(ingredient);
    },
    createIngredient: (req, res) => {
        const { name, amount, unit } = req.body;
        if (!name || !amount || !unit) {
            return res.status(400).send('Missing required fields');
        }
        const newIngredient = { id: uuidv4(), name, amount, unit };
        ingredients.push(newIngredient);
        res.status(201).json(newIngredient);
    },
    deleteIngredient: (req, res) => {
        const index = ingredients.findIndex(i => i.id === req.params.id);
        if (index === -1) return res.status(404).send('Ingredient not found');

        ingredients.splice(index, 1);
        res.status(204).send();
    }
};

module.exports = ingredientsController;
