const pool = require('../config/db');
//const bcrypt = require('bcryptjs');

const Author = {
    getAll: async () => {
        const [rows] = await pool.query('SELECT * FROM author WHERE deleted_at IS NULL');
        return rows;
    },
    getById: async (id) => {
        const [rows] = await pool.query('SELECT * FROM author WHERE id = ? AND deleted_at IS NULL', [id]);
        return rows[0];
    },
    getByEmail: async (name) => {
        const [rows] = await pool.query('SELECT * FROM author WHERE name = ? AND deleted_at IS NULL', [name]);
        return rows[0];
    },
    create: async (name, nationality) => {
        const [result] = await pool.query('INSERT INTO author (name, nationality) VALUES (?, ?)', [name, nationality]);
        return result.insertId;
    },
    update: async (id, name, nationality) => {
        const [result] = await pool.query('UPDATE author SET name = ?, nationality = ? WHERE id = ? AND deleted_at IS NULL', [name, nationality, id]);
        return result.affectedRows;
    },
    delete: async (id) => {
        const [result] = await pool.query('UPDATE author SET deleted_at = NOW() WHERE id = ?', [id]);
        return result.affectedRows;
    }
};

module.exports = Author;