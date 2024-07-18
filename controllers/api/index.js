const router = require('express').Router();
// const userRoutes = require('./user-routes');
const productRoutes = require('./product');

//http://localhost:3001/api/product
router.use('/product', productRoutes);
//http://localhost:3001/api/product
// router.use('/users', userRoutes);

module.exports = router;