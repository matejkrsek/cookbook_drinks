const { v4: uuidv4 } = require("uuid");

let drinks = [
  {
    author: "Vlado Gurčo",
    name: "Bloody MarrX",
    procedure: "Tenndus anmremainnining sker including versions of Lorem Ipsum",
    id: "8fd09f3f5e2b4l23",
    ingredients: [
      { name: "vodka", amount: "100", unit: "ml", id: "8fd09f3f5e2b4l24" },
      { name: "rum", amount: "150", unit: "ml", id: "8fd09f3f5e2c4l23" },
      {
        name: "jablečný džus",
        amount: "400",
        unit: "ml",
        id: "8fd09f3f5e2b4l23",
      },
    ],
  },
  {
    author: "Slender Man",
    name: "Blood Marry",
    procedure:
      "Tento recept pochází z daléke Indie em Ipsum has been the industry's",
    id: "8fdq9f3f5e2b4324",
    ingredients: [
      { name: "jin", amount: "200", unit: "ml", id: "8fd09f3f5e2b4l23" },
      { name: "voda", amount: "500", unit: "ml", id: "8fd09f3f5e2b4l23" },
      { name: "redbull", amount: "150", unit: "ml", id: "8fd09f3f5e2b4l23" },
    ],
  },
  {
    author: "Slender Man",
    name: "Vomit Master",
    procedure:
      "Tand scramblep publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    id: "8fd09f3f5emb4324",
    ingredients: [
      { name: "cukr", amount: "2", unit: "lžička", id: "8fd09f3f5e2b4l23" },
      { name: "med", amount: "10", unit: "g", id: "8fd09f3f5e2b4l23" },
      { name: "pivo", amount: "300", unit: "ml", id: "8fd09f3f5e2b4l23" },
    ],
  },
  {
    author: "Slender Man",
    name: "Bladdy Marry",
    procedure:
      "Tento recept pochází z daléke Indie em Ipsum has been the industry's s",
    id: "8fd09y3f5e2b4324",
    ingredients: [
      { name: "", amount: "", unit: "", id: "" },
      { name: "", amount: "", unit: "", id: "" },
      { name: "", amount: "", unit: "", id: "" },
    ],
  },
  {
    author: "Sluss Man",
    name: "Lomody Marry",
    procedure:
      "Tento recept pochází z daléke Indie em Ipsum has been the industry's standard dummy te",
    id: "8fd09n3f5e2b4324",
    ingredients: [
      { name: "", amount: "", unit: "", id: "" },
      { name: "", amount: "", unit: "", id: "" },
      { name: "", amount: "", unit: "", id: "" },
    ],
  },
  {
    author: "Slender WoMan",
    name: "Bloody MarryJane",
    procedure: "Tento recept pe 1500s, psum",
    id: "8fd09f3fte2b4324",
  },
  {
    author: " Mann",
    name: "BloAdy Marry",
    procedure: "Tento rons of Lorem Ipsum",
    id: "8fd0ef3f5e2b4324",
  },
  {
    author: "SlSMan",
    name: "Bloody MarryX",
    procedure: "Tento recept pochází z daléke Ike a tyt of Lorem Ipsum",
    id: "8fd09f3fae2b4324",
  },
  {
    author: "Tichá Bára",
    name: "Bloody Queenys",
    procedure: "Tento recept pochází z daléke Iversions of Lorem Ipsum",
    id: "8fd09f3f5e2b2324",
  },
  {
    author: "Vlado Gurčoy",
    name: "Great Marry",
    procedure:
      "Tento pri publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    id: "8fd09f3f5e2b4322",
  },
  {
    author: "Vladoslav Gurčo",
    name: "Great Marradith",
    procedure: "Tento a gaf Lorem Ipsum",
    id: "8fd09f3f5e2b4321",
  },
  {
    author: "Vlado Gurčo",
    name: "Flex Marradith",
    procedure:
      "Tento recept pocháver since the 1500s, whenlike Aldus PageMaker including versions of Lorem Ipsum",
    id: "8fd09f3f5e2b4326",
  },

  {
    author: "Vladok Gurčo",
    name: "Bloody Susan",
    procedure: "Tento recept pochk ap in of Lorem Ipsum",
    id: "8fd09f3f5e2b4327",
  },
  {
    author: "Vlado Gurčo",
    name: "Rainy TEMPLE",
    procedure: "Tenons of Lorem Ipsum",
    id: "8fd09f3f5e2b4320",
  },
  {
    author: "GARLAK",
    name: "Rainy day",
    procedure: "Tenons of Lorem Ipsum",
    id: "8fd09f3f5e2b4320",
  },
]; // in-memory databáze

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
    const { author, name, procedure, ingredients } = req.body;
    if (!author || !name || !procedure || !ingredients) {
      return res.status(400).send("Missing required fields");
    }
    const newDrink = { id: uuidv4(), author, name, procedure, ingredients };
    drinks.push(newDrink);
    res.status(201).json(newDrink);
  },
  updateDrink: (req, res) => {
    const drink = drinks.find((d) => d.id === req.params.id);
    if (!drink) return res.status(404).send("Drink not found");

    const { author, name, procedure } = req.body;
    if (author) drink.author = author;
    if (name) drink.name = name;
    if (procedure) drink.procedure = procedure;

    res.json(drink);
  },
  deleteDrink: (req, res) => {
    const index = drinks.findIndex((d) => d.id === req.params.id);
    if (index === -1) return res.status(404).send("Drink not found");

    drinks.splice(index, 1);
    res.status(204).send();
  },
};

module.exports = drinksController;
