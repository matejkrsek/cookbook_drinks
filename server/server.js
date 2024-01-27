const express = require('express');
const cors = require('cors');
const drinksRouter = require('./routes/drinks');
const ingredientsRouter = require('./routes/ingredients');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.use('/api/drinks', drinksRouter);
app.use('/api/ingredients', ingredientsRouter);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

