const router = require('express').Router();
const { Product, Set } = require('../../models');

// Get all products
//http://localhost:3001/api/
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{ model: Set }]
    });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
