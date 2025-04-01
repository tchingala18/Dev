const pool = require('../config/db.js'); //configuração da bd


const Category = {
getAll: async () => {
    const [rows] = await pool.query('SELECT * FROM news WHERE deleted_at IS NULL');
    return rows;
},
getById: async (id) => {
    const [rows] = await pool.query('SELECT * FROM news WHERE deleted_at IS NULL  AND id = ?', [id]);
    return rows[0];
},
getByTitle: async (title) => {
    const [rows] = await pool.query('SELECT * FROM categories WHERE deleted_at IS NULL AND name = ?', [title]);
    return rows[0];
},
create: async (news) => {
    const [result] = await pool.query('INSERT INTO news (title, slug, content, category_id, author_id, image) VALUES (?, ?, ?, ?, ?, ?)', [title, slug, content, category_id, author_id, image]);
    return result.insertId;
},
update: async (id, news) => {
    const [result] = await pool.query('UPDATE news SET title = ?, slug = ?, content = ?, category_id = ?, author_id = ?, image = ? WHERE id = ?', [title, slug, content, category_id, author_id, image, id]);
    return result.affectedRows > 0;
},
delete: async (id) => {
    const [result] = await pool.query('UPDATE news SET deleted_at = NOW() WHERE id = ?', [id]);
    return result.affectedRows > 0;
},
};
module.exports = Category