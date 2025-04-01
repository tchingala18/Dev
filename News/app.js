//import módulos
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('node:path');
const dotenv = require('dotenv');
const api=require('./routes/api'); // Importa as rotas da API

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

//Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Rotas
app.use('/api', api); // Usa as rotas da API

//servidor
app.listen(PORT, () => {
  console.info({
    api: 'API',
    author: 'Carlitos',
    status: 'Ligado',
    version: '1.0.0',
    host: 'http://localhost'+PORT,
  });
});
