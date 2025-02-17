const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

// Initialize Express App
const app = express();
const PORT = 8080; // Changed port to 8080

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Initialize SQLite Database
const db = new sqlite3.Database('./leaderboard.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite database');
    }
});

// Create Scores Table
db.run(`
    CREATE TABLE IF NOT EXISTS scores (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        score INTEGER NOT NULL
    )
`);

// Add a Player's Score & Return Updated Leaderboard
app.post('/add-score', (req, res) => {
    const { name, score } = req.body;
    if (!name || score === undefined) {
        return res.status(400).json({ error: 'Name and score are required.' });
    }
    db.run(
        `INSERT INTO scores (name, score) VALUES (?, ?)`,
        [name, score],
        function (err) {
            if (err) {
                res.status(500).json({ error: 'Failed to save score.' });
            } else {
                // Fetch updated leaderboard after inserting score
                db.all(`SELECT name, score FROM scores ORDER BY score DESC LIMIT 10`, [], (err, rows) => {
                    if (err) {
                        res.status(500).json({ error: 'Failed to retrieve updated leaderboard.' });
                    } else {
                        res.json({ success: true, leaderboard: rows });
                    }
                });
            }
        }
    );
});


// Get Leaderboard
app.get('/leaderboard', (req, res) => {
    db.all(`SELECT name, score FROM scores ORDER BY score DESC LIMIT 10`, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: 'Failed to retrieve leaderboard.' });
        } else {
            res.json(rows);
        }
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
