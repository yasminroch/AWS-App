const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: '*'
}))

app.use(express.static(__dirname));



// Configuração do banco de dados
const db_config = {
    host: 'bora-oficial.cs9i1mbac1xs.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'yasmin123',
    database: 'bora-oficial'
};

// Testar conexão com o banco de dados
async function testDBConnection() {
    const connection = mysql.createConnection(db_config);

    try {
        await connection.connect();
        console.log('Database connection successful');
        await connection.end();
        return true;
    } catch (err) {
        console.error('Database connection error:', err);
        return false;
    }
}

// SELECT no banco de dados
function executeQuery(query, values = [], fetch = 'all') {
    const connection = mysql.createConnection(db_config);

    return new Promise((resolve, reject) => {
        connection.connect();
        connection.query(query, values, (err, results) => {
            if (err) {
                console.error('Query execution error:', err);
                reject(err);
            } else {
                if (fetch === 'one') {
                    resolve(results[0]);
                } else {
                    resolve(results);
                }
            }
            connection.end();
        });
    });
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello, Express.js!');
});

app.post('/add_book', async (req, res) => {
    const data = req.body;
    const query = "INSERT INTO books (name, description, value, date, category) VALUES (?, ?, ?, ?, ?)";
    const values = [data.name, data.description, data.value, data.date, data.category];

    try {
        await executeQuery(query, values);
        res.send("Book added successfully");
    } catch (err) {
        res.status(500).send("Error adding book");
    }
});

app.get('/get_books', async (req, res) => {
    const query = "SELECT * FROM books";

    try {
        const books = await executeQuery(query);
        res.json(books);
    } catch (err) {
        res.status(500).send("Error fetching books");
    }
});

app.delete('/delete_book/:id', async (req, res) => {
    const id = req.params.id;
    const query = "DELETE FROM books WHERE id = ?";

    try {
        await executeQuery(query, [id]);
        res.send("Book deleted successfully");
    } catch (err) {
        res.status(500).send("Error deleting book");
    }
});

app.put('/update_book/:id', async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const query = "UPDATE books SET name = ?, description = ?, value = ?, date = ?, category = ? WHERE id = ?";
    const values = [data.name, data.description, data.value, data.date, data.category, id];

    try {
        await executeQuery(query, values);
        res.send("Book updated successfully");
    } catch (err) {
        res.status(500).send("Error updating book");
    }
});


const port = process.env.PORT || 3000;

async function executeServer() {
    const result = await testDBConnection();
    console.log("result: " + result);

    if (result) {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } else {
        console.log("Exiting due to database connection error.");
    }
}

executeServer();


