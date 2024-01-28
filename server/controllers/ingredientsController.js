const { v4: uuidv4 } = require("uuid");

let ingredients = [
  { name: "absinth", id: "1" },
  { name: "amaretto", id: "2" },
  { name: "apple juice", id: "3" },
  { name: "baileys", id: "4" },
  { name: "becherovka", id: "5" },
  { name: "bourbon", id: "6" },
  { name: "campari", id: "7" },
  { name: "cinzano", id: "8" },
  { name: "coca cola", id: "9" },
  { name: "cognac", id: "10" },
  { name: "cranberry juice", id: "11" },
  { name: "curaccao", id: "12" },
  { name: "fernet", id: "13" },
  { name: "gin", id: "14" },
  { name: "grenadine", id: "15" },
  { name: "ice", id: "16" },
  { name: "jaegermeister", id: "17" },
  { name: "lemon juice", id: "18" },
  { name: "lime", id: "19" },
  { name: "mojito", id: "20" },
  { name: "orange juice", id: "21" },
  { name: "pepper", id: "22" },
  { name: "pineapple juice", id: "23" },
  { name: "redbull", id: "100" },
  { name: "rum dark", id: "24" },
  { name: "rum white", id: "25" },
  { name: "salt", id: "26" },
  { name: "sect", id: "27" },
  { name: "strawberry juice", id: "28" },
  { name: "stroh", id: "29" },
  { name: "sugar", id: "31" },
  { name: "tatra tea", id: "30" },
  { name: "tequila", id: "32" },
  { name: "vodka", id: "33" },
  { name: "whiskey", id: "34" },
  { name: "wine red", id: "35" },
  { name: "wine white", id: "36" },
]; // In-memory databáze pro ingredience

const ingredientsController = {
  getAllIngredients: (req, res) => {
    res.json(ingredients);
  },
  getIngredientById: (req, res) => {
    const ingredient = ingredients.find((i) => i.id === req.params.id);
    if (!ingredient) return res.status(404).send("Ingredient not found");
    res.json(ingredient);
  },
  createIngredient: (req, res) => {
    const { name, unit } = req.body;
    if (!name || !unit) {
      return res.status(400).send("Missing required fields");
    }
    const newIngredient = { id: uuidv4(), name, unit };
    ingredients.push(newIngredient);
    res.status(201).json(newIngredient);
  },
  deleteIngredient: (req, res) => {
    const index = ingredients.findIndex((i) => i.id === req.params.id);
    if (index === -1) return res.status(404).send("Ingredient not found");

    ingredients.splice(index, 1);
    res.status(204).send();
  },
};

module.exports = ingredientsController;
