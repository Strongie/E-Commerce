const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include:{
        model: Product,
        attributes: ['id', 'product_name', 'price', 'category_id']
    }
  })
  .then((categoryData) => {
    res.json(categoryData);
  })
  .catch((err) => res.json(err));
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products

   Category.findOne(
      {
     where: { 
          id: req.params.id
        },
        include:{
          model: Product,
          attributes: ['id', 'product_name', 'price', 'category_id']
      }

      }
    ).then((categoryData) => {
      res.json(categoryData);
    })
    .catch((err) => res.json(err));
  });


router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value

  Category.update(
    {
      // All the fields you can update and the data attached to the request body.
      title: req.body.title,
      author: req.body.author,
      isbn: req.body.isbn,
      pages: req.body.pages,
      edition: req.body.edition,
      is_paperback: req.body.is_paperback,
    },
    {
     
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedCategory) => {
      // Sends the updated book as a json response
      res.json(updatedCategory);
    })
    .catch((err) => res.json(err));
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
