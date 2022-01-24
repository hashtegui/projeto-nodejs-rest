module.exports = app => {
    app.get('/atendimentos', (req, res) =>
        res.send('Você está na rota de atendimentos e está realizando um GET'))

    app.post('/atendimentos', (req, res) => res.send('Vocês está na rota de atendimentos e está usando o POST'))

}