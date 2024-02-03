const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require("uuid");
const ingredientsFilePath = path.join(__dirname, '..', 'data', 'ingredients.json');

async function readIngredients() {
    try {
        const data = await fs.readFile(ingredientsFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        throw new Error(`Could not read ingredients data: ${error}`);
    }
}

// path - drinks.json file
const drinksFilePath = path.join(__dirname, '..', 'data', 'drinks.json');

// Helper funkce for pro čtení a psaní dat drinků
async function readDrinks() {
    try {
        const data = await fs.readFile(drinksFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        throw new Error(`Could not read drinks data: ${error}`);
    }
}

async function writeDrinks(drinks) {
    try {
        await fs.writeFile(drinksFilePath, JSON.stringify(drinks, null, 2), 'utf-8');
    } catch (error) {
        throw new Error(`Could not write drinks data: ${error}`);
    }
}

const validateIngredient = (ingredient) => {
    const { name, amount, unit } = ingredient;
    if (!name || typeof name !== "string") return "Invalid ingredient name";
    if (typeof amount !== "number" || amount <= 0) return "Invalid ingredient amount";
    if (!unit || typeof unit !== "string") return "Invalid ingredient unit";
    return null; // null když není chyba - úspěšná validace
};

const validateDrink = (drink) => {
    const { name, author, type, procedure, ingredients } = drink;
    if (!name || typeof name !== "string") return "Invalid name";
    if (!author || typeof author !== "string") return "Invalid author";
    if (!type || typeof type !== "string") return "Invalid type";
    if (!procedure || typeof procedure !== "string") return "Invalid procedure";
    if (!Array.isArray(ingredients)) return "Invalid ingredients - not an array";

    // Vyfiltrovat nevyplněné ingredience
    const nonEmptyIngredients = ingredients.filter(ingredient => {
        return ingredient.name || ingredient.amount || ingredient.unit;
    });

    // Musí být aspoň 2 neprázdné ingredience
    if (nonEmptyIngredients.length < 2) {
        return "Invalid ingredients - at least two required";
    }

    // Validace každé neprázdné ingredience
    for (const ingredient of nonEmptyIngredients) {
        const ingredientValidationError = validateIngredient(ingredient);
        if (ingredientValidationError) return ingredientValidationError;
    }

    return null; // null když drink projde validací
};

 // validace atributů receptu včetně validace atributu ingredience

// upravený drinksController pro JSON perzistenci
const drinksController = {
    getAllDrinks: async (req, res) => {
        try {
            const drinks = await readDrinks();
            res.status(200).json(drinks);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    getDrinkById: async (req, res) => {
        try {
            const drinks = await readDrinks();
            const drink = drinks.find(d => d.id === req.params.id);
            if (!drink) {
                return res.status(404).send("Drink not found");
            }
            res.json(drink);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    createDrink: async (req, res) => {
        try {
            const drinks = await readDrinks();
            const ingredientsData = await readIngredients();
    
            const newDrink = { ...req.body, id: uuidv4() };
    
            // ke každé vybrané ingredienci přiřadit její existující id
            // uložit amount jako číslo
            newDrink.ingredients = newDrink.ingredients.map(ingredient => {
                const foundIngredient = ingredientsData.find(i => i.name === ingredient.name);
                return {
                    ...ingredient,
                    id: foundIngredient ? foundIngredient.id : null, // přiřadit id nebo null když není
                    amount: Number(ingredient.amount) // převést ID na číslo
                };
            });
    
            const validationError = validateDrink(newDrink);
            if (validationError) {
                return res.status(400).send(validationError);
            }
            drinks.push(newDrink);
            await writeDrinks(drinks);
            res.status(201).json(newDrink);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },    

    updateDrink: async (req, res) => {
        try {
            const drinks = await readDrinks();
            const drinkIndex = drinks.findIndex(d => d.id === req.params.id);
            if (drinkIndex === -1) {
                return res.status(404).send("Drink not found");
            }
    
            // Převod případných amount stringů na number
            let updatedDrink = { ...drinks[drinkIndex], ...req.body };
    
            if (updatedDrink.ingredients) {
                updatedDrink.ingredients = updatedDrink.ingredients.map(ingredient => ({
                    ...ingredient,
                    amount: Number(ingredient.amount)
                }));
            }
    
            const validationError = validateDrink(updatedDrink);
            if (validationError) {
                return res.status(400).send(validationError);
            }
            drinks[drinkIndex] = updatedDrink;
            await writeDrinks(drinks);
            res.json(updatedDrink);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    deleteDrink: async (req, res) => {
        try {
            const drinks = await readDrinks();
            const drinkIndex = drinks.findIndex(d => d.id === req.params.id);
            if (drinkIndex === -1) {
                return res.status(404).send("Drink not found");
            }
            drinks.splice(drinkIndex, 1);
            await writeDrinks(drinks);
            res.status(204).send();
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    isIngredientUsed: async (ingredientName) => {
        try {
            const drinks = await readDrinks();
            return drinks.some(drink =>
                drink.ingredients.some(ingredient =>
                    ingredient.name.toLowerCase() === ingredientName.toLowerCase() &&
                    ingredient.name !== ""
                )
            );
        } catch (error) {
            console.error(error);
            throw new Error(`Error checking if ingredient is used: ${error}`);
        }
    },
};

module.exports = drinksController;
