const customExpress = require('./config/customExpress.js')
const conexao = require('./infraestrutura/conexao')

conexao.connect((erro) => {
    if (erro) {
        console.log(erro)
    } else {
        console.log("Banco de dados iniciado com sucesso")
        app = customExpress()

        app.listen(3000, () => console.log("Servidor rodando na porta 3000"))
    }
})


