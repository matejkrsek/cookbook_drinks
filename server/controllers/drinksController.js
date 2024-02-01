const { v4: uuidv4 } = require("uuid");

let drinks = [
  {
    author: "Milan Novotný",
    name: "Acapulco rink",
    procedure:
      "Add ice to shaker with all ingredients. Shake thoroughly and long. Then pour through a strainer into pre-chilled cocktail glasses. Finally, garnish with lime zest",
    id: "8fd09f3f5e2b4l23",
    ingredients: [
      { name: "vodka", amount: "30", unit: "ml", id: "30" },
      { name: "sekt", amount: "30", unit: "ml", id: "24" },
      { name: "led", amount: "3", unit: "cube", id: "19" },
      { name: "", amount: "", unit: "" },
      { name: "", amount: "", unit: "" },
      { name: "", amount: "", unit: "" },
    ],
  },
  {
    author: "Martin Smith",
    name: "Lemon Drop",
    procedure:
      "Add all ingredients to a shaker with ice. Wipe the outer edge of the glass with lemon and sprinkle with sugar. Strain and carefully pour the contents of the shaker into the glass.",
    id: "8fdq9f3f5e2b432et",
    ingredients: [
      { name: "vodka", amount: "30", unit: "ml", id: "33" },
      { name: "lemon juice", amount: "3", unit: "ml", id: "18" },
      { name: "redbull", amount: "150", unit: "ml", id: "100" },
      { name: "", amount: "", unit: "" },
      { name: "", amount: "", unit: "" },
      { name: "", amount: "", unit: "" },
    ],
  },
  {
    author: "John Bacardi",
    name: "Long Island",
    procedure:
      "Gradually pour all the ingredients into the glass and add ice. Finally, pour cola and garnish with lemon wedges.",
    id: "8fd09f3f5emb432x",
    ingredients: [
      { name: "gin", amount: "20", unit: "ml", id: "14" },
      { name: "white rum", amount: "20", unit: "ml", id: "25" },
      { name: "vodka", amount: "20", unit: "ml", id: "33" },
      { name: "lemon juice", amount: "20", unit: "ml", id: "18" },
      { name: "coca cola", amount: "200", unit: "ml", id: "9" },
      { name: "", amount: "", unit: "" },
    ],
  },
  {
    author: "Muela Hanioy",
    name: "Mai Tai",
    procedure:
      "Add all ingredients and ice except dark rum and grenadine to a shaker. Shake briefly and pour into a glass. Finally, add ice and dark rum with grenadine and garnish.",
    id: "8fd09y3f5e2b432p",
    ingredients: [
      { name: "curaccao", amount: "50", unit: "ml", id: "12" },
      { name: "rum white", amount: "50", unit: "ml", id: "25" },
      { name: "rum dark", amount: "50", unit: "ml", id: "24" },
      { name: "lime", amount: "30", unit: "ml", id: "19" },
      { name: "", amount: "", unit: "" },
      { name: "", amount: "", unit: "" },
    ],
  },
  {
    author: "George Clooney",
    name: "Manhattan Drink",
    procedure:
      "Put all the ingredients in a shaker. After mixing, pour through a strainer into a cocktail glass. Finally, garnish with a cherry and serve without a straw.",
    id: "8fd09n3f5e2b432q",
    ingredients: [
      { name: "whiskey", amount: "50", unit: "ml", id: "34" },
      { name: "bourbon", amount: "50", unit: "ml", id: "6" },
      { name: "ice", amount: "3", unit: "cube", id: "16" },
      { name: "", amount: "", unit: "" },
      { name: "", amount: "", unit: "" },
      { name: "", amount: "", unit: "" },
    ],
  },
  {
    author: "John Bacardi younger",
    name: "Long Stand",
    procedure:
      "Pour all the ingredients into the glass and add ice. Finally, pour cola and garnish with lemon wedges. Cheers!",
    id: "8fd09f3f5emb432l",
    ingredients: [
      { name: "gin", amount: "20", unit: "ml", id: "14" },
      { name: "white rum", amount: "20", unit: "ml", id: "25" },
      { name: "vodka", amount: "20", unit: "ml", id: "33" },
      { name: "lemon juice", amount: "20", unit: "ml", id: "18" },
      { name: "coca cola", amount: "200", unit: "ml", id: "9" },
      { name: "", amount: "", unit: "" },
    ],
  },
  {
    author: "Marria Bloom",
    name: "Manhattan Squeeze",
    procedure:
      "Put all the ingredients in a shaker. After mixing, pour through a strainer into a cocktail glass. Finally, garnish with a cherry and serve with a big huge  smile.",
    id: "8fd09n3f5e2b432m",
    ingredients: [
      { name: "whiskey", amount: "50", unit: "ml", id: "34" },
      { name: "bourbon", amount: "50", unit: "ml", id: "6" },
      { name: "ice", amount: "3", unit: "cube", id: "16" },
      { name: "", amount: "", unit: "" },
      { name: "", amount: "", unit: "" },
      { name: "", amount: "", unit: "" },
    ],
  },
  {
    author: "Mike Clooney",
    name: "Bahama beach",
    procedure:
      "Put all the ingredients in a shaker. Pour through a strainer into a cocktail glass. Finally, garnish with a cherry and serve without a straw. There you go!",
    id: "8fd09n3f5e2b432y",
    ingredients: [
      { name: "whiskey", amount: "50", unit: "ml", id: "34" },
      { name: "bourbon", amount: "50", unit: "ml", id: "6" },
      { name: "ice", amount: "3", unit: "cube", id: "16" },
      { name: "", amount: "", unit: "" },
      { name: "", amount: "", unit: "" },
      { name: "", amount: "", unit: "" },
    ],
  },
  {
    author: "George Black",
    name: "Manhattan Street",
    procedure:
      "Put all the ingredients in a shaker. After mixing, pour through a strainer into a cocktail glass.",
    id: "8fd09n3f5e2b432a",
    ingredients: [
      { name: "whiskey", amount: "50", unit: "ml", id: "34" },
      { name: "bourbon", amount: "50", unit: "ml", id: "6" },
      { name: "ice", amount: "3", unit: "cube", id: "16" },
      { name: "", amount: "", unit: "" },
      { name: "", amount: "", unit: "" },
      { name: "", amount: "", unit: "" },
    ],
  },
]; // in-memory databáze

