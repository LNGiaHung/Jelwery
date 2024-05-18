const express = require('express');
const router = express.Router();
const { Products } = require('../models');
const { Sequelize, DataTypes, Op } = require('sequelize');


// Route to get product items by type
router.get('/byType/:type', async (req, res) => {
  try {
    const foodType = req.params.type;
    // Find the FoodType record by TypeName
    const typeRecord = await FoodType.findOne({ where: { TypeName: foodType } });

    if (!typeRecord) {
      return res.status(404).json({ error: 'Food type not found' });
    }

    // Find all food items with the matching FoodTypeID
    const foods = await Food.findAll({ where: { FoodTypeID: typeRecord.id } });

    res.json(foods);
  } catch (error) {
    console.error('Error fetching food by type:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Your existing routes for getting all food items, creating new food items, and getting a single food item by ID can remain unchanged.
// Route to get all products
router.get("/", async (req, res) => {
  try {
    const listOfProducts = await Products.findAll();
    res.json(listOfProducts);
  } catch (error) {
    console.error('Error fetching all food items:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route to create a new product
router.post("/", async (req, res) => {
  try {
    const food = req.body;
    await Food.create(food);
    res.json(food);
  } catch (error) {
    console.error('Error creating new food item:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// // Route to get a single product by ID
// router.get("/:id", async (req, res) => {
//   try {
//       const foodId = req.params.id;
//       const food = await Food.findByPk(foodId);
//       if (!food) {
//           return res.status(404).json({ error: "Food not found" });
//       }
//       res.json(food);
//   } catch (error) {
//       console.error('Error fetching food by ID:', error);
//       res.status(500).json({ error: 'Server error' });
//   }
// });

router.get("/:pid", async (req, res) => {
  try {
    const productId = req.params.pid;
    console.log('Received PID:', productId); // Logging the received PID

    const product = await Products.findOne({ where: { PID: productId } });
    console.log('Queried Product:', product); // Logging the queried product

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product by PID:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

const getCategory = (name) => {
  name = name.toLowerCase();
  if (name === 'rings') {
    return 'ring';
  } else if (name === 'earings') {
    return 'earing';
  } else if (name === 'bracelets') {
    return 'bracelet';
  } else if (name === 'necklaces') {
    return 'necklace';
  }
  return null; // or you can return a default category
};

router.get("/byCategory/:category", async (req, res) => {
  try {
    const categoryName = req.params.category;
    const category = getCategory(categoryName);

    if (!category) {
      return res.status(400).json({ error: 'Invalid category' });
    }

    // Fetch products by derived category

    if (categoryName === 'rings') {
      products = await Products.findAll({
        where: {
          Name: {
            [Sequelize.Op.and]: [
              {
                [Sequelize.Op.like]: `%${category}%`
              },
              {
                [Sequelize.Op.notLike]: '%earing%'
              }
            ]
          }
        }
      });
    } else {
      products = await Products.findAll({
        where: {
          Name: {
            [Sequelize.Op.like]: `%${category}%`
          }
        }
      });
    }

    if (products.length === 0) {
      return res.status(404).json({ error: 'No products found for this category' });
    }

    res.json(products);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;
