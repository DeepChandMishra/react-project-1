const express = require('express');
const cors = require('cors');
const db = require('./db');

const myapp = express();
myapp.use(cors());
myapp.use(express.json()); 

// Show all users 
myapp.get('/api/users/all', (req, res) => {
  
    const sql = `SELECT * FROM users `;

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});




// Create user
myapp.post('/api/createUser', (req, res) => {
    const { id, name, age, phoneno, address } = req.body;
    if ( !name || !age || !phoneno || !address) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const sql = 'INSERT INTO users ( name, age, phoneno, address) VALUES ( ?, ?, ?, ?)';
    
    db.query(sql, [ name, age, phoneno, address], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'User added successfully' });
    });
});

// Search users
myapp.get('/api/users', (req, res) => {
    const searchTerm = req.query.searchTerm || '';
    const sql = `
        SELECT * FROM users 
        WHERE name LIKE ? OR age LIKE ? OR phoneno LIKE ? OR address LIKE ?`;
    const queryParams = [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`];
  
    db.query(sql, queryParams, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
  });


  
// Update users
myapp.put('/api/users/update', (req, res) => {
    const { id, name, age, phoneno, address } = req.body;

    if (!id) {
        return res.status(400).json({ error: "ID is required" });
    }

    const updates = {};
    if (name) updates.name = name;
    if (age) updates.age = age;
    if (phoneno) updates.phoneno = phoneno;
    if (address) updates.address = address;

    if (Object.keys(updates).length === 0) {
        return res.status(400).json({ error: 'At least one field must be provided for update.' });
    }

    const setClause = Object.keys(updates).map(key => `${key} = ?`).join(', ');
    const queryParams = [...Object.values(updates), id];

    const sql = `UPDATE users SET ${setClause} WHERE id = ?`;

    db.query(sql, queryParams, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'User updated successfully', results });
    });
});

// Delete users
myapp.delete('/api/users/delete', (req, res) => {
    const id = parseInt(req.body.id);

    const sql = `DELETE FROM users WHERE id = ?`;

    db.query(sql, id, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found.' });
        }
        res.json({ message: 'User deleted successfully.' });
    });
});

myapp.listen(4000, () => {
    console.log("Server is running on port 4000");
});
