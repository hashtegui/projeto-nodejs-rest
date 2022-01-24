const customExpress = require('./config/customExpress.js')
const conexao = require('./infraestrutura/conexao')
const Tabelas= require('./infraestrutura/tabelas')

conexao.connect((erro) => {
    if (erro) {
        console.log(erro)
    } else {
        console.log("Banco de dados iniciado com sucesso")
        app = customExpress()
        Tabelas.init(conexao)
        app.listen(3000, () => console.log("Servidor rodando na porta 3000"))
    }
})


