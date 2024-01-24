const express = require('express');
const drinksController = require('../controllers/drinksController');

const router = express.Router();

router.get('/', drinksController.getAllDrinks);
router.get('/:id', drinksController.getDrinkById);
router.post('/', drinksController.createDrink);
router.put('/:id', drinksController.updateDrink);
router.delete('/:id', drinksController.deleteDrink);

module.exports = router;
