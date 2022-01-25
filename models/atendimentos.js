const res = require('express/lib/response')
const moment = require('moment')

const conexao = require('../infraestrutura/conexao')

class Atendimento {
    adiciona(atendimento, res) {
        const datacriacao = moment().format('YYYY-MM-DD HH:MM:00')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:00')

        const dataEhValida = moment(data).isSameOrAfter(datacriacao)
        const clienteEhValida = atendimento.cliente.length >= 5

        const validacoes = [
            {
                nome: 'data',
                valido: dataEhValida,
                mensagem: 'Data deve ser maio ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: clienteEhValida,
                mensagem: 'Cliente deve ter pelo menos 5 caracteres'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if (existemErros) {
            res.status(400).json(erros)
        } else {

            const atendimentoDatado = { ...atendimento, datacriacao, data }
            const sql = 'INSERT INTO atendimentos SET ?'


            conexao.query(sql, atendimentoDatado, (erro, resultados) => {
                if (erro) {
                    res.status(400).json(erro)
                } else {
                    res.status(201).json(resultados)
                }
            })
        }
    }

    listar(res){
        const sql = 'SELECT *FROM atendimentos'
        
        conexao.query(sql, (erro, resultados)=>{
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json(resultados)
            }
        })

    }

    buscaPorId(id, res){
        const sql = `SELECT *FROM atendimentos where id=${id}`

        conexao.query(sql, (erro, resultados)=>{
            const atendimento = resultados[0]
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json(atendimento)
            }
        })
    }

    alterar(id, valores, res){
        if(valores.data){
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:00')
        }
        const sql = 'UPDATE atendimentos SET ? where id=?'

        conexao.query(sql, [valores, id], (erro, resultados)=>{
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json(resultados)
            }
        })
    }
}
module.exports = new Atendimento