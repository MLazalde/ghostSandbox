const router = require('express').Router();
const userRoutes = require('./user-routes');
const productRoutes = require('./product');

//http://localhost:3001/api/user
router.use('/user', userRoutes);
//http://localhost:3001/api/product
router.use('/product', productRoutes);

module.exports = router;
