const router = require("express").Router();
const { Model } = require("sequelize");
const { User, Product, Set, Card } = require("../../models");

//http://localhost:3001/api/product
router.get("/", async (req, res) => {
  try {
    //product has many sets
    const dbProductData = await Product.findAll({
      include: [
        {
          model: Set,
        },
      ],
    });

    const product = dbProductData.map((product) =>
      product.get({ plain: true })
    );

    return res.render("homepage", {
      product,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//GET one product
//http://localhost:3001/api/product/:id
router.get("/:id", async (req, res) => {
  //if the user isn't logged in, redirect them to the login page
  if (!req.session.loggedIn) {
    res.redirect("/login");
  } else {
    //if the user is logged in, allow them to view the product
    try {
      const dbProductData = await Product.findByPk(req.params.id, {
        include: [
          {
            model: Set,
            attributes: ["id", "description", "set_name", "setImage_Url"],
          },
        ],
      });

      const product = productData.get({ plain: true });
      res.render("product", { product, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

//GET all sets
//http://localhost:3001/api/product/set
router.get("/set", async (req, res) => {
  try {
    //set has many cards
    const dbSetData = await Set.findAll({
      include: [
        {
          model: Card,
          attributes: [card_name, cardImage_Url],
        },
      ],
    });

    const set = dbSetData.map((set) => set.get({ plain: true }));

    res.render("homepage", {
      products,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//GET one set
//http://localhost:3001/api/product/set/:id
router.get("/set/:id", async (req, res) => {
  //if the user is not logged in, redirect them to the login page
  if (!req.session.loggedIn) {
    res.redirect("/login");
  } else {
    //if user is logged in, allow them to view/buy the set
    try {
      const dbSetData = await Set.findByPk(req.params.id, {
        include: [
          {
            model: Card,
            attributes: ["id", "description", "card_name", "cardImage_Url"],
          },
        ],
      });

      res.render("set", { set, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

//get one specific card from the set/items
//http://localhost:3001/api/product/card/:id
router.get("/card/:id", async (req, res) => {
  //if the user is not logged in, redirect them to the login page
  if (!req.session.loggedIn) {
    res.redirect("/login");
  } else {
    //if user is logged in, allow them to view/buy the set
    try {
      const cardData = await Card.findbyPk(req.params.id);

      const card = cardData.get({ plain: true });

      res.render("card", { card, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

module.exports = router;
