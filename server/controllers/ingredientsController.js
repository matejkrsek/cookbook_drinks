const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require("uuid");
const drinksController = require('./drinksController'); // Importování drinksControlleru pro kontrolu použití ingredience

// path - ingredients.json
const ingredientsFilePath = path.join(__dirname, '..', 'data', 'ingredients.json');

// funkce pro čtení a psaní do JSON
async function readIngredients() {
    try {
        const data = await fs.readFile(ingredientsFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        throw new Error(`Could not read ingredients data: ${error}`);
    }
}

async function writeIngredients(ingredients) {
    try {
        await fs.writeFile(ingredientsFilePath, JSON.stringify(ingredients, null, 2), 'utf-8');
    } catch (error) {
        throw new Error(`Could not write ingredients data: ${error}`);
    }
}

// Validation function for individual ingredients
const validateSoloIngredient = (ingredient) => {
    const { name } = ingredient;
    if (!name || typeof name !== 'string') {
        return 'Invalid name';
    }

    // kontrola unikátnosti jména
    return readIngredients().then((ingredients) => {
        const isNameUnique = !ingredients.some(existingIngredient => existingIngredient.name.toLowerCase() === name.toLowerCase());
        if (!isNameUnique) {
            return `An ingredient with the name "${name}" already exists.`;
        }
        return null;
    });
};

// Upravený ingredientsController pro JSON perzistenci
const ingredientsController = {
    getAllIngredients: async (req, res) => {
        try {
            const ingredients = await readIngredients();
            res.status(200).json(ingredients);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    getIngredientById: async (req, res) => {
        try {
            const ingredients = await readIngredients();
            const ingredient = ingredients.find(i => i.id === req.params.id);
            if (!ingredient) {
                return res.status(404).send('Ingredient not found');
            }
            res.json(ingredient);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    createIngredient: async (req, res) => {
        try {
            const newIngredient = { ...req.body, id: uuidv4() };
            const validationError = await validateSoloIngredient(newIngredient);
            if (validationError) {
                return res.status(400).send(validationError);
            }
            const ingredients = await readIngredients();
            ingredients.push(newIngredient);
            await writeIngredients(ingredients);
            res.status(201).json(newIngredient);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    deleteIngredient: async (req, res) => {
        try {
            const ingredientId = req.params.id;
            const ingredients = await readIngredients();
            const ingredientIndex = ingredients.findIndex(ingredient => ingredient.id === ingredientId);

            if (ingredientIndex === -1) {
                return res.status(404).send('Ingredient not found');
            }

            // Získat jméno ingredience
            const ingredientName = ingredients[ingredientIndex].name;

            // Kontrola použití ingredience v existujícím drinku
            if (await drinksController.isIngredientUsed(ingredientName)) {
                return res.status(400).send('Cannot delete this ingredient as it is used in one or more drinks.');
            }

            // Když ingredience není použita, smaže se
            ingredients.splice(ingredientIndex, 1);
            await writeIngredients(ingredients);
            res.status(204).send('Ingredient deleted');
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
};

module.exports = ingredientsController;

