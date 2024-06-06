const express = require('express');
const router = express.Router();
const { Products, Category } = require('../models');
const { Sequelize, DataTypes, Op, where } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'mysql', // Use the appropriate dialect (e.g., 'mysql', 'postgres', etc.)
  host: 'localhost', //
  username: 'root',
  password: 'giahung1232003',
  database: 'jewelry'
});


router.get("/all", async (req, res) => {
  try {
    const countAll = await Products.findAndCountAll({
      include: [{ model: Category, as: 'category' }],
    });
    res.json({
      total: countAll.count,
      Products: countAll.rows
    });
  } catch (error) {
    console.error('Error fetching invoices all":', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get("/all/byCate", async (req, res) => {
  try {
    const productCounts = await Products.findAll({
      attributes: [
        'CategoryId', // Include the grouped column
        [sequelize.fn('COUNT', sequelize.col('Products.id')), 'productCount'] // Count products
      ],
      include: [{
        model: Category,
        as: 'category'
      }],
      group: ['CategoryId'] // Group by category ID
    });

    res.json(productCounts);
  } catch (error) {
    console.error('Error fetching product counts grouped by category:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post("/create", async (req, res) => {
  const {
    pid,
    name,
    price,
    material,
    weight,
    stone,
    size,
    category,
    quantity,
    image,
    image1,
    image2,
    image3,
  } = req.body;

  try {
    const product = await Products.create({
      PID: pid,
      Name: name,
      Price: price,
      Material: material,
      Weight: weight,
      Stone: stone,
      Size: size,
      CategoryId: category, // Assuming categoryId is a foreign key in the Product model
      Quantity: quantity,
      Image: image,
      Image1: image1,
      Image2: image2,
      Image3: image3,
      Status: 'Available'
    });
    res.json({ message: 'Product created successfully', product });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.put("/update", async (req, res) => {
  const { id, Name, CategoryId, Quantity } = req.body;
  try {
    const product = await Products.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: 'Invoice not found' });
    }
    product.Name = Name;
    product.CategoryId = CategoryId;
    product.Quantity = Quantity;
    await product.save();
    res.json({ message: 'Invoice updated successfully' ,product: product });
  } catch (error) {
    console.error('Error updating invoice:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete("/delete", async (req, res) => {
  const { id } = req.body;
  try {
    const cate = await Products.findByPk(id);
    if (!cate) {
      return res.status(404).json({ error: 'Invoice not found' });
    }
    cate.destroy();
    res.json({ message: 'Invoice delete successfully' });
  } catch (error) {
    console.error('Error deleting invoice:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get("/status/available", async (req, res) => {
  try {
    const soldProduct = await Products.findAndCountAll({
      where: {
        Status: 'Available',
      }
    });
    res.json({
      total: soldProduct.count,
      invoices: soldProduct.rows
    });
  } catch (error) {
    console.error('Error fetching invoices with status "Done":', error);
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

router.get("/:cate", async (req, res) => {
  try {
    const cate = req.params.type;
    const listOfProducts = await Products.findAll({ where: { Category: cate} });
    res.json(listOfProducts);
  } catch (error) {
    console.error('Error fetching all food items:', error);
    res.status(500).json({ error: 'Server error' });
  }
});



router.get("/pid/:pid", async (req, res) => {
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

router.get("/inPid/:keyWord", async (req, res) => {
  const keyword = req.params.keyWord;

  try {
    const products = await Products.findAll({
      where: {
        PID: {
          [Op.like]: `%${keyword}%`
        }
      }
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the products.' });
  }
});

router.get("/inName/:keyWord", async (req, res) => {
  const keyword = req.params.keyWord;

  try {
    const products = await Products.findAll({
      where: {
        Name: {
          [Op.like]: `%${keyword}%`
        }
      }
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the products.' });
  }
});

// khi lay gtri tu li cua html -> chuyen doi gtri thanh cac gia tri co the qeury dc
const getCategory = (Type) => {
  Type = Type.toLowerCase();
  if (Type.includes('rings') && !Type.includes('earrings')) {
    return 'ring';
  } else if (Type.includes('earrings')) {
    return 'earring';
  } else if (Type.includes('bracelets')) {
    return 'bracelet';
  } else if (Type.includes('necklaces')) {
    return 'necklace';
  } else if(Type === 'new-in'){
    return 'collections';
  }
  return null; // or you can return a default category
};

const getCollection = (Collection) =>{
  const outstanding =["Long Phụng"];
  const newC =["Heo uyên ương"];
  const wedding =["Trầu cau"];
  if(Collection==="outstanding collections"){
    return outstanding;
  } else if(Collection==="new collections"){
    return newC;
  } else if(Collection==="wedding collections"){
    return wedding;
  }
  return null;
};

const getMaterialType = (materialType) => {
  materialType=materialType.toLowerCase()
  const materialTypes = ["10k", "14k", "18k", "24k"];
  const collection = ["outstanding collections","new collections","wedding collections"];

  for (let type of materialTypes) {
    if (materialType.includes(type)) {
      return type.toUpperCase();
    }
  }
  
  for (let type of collection) {
    if (materialType.includes(type)) {
      return getCollection(materialType);
    }
  }

  return null;
};

const getStoneType = (stoneType) =>{
  stoneType=stoneType.toLowerCase()
  const stoneTypes = ["diamond","pearl","moissanite","sapphire","cubic zirconia"];

  for(let type of stoneTypes){
    if(stoneType.includes(type)){
      return type;
    }
  }

  return null;
}

// Route to get products by category and material type
router.get("/byCategory/:category/:materialType", async (req, res) => {
  try {
    const categoryName = req.params.category;
    const materialType = req.params.materialType;

    const category = getCategory(categoryName);

    if (!category) {
      return res.status(400).json({ error: 'Invalid category' });
    }

    // Validate materialType
    const validMaterialTypes = getMaterialType(materialType);
    // if (!validMaterialTypes) {
    //   return res.status(400).json({ error: 'Invalid material type' });
    // }

    // Fetch products by derived category and material type
    let products;
    if (category === 'collections') {
      products = await Products.findAll({
        where: {
          Collections: {
            [Op.in]: validMaterialTypes
          }
        }
      });
    } else if (category === 'ring') {
      products = await Products.findAll({
        where: {
          [Op.and]: [
            {
              Name: {
                [Op.like]: `%${category}%`
              }
            },
            {
              Name: {
                [Op.notLike]: '%earring%'
              }
            },
            validMaterialTypes !== null ? {
              Material: {
                [Op.like]: `%${validMaterialTypes}%`
              }
            } : {}
            // {
            //   Material: {
            //     [Op.like]: `%${validMaterialTypes}%`
            //   }
            // }
          ]
        }
      });
    } else if(category === 'necklace'){
      products = await Products.findAll({
        where: {
          [Op.and]: [
            {
              [Op.or]: [
                { Name: { [Op.like]: `%${category}%` } },
                { Name: { [Op.like]: 'Pendants' } }
              ]
            },
            validMaterialTypes !== null ? {
              Material: {
                [Op.like]: `%${validMaterialTypes}%`
              }
            } : {}
            // {
            //   Material: {
            //     [Op.like]: `%${validMaterialTypes}%`
            //   }
            // }
          ]
        }
      });
    }else {
      products = await Products.findAll({
        where: {
          [Op.and]: [
            {
              Name: {
                [Op.like]: `%${category}%`
              }
            },
            validMaterialTypes !== null ? {
              Material: {
                [Op.like]: `%${validMaterialTypes}%`
              }
            } : {}
            // {
            //   Material: {
            //     [Op.like]: `%${validMaterialTypes}%`
            //   }
            // }
          ]
        }
      });
    }

    if (products.length === 0) {
      return res.status(404).json({ error: 'No products found for this category and material type' });
    }

    res.json(products);
  } catch (error) {
    console.error('Error fetching products by category and material type:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get("/byStone/:stone", async (req, res) => {
  try {
    const stone = req.params.stone;

    const stoneType = getStoneType(stone);

    if (!stoneType) {
      return res.status(400).json({ error: 'Invalid stoneType' });
    }

    const products = await Products.findAll({
      where: { 
        // Stone: stoneType 
        Stone: {
          [Op.like]: `%${stoneType}%`
        }
      }
    });

    if (products.length > 0) {
      res.status(200).json(products);
    } else {
      res.status(404).json({ message: 'No products found with the specified stone type.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching products.', error: error.message });
  }
});

// router.get("/byCategory/:")
module.exports = router;

