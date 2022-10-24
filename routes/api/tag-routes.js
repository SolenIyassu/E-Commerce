const router = require("express").Router();
const { Tag, Product, ProductTag, Category } = require("../../models");
const { findAll } = require("../../models/ProductTag");

// The `/api/tags` endpoint

router.get(
  "/",
  async (req, res) => {
    // find all tags
    const tagData = await Tag.findAll({
      include: [{ model: Product, though: ProductTag }],
    });
    console.log(tagData);
    res.status(200).json(tagData);
  }
  // be sure to include its associated Product data
);

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // try {
  const tagData = await Tag.findByPk(req.params.id, {
    // include:[{model: Product, through ProductTag, as: ''}]
    include: [{ model: Product, though: ProductTag }],
  });
  if (!tagData) {
    res.status(404).json({ message: "No product was found with this id!" });
    return;
  }

  res.status(200).json(tagData);
  // be sure to include its associated Product data
  // } catch (error) {
});

router.post("/", async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value

  const tag = await Tag.update(
    { tag_id: req.params.id },
    {
      where: {
        name: req.params.id,
      },
    }
  );
});

router.delete("/:id", async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tagData) {
      res.status(404).json({ message: "No location found with this id!" });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
