//routes/api.js
const express = require('express');
const categoryController = require('../controllers/categoryController.js'); // Importa o controlador de categorias

const router = express.Router(); // Cria um roteador Express

//Rotas para categorias
router.get('/categories', categoryController.findAll); // Rota para buscar todas as categorias
router.get('/categories/:id', categoryController.findById); // Rota para buscar categoria por ID
router.post('/categories/add', categoryController.createCategory); // Rota para criar nova categoria
router.put('/categories/update/:id', categoryController.updateCategory); // Rota para atualizar categoria por ID
router.put('/categories/delete/:id', categoryController.deleteCategory); // Rota para excluir categoria por ID

module.exports = router; // Exporta o roteador para uso em outros arquivos