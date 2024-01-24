const { v4: uuidv4 } = require('uuid');

let drinks = []; // in-memory databáze

const drinksController = {
    getAllDrinks: (req, res) => {
        res.json(drinks);
    },
    getDrinkById: (req, res) => {
        const drink = drinks.find(d => d.id === req.params.id);
        if (!drink) return res.status(404).send('Drink not found');
        res.json(drink);
    },
    createDrink: (req, res) => {
        const { author, name, description } = req.body;
        if (!author || !name || !description) {
            return res.status(400).send('Missing required fields');
        }
        const newDrink = { id: uuidv4(), author, name, description };
        drinks.push(newDrink);
        res.status(201).json(newDrink);
    },
    updateDrink: (req, res) => {
        const drink = drinks.find(d => d.id === req.params.id);
        if (!drink) return res.status(404).send('Drink not found');

        const { author, name, description } = req.body;
        if (author) drink.author = author;
        if (name) drink.name = name;
        if (description) drink.description = description;

        res.json(drink);
    },
    deleteDrink: (req, res) => {
        const index = drinks.findIndex(d => d.id === req.params.id);
        if (index === -1) return res.status(404).send('Drink not found');

        drinks.splice(index, 1);
        res.status(204).send();
    }
};

module.exports = drinksController;
