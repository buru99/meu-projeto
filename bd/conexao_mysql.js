//import modulo mysql
const mysql = require('mysql');

//CONEXAO COM DBcls

const conexao = mysql.createConnection({
    host: 'mysql.brunodev.dev.br',
    user: 'brunodev',
    password: 'bruno828099',
    database: 'brunodev'
});

//TESTE DE CONEXAO
conexao.connect(function(erro){
    if(erro) throw erro;
    console.log("conexao realizada com sucesso");
});

//EXPORTAR MÓDULO
module.exports = conexao;