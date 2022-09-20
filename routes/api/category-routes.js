const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  // find all categories
  // be sure to include its associated Products try {
  Category.findAll({
    include: [Product],
  })
    .then((categories) => res.json(categories))
    .then((err) => res.status(500).json(err));
  // try {
  //   const categoryData = Category.findAll();
  //   res.status(200).json(categoryData);
  // } catch (error) {
  //   res.status(500).json(error);
  // }
});

router.get("/:id", (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = Category.findByPk(req.params.id, {
      // include:[{model: Product, through ProductTag, as: ''}]
      include: [
        { model: Product },
        { model: ProductTag },
        { model: Category },
        { model: Tag },
      ],
    });
    if (!productData) {
      res.status(404).json({ message: "No product was found with this id!" });
      return;
    }

    res.status(200).json(categoryData);
    // be sure to include its associated Product data
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", (req, res) => {
  // create a new category
  try {
    const productData = Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(error);
  }
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value try {
  try {
    const product = Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData) {
      res.status(404).json({ message: "No category found with this id!" });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
