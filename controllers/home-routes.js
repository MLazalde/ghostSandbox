const router = require('express').Router();
const { User, Product, Set, Card } = require('../models');

// Home route to render homepage
//http://localhost:3001/
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({
      include: [{ model: Product }, { model: Set }, { model: Card }]
    });
    const users = userData.map(user => user.get({ plain: true }));

    res.render('homepage', {
      users,
      title: 'Home Page'
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to render user profile
//http://localhost:3001/profile/:id
router.get('/profile/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      include: [{ model: Product }, { model: Set }, { model: Card }]
    });

    if (!userData) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }

    const user = userData.get({ plain: true });

    res.render('profile', {
      user,
      title: `${user.name}'s Profile`
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
