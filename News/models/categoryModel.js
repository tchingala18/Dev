const pool = require('../config/db.js'); //configuração da bd


const Category = {
getAll: async () => {
    const [rows] = await pool.query('SELECT * FROM categories WHERE deleted_at IS NULL');
    return rows;
},
getById: async (id) => {
    const [rows] = await pool.query('SELECT * FROM categories WHERE deleted_at IS NULL  AND id = ?', [id]);
    return rows[0];
},
getByName: async (name) => {
    const [rows] = await pool.query('SELECT * FROM categories WHERE deleted_at IS NULL AND name = ?', [name]);
    return rows[0];
},
create: async (category) => {
    const [result] = await pool.query('INSERT INTO categories (name, slug) VALUES (?, ?)', [name, slug]);
    return result.insertId;
},
update: async (id, category) => {
    const [result] = await pool.query('UPDATE categories SET name = ?, slug = ? WHERE id = ?', [name, slug, id]);
    return result.affectedRows > 0;
},
delete: async (id) => {
    const [result] = await pool.query('UPDATE categories SET deleted_at = NOW() WHERE id = ?', [id]);
    return result.affectedRows > 0;
},
};
module.exports = Category