const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoriesData = await Category.findAll({
      attributes: ['id', 'category_name'],
      include: [{ model: Product }]
    });
    res.status(200).json(categoriesData)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    })

    if (!category) {
      res.status(404).json({ message: 'No category found with that id' })
      return;
    }

    res.status(200).json(category);
  } catch (err) {
    console.log(err);
    res.status(500).json(err)
  }
});

router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  })
    .then(category => res.json(category))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id
    },
  })
    .then(category => res.json(category))
});

router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!category) {
      res.status(404).json({ message: 'No category was found with this id' })
      return;
    }

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
