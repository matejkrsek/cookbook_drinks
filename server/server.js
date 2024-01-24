const express = require('express');
const cors = require('cors');
const drinksRouter = require('./routes/drinks');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.use('/api/drinks', drinksRouter);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
