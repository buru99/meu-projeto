// Importar módulo express
const express = require('express');

// Importar módulo fileupload
const fileupload = require('express-fileupload');

// Importar módulo express-handlebars
const exphbs = require('express-handlebars');

// Importar módulo de rotas
const rota_produto = require('./rotas/produtos_rota');

const conexao = require('./bd/conexao_mysql');

// Path
const path = require('path');

// App
const app = express();

app.use(function (req, res, next) {
  res.setHeader('Cache-Control', 'no-store');
  next();
});


// Habilitando o upload de arquivos
app.use(fileupload());

// Adicionar CSS
app.use('/css', express.static('./css'));

// Refereniar a pasta de imagens
app.use('/imagens', express.static('./imagens'));

const session = require('express-session');

app.use(session({
    secret: 'seu-segredo', // Mude para algo mais seguro em produção
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true } // Mude para true se você estiver usando HTTPS
}));

// Configuração do express-handlebars
app.engine('handlebars', exphbs({
  helpers: {
    // Função auxiliar para verificar igualdade
    condicionalIgualdade: function (parametro1, parametro2, options) {
      return parametro1 === parametro2 ? options.fn(this) : options.inverse(this);
    }
  }
}));
app.set('view engine', 'handlebars');

// Configure o caminho da pasta de visualizações usando o método app.set
app.set('views', path.join(__dirname, 'views'));

app.get('/cardapio', function(req, res){
  // SQL
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.setHeader('Expires', '0');
  res.setHeader('Pragma', 'no-cache');
  
  let sql = `SELECT * FROM produtos ORDER BY CASE WHEN categoria ='Hamburguers' THEN 1 WHEN categoria = 'Bebidas' THEN 2 END`;

  
  // EXECUTAR COMANDO SQL
  conexao.query(sql, function(erro, retorno){
      if (erro) throw erro;

      // Filtrar produtos por categoria
      const hamburgueres = retorno.filter(produto => produto.categoria === 'Hamburguers');
      const bebidas = retorno.filter(produto => produto.categoria === 'Bebidas');

      // Renderizar com produtos separados
      res.render('cardapio', { hamburgueres: hamburgueres, bebidas: bebidas, exibirMenu: false, bodyClass: false });
  });
});


//ROTA PARA PRODUTOS OCULTADOS DA LISTA
app.get('/listar/ocultos', function(req, res){
  //SQL
  let sql = 'SELECT * FROM produtos WHERE visivel = 0';
  
  //EXECUTAR COMANDO SQL
  conexao.query(sql, function(erro, retorno){
      res.render('ocultos', {produtos:retorno, exibirMenu: true , bodyClass: 'flex h-screen'});
  });
});


// Manipulação de dados via rotas
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Rotas
app.use('/', rota_produto);

// Servidor
app.listen(21140);