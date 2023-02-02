const { Router } = require('express');
// Importar todos los routers;
const ProductRouter= require('./products')


const router = Router();

// Configurar los routers
router.use('/products', ProductRouter);


module.exports = router;

module.exports = router;