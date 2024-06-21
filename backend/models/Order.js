const db = require('../db');

class Order {
    static getAllOrders(callback) {
        const sql = 'SELECT * FROM OrdenesCompra';
        db.query(sql, (err, results) => {
            if (err) callback(err, null);
            callback(null, results);
        });
    }

    static createOrder(order, callback) {
        const sql = 'INSERT INTO OrdenesCompra SET ?';
        db.query(sql, order, (err, result) => {
            if (err) callback(err, null);
            callback(null, result);
        });
    }

    static getOrderById(orderId, callback) {
        const sql = 'SELECT * FROM OrdenesCompra WHERE ID_Orden = ?';
        db.query(sql, [orderId], (err, result) => {
            if (err) callback(err, null);
            callback(null, result);
        });
    }
}

module.exports = Order;