const validateIngredient = (ingredient) => {
  const { name, amount, unit} = ingredient;
  if (!name || typeof name !== "string") return "Invalid ingredient name";
  if (!amount || typeof amount !== "string") return "Invalid ingredient amount";
  if (!unit || typeof unit !== "string") return "Invalid ingredient unit";
  return null;
}; // validace ingredience přidané do receptu včetně vlastností

const validateDrink = (drink) => {
  const { name, author, procedure, ingredients } = drink;
  if (!name || typeof name !== "string") return "Invalid name";
  if (!author || typeof author !== "string") return "Invalid author";
  if (!procedure || typeof procedure !== "string") return "Invalid procedure";
  if (!Array.isArray(ingredients)) return "Invalid ingredients - not an array";
  if (ingredients.length < 2)
    return "Invalid ingredients - at least two required";
  // if (ingredients.some((ing) => validateIngredient(ing) !== null))
  //  return "Invalid ingredients - structure error";
  return null;
}; // validace atributů receptu včetně validace atributu ingredience

const drinksController = {
  getAllDrinks: (req, res) => {
    res.json(drinks);
  },

  getDrinkById: (req, res) => {
    const drink = drinks.find((d) => d.id === req.params.id);
    if (!drink) return res.status(404).send("Drink not found");
    res.json(drink);
  },

  createDrink: (req, res) => {
    const newDrink = { ...req.body, id: uuidv4() }; // Přidat ID
    const validationError = validateDrink(newDrink);
    if (validationError) return res.status(400).send(validationError);

    drinks.push(newDrink);
    res.status(201).json(newDrink);
  },

  updateDrink: (req, res) => {
    const drinkIndex = drinks.findIndex((d) => d.id === req.params.id);
    if (drinkIndex === -1) return res.status(404).send("Drink not found");

    const updatedDrink = { ...drinks[drinkIndex], ...req.body };
    const validationError = validateDrink(updatedDrink);
    if (validationError) return res.status(400).send(validationError);

    drinks[drinkIndex] = updatedDrink;
    res.json(updatedDrink);
  },

  deleteDrink: (req, res) => {
    const drinkIndex = drinks.findIndex((d) => d.id === req.params.id);
    if (drinkIndex === -1) return res.status(404).send("Drink not found");

    drinks.splice(drinkIndex, 1);
    res.status(204).send();
  },
};

module.exports = drinksController;
