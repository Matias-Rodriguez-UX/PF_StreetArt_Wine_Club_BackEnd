const { Router } = require('express');
// Importar todos los routers;
const ProductRouter= require('./products')
const GrapeRouter= require('./grapes')


const router = Router();

// Configurar los routers
router.use('/products', ProductRouter);
router.use('/grapes', GrapeRouter);

module.exports = router;

module.exports = router;