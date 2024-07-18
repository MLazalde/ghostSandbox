const router = require('express').Router();
const { User, Product, Set, Card } = require('../../models');

// Get user profile
router.get('/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      include: [{ model: Product }, { model: Set }, { model: Card }]
    });
    if (!userData) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }
    const user = userData.get({ plain: true });
    res.render('profile', { user, title: `${user.name}'s Profile` });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Add product to user profile
router.post('/:id/products', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }
    const product = await Product.create(req.body);
    await user.addProduct(product);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Add set to user profile
router.post('/:id/sets', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }
    const set = await Set.create(req.body);
    await user.addSet(set);
    res.status(200).json(set);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Add card to user profile
router.post('/:id/cards', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }
    const card = await Card.create(req.body);
    await user.addCard(card);
    res.status(200).json(card);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
