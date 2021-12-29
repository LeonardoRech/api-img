const mysql = require('../mysql')

exports.getProdutos = async (req, res, next) => {
    try {
        const result = await mysql.execute("SELECT * FROM produtos;")
        const response = {
            quantidade: result.lenght,
            produtos: result.map(prod => {
                return {
                    id_produto: prod.id_produto,
                    nome: prod.nome,
                    imagens_produto: prod.imagens_produto,
                    request: {
                        url: 'http://localhost:3000/produtos/' + prod.id_produto
                    }
                }
            })
        }
        return res.status(200).send(response)          
    } catch (error) {
        return res.status(500).send({ error: error})
    }
}

exports.postProduto = async (req, res, next) => {
    try {
        const query = 'INSERT INTO produtos (nome, imagens_produto) VALUES (?,?)'
        const result = await mysql.execute(query, [
            req.body.nome, 
            req.file.path
        ])

        const response = {
            mensagem: 'Produto Criado com Sucesso',
            produtoCriado: {
                id_produto: result.insertId,
                nome: req.body.nome,
                request: {
                    url: 'http://localhost:3000/produtos'
                }
            }
        }
        return res.status(201).send(response)
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}

exports.getProduto = async (req, res, next) => {
    try {
        const query = 'SELECT * FROM produtos WHERE id_produto = ?'
        const result = await mysql.execute(query, [req.params.id_produto])

        if (result.lenght == 0) {
            return res.status(404).send({
                mensagem: 'Não foi encontrado produto com este ID'
            })
        }
        const response = {
            produto: {
                id_produto: result[0].id_produto,
                nome: result[0].nome,
                imagens_produto: result[0].imagens_produto,
                request: {
                    url: 'http://localhost:3000/produtos'
                }
            }
        }
        return res.status(200).send(response)
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}

exports.updateProduto = async (req, res, next) => {
    try {
        const query = `UPDATE produtos 
                            SET nome        = ?
                        WHERE id_produto    = ?`
        await mysql.execute(query, [
            req.body.nome, 
            req.body.id_produto
        ])
        const response = {
            mensagem: 'Produto Atualizado com Sucesso',
            produtoAtualizado: {
                id_produto: req.body.id_produto,
                nome: req.body.nome,
                request: {
                    url: 'http://localhost:3000/produtos/' + req.body.id_produto
                }
            }
        }
        return res.status(202).send(response)
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}

exports.deleteProduto = async (req, res, next) => {
    try {
        const query = `DELETE from produtos WHERE id_produto = ?`
        await mysql.execute(query, [req.body.id_produto])
        const response = {
            mensagem: 'Produto removido com sucesso',
            request: {
                url: 'http://localhost:3000/produtos',
                body: {
                    nome: 'String'
                }
            }
        }
        return res.status(202).send(response)
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}

exports.postImagem = async (req, res, next) => {
    try {
        const query = 'INSERT INTO imagens_produtos (id_produto, caminho) VALUES (?,?)'
        const result = await mysql.execute(query, [
            req.params.id_produto,
            req.file.path
        ])

        const response = {
            mensagem: 'Imagem Inserida com Sucesso',
            imagemCriada: {
                id_produto: parseInt(req.params.id_produto),
                id_imagem: result.insertId,
                imagem_produto: req.file.path,
                request: {
                    url: 'http://localhost:3000/produtos/' + req.params.id_produto + '/imagens'
                }
            }
        }
        return res.status(201).send(response)
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}

exports.getImagens = async (req, res, next) => {
    try {
        const query = "SELECT * FROM imagens_produtos WHERE id_produto = ?;"
        const result = await mysql.execute(query, [req.params.id_produto])
        const response = {
            quantidade: result.lenght,
            imagens: result.map(img => {
                return {
                    id_produto: parseInt(req.params.id_produto),
                    id_imagem: img.id_imagem,
                    caminho: img.caminho,
                }
            })
        }
        return res.status(200).send(response)          
    } catch (error) {
        return res.status(500).send({ error: error})
    }
}