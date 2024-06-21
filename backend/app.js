const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./db');
const orders = require('./routes/orders');
const inventory = require('./routes/inventory');
const billing = require('./routes/billing');

app.use(bodyParser.json());
app.use('/orders', orders);
app.use('/inventory', inventory);
app.use('/billing', billing);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
