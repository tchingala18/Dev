const express = require('express');
const axios = require('axios');
const { basename } = require('path');
const API_URL = 'http://localhost:3000/api'; // URL da API
const router = express.Router();

const api=axios.create({
    baseURL: API_URL,
    headers: {'Content-Type': 'application/json'},
    timeout: 5000,
});

router.get('/', async (req, res) => {
    //if(!req.session.user){ 
    //return res.redirect('/login'); // Redireciona para a página inicial se não estiver logado    
    //}
res.render('admin/dashboard', {user:req.session.user});// Renderiza a página inicial do admin    
});

module.exports = router;