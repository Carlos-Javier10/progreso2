const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/getInventory', (req, res) => {
    const sql = 'SELECT * FROM Productos';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json({ products: results });
    });
});

module.exports = router;
