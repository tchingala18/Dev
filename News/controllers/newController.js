const news = require('../models/newsModel'); // Importa o modelo de notícias


const newsController = {
    findAll: async (req, res) => { // Método para buscar todas as notícias
        try {
            const newsList = await news.getAll(); // Chama o método getAll do modelo
            res.status(200).json({status:200,message: "Sucess",noticias:newsList}); // Retorna as notícias como resposta JSON 
        } catch (error) {
            res.status(500).json({ status:500, message:'Erro ao buscar notícias' + error }); // Retorna erro em caso de falha
        }
    },
    findById: async (req, res)=>{
try{
    const news = await news.getById(req.params.id); // Chama o método getById do modelo
    category ? res.status(200).json({status:200,message: "Categoria encontrada",categoria:category}) : 
    res.status(404).json({status:404,message:"Categoria não encontrada"}); // Retorna a categoria ou erro 404
} catch (error) {
    res.status(500).json({ status:500, message:'Erro ao buscar categoria' + error }); // Retorna erro em caso de falha
    }
    },
    createNews: async (req, res) => {
        try {
            const {title, slug, content, category_id, author_id, image} = req.body; // Extrai os dados do corpo da requisição
            const existeCategory = await Category.getByTitle(name); // Verifica se a categoria já existe
            if (existeCategory) {
                return res.status(400).json({ status:400, message:'Categoria já cadastrada' }); // Retorna erro 409 se a categoria já existir
            }
            const id = await Category.create({ title, slug, content, category_id, author_id, image }); // Chama o método create do modelo
            res.status(200).json({ status:200, message:'Categoria criada com sucesso', id, name, slug }); // Retorna sucesso e o ID da nova categoria
        } catch (error) {
            res.status(500).json({ status:500, message:'Erro ao criar categoria' + error }); // Retorna erro em caso de falha
        }
    },
    updateCategory: async (req, res) => {
       try{
        const {name, slug} = req.body; // Extrai os dados do corpo da requisição
        const result = await Category.update(req.params.id, { name, slug }); // Chama o método update do modelo
        if (result) {
            res.status(200).json({ status:200, message:'Categoria atualizada com sucesso' }); // Retorna sucesso
        } else {
            res.status(400).json({ status:400, message:'Categoria não encontrada ou nenhuma alteração feita' }); // Retorna erro 404 se a categoria não existir
        }
       }catch (error) {
        res.status(500).json({ status:500, message:'Erro ao atualizar categoria' + error }); // Retorna erro em caso de falha
       }
    },
    deleteCategory: async (req, res) => {
        try {
            const result = await Category.delete(req.params.id); // Chama o método delete do modelo
            if (result) {
                res.status(200).json({ status:200, message:'Categoria excluída com sucesso' }); // Retorna sucesso
            } else {
                res.status(404).json({ status:404, message:'Categoria não encontrada' }); // Retorna erro 404 se a categoria não existir
            }
        } catch (error) {
            res.status(500).json({ status:500, message:'Erro ao excluir categoria' + error }); // Retorna erro em caso de falha
        }
    }

};

module.exports = categoryController;