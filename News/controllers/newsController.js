const News = require('../models/newsModel.js'); // Importa o modelo de notícias

const newController = {
    findAll: async (req, res) => {
        try {
            const news = await News.getAll(); // Chama o método getAll do modelo
            res.status(200).json({ status: 200, message: "Sucesso", noticias: news }); // Retorna as notícias como resposta JSON
        } catch (error) {
            res.status(500).json({ status: 500, message: 'Erro ao buscar notícias: ' + error }); // Retorna erro em caso de falha
        }
    },
    findById: async (req, res) => {
        try {
            const news = await News.getById(req.params.id); // Chama o método getById do modelo
            news ? res.status(200).json({ status: 200, message: "Notícia encontrada", noticia: newsItem }) :
                res.status(400).json({ status: 400, message: "Notícia não encontrada" }); // Retorna a notícia ou erro 404
        } catch (error) {
            res.status(500).json({ status: 500, message: 'Erro ao buscar notícia: ' + error }); // Retorna erro em caso de falha
        }
    },
    createNews: async (req, res) => {
        try {
            const { title, slug, content, category_id, author_id, image } = req.body; // Extrai os dados do corpo da requisição
            const existingNews = await News.getBySlug(slug); // Verifica se a notícia já existe pelo slug
            if (existingNews) {
                return res.status(400).json({ status: 400, message: 'Notícia já cadastrada com este slug' }); // Retorna erro 400 se o slug já existir
            }
            const id = await News.create({ title, slug, content, category_id, author_id, image }); // Chama o método create do modelo
            res.status(200).json({ status: 200, message: 'Notícia criada com sucesso', id, title, slug }); // Retorna sucesso e o ID da nova notícia
        } catch (error) {
            res.status(500).json({ status: 500, message: 'Erro ao criar notícia: ' + error }); // Retorna erro em caso de falha
        }
    },
    updateNews: async (req, res) => {
        try {
            const { title, slug, content, category_id, author_id, image } = req.body; // Extrai os dados do corpo da requisição
            const result = await News.update(req.params.id, { title, slug, content, category_id, author_id, image }); // Chama o método update do modelo
            if (result) {
                res.status(200).json({ status: 200, message: 'Notícia atualizada com sucesso' }); // Retorna sucesso
            } else {
                res.status(400).json({ status: 400, message: 'Notícia não encontrada ou nenhuma alteração feita' }); // Retorna erro 400 se a notícia não existir
            }
        } catch (error) {
            res.status(500).json({ status: 500, message: 'Erro ao atualizar notícia: ' + error }); // Retorna erro em caso de falha
        }
    },
    deleteNews: async (req, res) => {
        try {
            const result = await News.delete(req.params.id); // Chama o método delete do modelo
            if (result) {
                res.status(200).json({ status: 200, message: 'Notícia excluída com sucesso' }); // Retorna sucesso
            } else {
                res.status(400).json({ status: 400, message: 'Notícia não encontrada' }); // Retorna erro 404 se a notícia não existir
            }
        } catch (error) {
            res.status(500).json({ status: 500, message: 'Erro ao excluir notícia: ' + error }); // Retorna erro em caso de falha
        }
    }
};

module.exports = newController;