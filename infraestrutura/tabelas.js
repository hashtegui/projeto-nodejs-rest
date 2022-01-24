const e = require("express")

class Tabelas{
    init(conexao){
        this.conexao = conexao
        this.criarAtendimento()
    }

    criarAtendimento(){
        const sql = 'CREATE TABLE if not exists atendimentos (id int not null auto_increment, cliente varchar(50)not null, pet varchar(20), servico varchar(20) not null, status varchar(20) not null, observacoes text, data datetime not null, datacriacao datetime not null,primary key(id))'

        this.conexao.query(sql, (erro)=>{
            if(erro){
                console.log(erro)
            }else{
                console.log("Tabela atendimento criada")
            }
        })
    }
}

module.exports = new Tabelas