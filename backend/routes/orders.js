const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/getOrders', (req, res) => {
    const sql = 'SELECT * FROM OrdenesCompra';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json({ orders: results });
    });
});

router.post('/createCSV', (req, res) => {
    const sql = 'SELECT * FROM OrdenesCompra';
    db.query(sql, (err, results) => {
        if (err) throw err;
        // Create CSV logic here
        res.json({ message: 'CSV created successfully' });
    });
});

module.exports = router;
