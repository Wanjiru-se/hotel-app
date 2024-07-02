const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'loshermanos'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected...');
    db.query('SELECT 1', (err, results) => {
        if (err) throw err;
        console.log('Connection to database verified');
    });
});

app.get('/', (req, res) => {
    return res.json('Backend is running');
});

app.post('/register', async (req, res) => {
    const { username, password, email, phoneNumber } = req.body;
    console.log('Received registration data:', { username, password, email, phoneNumber });

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = 'INSERT INTO members (username, password, email, phone_number) VALUES (?, ?, ?, ?)';
        const values = [username, hashedPassword, email, phoneNumber];

        db.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error inserting into database:', err.message);
                return res.status(500).json({ error: 'Error inserting into database', details: err.message });
            }

            console.log('Inserted new member with ID:', result.insertId);
            res.status(201).json({ id: result.insertId });
        });
    } catch (error) {
        console.error('Error hashing password:', error.message);
        res.status(500).json({ error: 'Error hashing password' });
    }
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const sql = "SELECT * FROM members WHERE username = ?";
    db.query(sql, [username], async (err, results) => {
        if (err) {
            console.error('Error authenticating user:', err);
            return res.status(500).json({ error: 'Error authenticating user' });
        }

        if (results.length > 0) {
            const user = results[0];
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (isValidPassword) {
                return res.status(200).json({ success: true, message: 'Login successful', user });
            } else {
                return res.status(401).json({ error: 'Invalid username or password' });
            }
        } else {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
    });
});

app.get('/rooms', (req, res) => {
    const sql = "SELECT * FROM rooms";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.post('/rooms', (req, res) => {
    const { type, price } = req.body;
    const sql = "INSERT INTO rooms (type, price) VALUES (?, ?)";
    db.query(sql, [type, price], (err, result) => {
        if (err) {
            console.error("Error adding room:", err);
            return res.status(500).json({ error: "Failed to add room" });
        }
        return res.status(201).json({ message: "Room added successfully", id: result.insertId });
    });
});

app.post('/reservations', (req, res) => {
    const { member_id, room_id, check_in_date, check_out_date } = req.body;

    const checkSql = `
        SELECT * FROM reservations 
        WHERE room_id = ? 
        AND (
            (? BETWEEN check_in_date AND check_out_date)
            OR
            (? BETWEEN check_in_date AND check_out_date)
            OR
            (check_in_date BETWEEN ? AND ?)
            OR
            (check_out_date BETWEEN ? AND ?)
        )
    `;

    db.query(checkSql, [room_id, check_in_date, check_out_date, check_in_date, check_out_date, check_in_date, check_out_date], (err, results) => {
        if (err) {
            console.error("Error checking for double booking:", err);
            return res.status(500).json({ error: "Failed to check for double booking" });
        }

        if (results.length > 0) {
            return res.status(400).json({ error: "Double booking detected for the selected room and dates" });
        }

        const insertSql = "INSERT INTO reservations (member_id, room_id, check_in_date, check_out_date) VALUES (?, ?, ?, ?)";
        db.query(insertSql, [member_id, room_id, check_in_date, check_out_date], (err, result) => {
            if (err) {
                console.error("Error making reservation:", err);
                return res.status(500).json({ error: "Failed to make reservation" });
            }
            return res.status(201).json({ message: "Reservation made successfully", id: result.insertId });
        });
    });
});

app.get('/reservations', (req, res) => {
    const sql = "SELECT * FROM reservations";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.put('/members/:id', (req, res) => {
    const memberId = req.params.id;
    const { username, password, email, phoneNumber } = req.body;
    const sql = "UPDATE members SET username = ?, password = ?, email = ?, phone_number = ? WHERE id = ?";
    db.query(sql, [username, password, email, phoneNumber, memberId], (err, result) => {
        if (err) return res.json(err);
        return res.json({ message: "Member updated successfully" });
    });
});

app.delete('/members/:id', (req, res) => {
    const memberId = req.params.id;
    const sql = "DELETE FROM members WHERE id = ?";
    db.query(sql, [memberId], (err, result) => {
        if (err) return res.json(err);
        return res.json({ message: "Member deleted successfully" });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
