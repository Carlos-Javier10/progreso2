const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/generateInvoice', (req, res) => {
    const { orderId } = req.body;
    const sqlOrder = 'SELECT * FROM OrdenesCompra WHERE ID_Orden = ?';
    db.query(sqlOrder, [orderId], (err, orderResults) => {
        if (err) throw err;

        if (orderResults.length > 0) {
            const order = orderResults[0];
            const total = order.Cantidad * order.Precio; // Assuming Precio is fetched with the order
            const sqlInvoice = 'INSERT INTO Facturas (ID_Orden, Total) VALUES (?, ?)';
            db.query(sqlInvoice, [orderId, total], (err, result) => {
                if (err) throw err;
                res.json({ message: 'Invoice generated successfully', invoiceId: result.insertId });
            });
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    });
});

module.exports = router;
