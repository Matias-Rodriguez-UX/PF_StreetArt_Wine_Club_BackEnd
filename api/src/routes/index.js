const { Router } = require('express');
// Importar todos los routers;
const ProductRouter= require('./products')
const GrapeRouter= require('./grapes')
const StateRouter= require('./states')
const RegionRouter= require('./regions')
const TypeRouter= require('./types')
const UserRouter= require('./users')

const router = Router();

// Configurar los routers
router.use('/products', ProductRouter);
router.use('/grapes', GrapeRouter);
router.use('/states', StateRouter);
router.use('/regions', RegionRouter);
router.use('/types', TypeRouter);
router.use('/users', UserRouter);

module.exports = router;

module.exports = router;