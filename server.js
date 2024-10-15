const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
const db = new sqlite3.Database(':memory:'); // O usar un archivo, por ejemplo: 'shop.db'

app.use(bodyParser.json());

// Configurar la base de datos
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS cart (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product TEXT,
        price REAL
    )`);
});

// Ruta para añadir al carrito
app.post('/add-to-cart', (req, res) => {
    const { product, price } = req.body;
    db.run(`INSERT INTO cart (product, price) VALUES (?, ?)`, [product, price], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: this.lastID });
    });
});

// Ruta para obtener el carrito
app.get('/cart', (req, res) => {
    db.all(`SELECT * FROM cart`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ cart: rows });
    });
});

// Servir archivos estáticos
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});