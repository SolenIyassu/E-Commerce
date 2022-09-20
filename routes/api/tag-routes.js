const router = require("express").Router();
const { Tag, Product, ProductTag, Category } = require("../../models");
const { findAll } = require("../../models/ProductTag");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  // find all tags
  try {
    const productData = Tag.findAll();
    res.status(200).json(productData);
  } catch (error) {
    res.status(500).json(err);
  }
  // be sure to include its associated Product data
});

router.get("/:id", (req, res) => {
  // find a single tag by its `id`
  try {
    const productData = Tag.findByPk(req.params.id, {
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

    res.status(200).json(productData);
    // be sure to include its associated Product data
  } catch (error) {
    res.status(500).json(err);
  }
});

router.post("/", (req, res) => {
  // create a new tag
  try {
    const productData = Tag.create(req.body);
    res.status(200).json(productData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
  const tag = Tag.findOne({ where: { tag_id: "John" } });

  Tag.update(
    { tag_id: req.params.id },
    {
      where: {
        name: req.params.id,
      },
    }
  );
});

router.delete("/:id", (req, res) => {
  try {
    const product = Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!productData) {
      res.status(404).json({ message: "No location found with this id!" });
      return;
    }

    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
