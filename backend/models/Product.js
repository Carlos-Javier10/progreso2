const db = require('../db');

class Product {
    static getAllProducts(callback) {
        const sql = 'SELECT * FROM Productos';
        db.query(sql, (err, results) => {
            if (err) callback(err, null);
            callback(null, results);
        });
    }

    static updateStock(productId, quantity, callback) {
        const sql = 'UPDATE Productos SET Stock = Stock - ? WHERE ID_Producto = ?';
        db.query(sql, [quantity, productId], (err, result) => {
            if (err) callback(err, null);
            callback(null, result);
        });
    }
}

module.exports = Product;
