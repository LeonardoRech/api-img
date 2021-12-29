const mysql = require('../mysql')

exports.deleteImagem = async (req, res, next) => {
    try {
        const query = `DELETE from imagens_produtos WHERE id_imagem = ?;`
        await mysql.execute(query, [req.params.id_imagem])
        const response = {
            mensagem: 'imagem removida com sucesso',
            request: {
                url: 'http://localhost:3000/produtos/' + req.body.id_produto + '/imagem',
                body: {
                    id_produto: 'Number',
                    imagem_produto: 'Number'
                }
            }
        }
        return res.status(202).send(response)
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}