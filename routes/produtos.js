const express = require('express')
const router = express.Router()
const mysql = require('../mysql').pool
const multer = require('multer');

const ProdutosController = require('../controllers/produtos-controller')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads')
    },
    filename: function(req, file, cb){
        let data = new Date().toISOString().replace(/:/g, '-') + '-';
        cb(null, data + file.originalname );
    }
})

const upload = multer({ storage: storage })

router.get('/', ProdutosController.getProdutos);
router.post(
    '/', 
    upload.single('imagem'), 
    ProdutosController.postProduto
);
router.get('/:id_produto', ProdutosController.getProduto)
router.patch('/', ProdutosController.updateProduto)
router.delete('/', ProdutosController.deleteProduto)

router.post(
    '/:id_produto/imagem', 
    upload.single('imagem'),
    ProdutosController.postImagem
)

router.get(
    '/:id_produto/imagens',
    ProdutosController.getImagens
)

module.exports = router