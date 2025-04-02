//routes/api.js
const express = require('express');
const categoryController = require('../controllers/categoryController.js'); // Importa o controlador de categorias
const newsController = require('../controllers/newsController.js'); // Importa o controlador de categorias

const router = express.Router(); // Cria um roteador Express

//Rotas para categorias
router.get('/categories', categoryController.findAll); // Rota para buscar todas as categorias
router.get('/categories/:id', categoryController.findById); // Rota para buscar categoria por ID
router.post('/categories/add', categoryController.createCategory); // Rota para criar nova categoria
router.put('/categories/update/:id', categoryController.updateCategory); // Rota para atualizar categoria por ID
router.put('/categories/delete/:id', categoryController.deleteCategory); // Rota para excluir categoria por ID


//Rotas para news
router.get('/news', newsController.findAll); // Rota para buscar todas as noticias
router.get('/news/:id', newsController.findById); // Rota para buscar noticias por ID
router.post('/news/add', newsController.createNews); // Rota para criar nova noticia
router.put('/news/update/:id', newsController.updateNews); // Rota para atualizar noticias ID
router.put('/news/delete/:id', newsController.deleteNews); // Rota para excluir noticias por ID

module.exports = router; // Exporta o roteador para uso em outros arquivos