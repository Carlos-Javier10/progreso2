const db = require('../db');

class Invoice {
    static createInvoice(invoice, callback) {
        const sql = 'INSERT INTO Facturas SET ?';
        db.query(sql, invoice, (err, result) => {
            if (err) callback(err, null);
            callback(null, result);
        });
    }

    static getInvoiceByOrderId(orderId, callback) {
        const sql = 'SELECT * FROM Facturas WHERE ID_Orden = ?';
        db.query(sql, [orderId], (err, result) => {
            if (err) callback(err, null);
            callback(null, result);
        });
    }
}

module.exports = Invoice;
