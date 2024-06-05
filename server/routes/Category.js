const express = require('express');
const router = express.Router();
const { Category } = require('../models'); // Ensure these are the correct model names
const { Op } = require('sequelize');


// Get all invoices
router.get("/", async (req, res) => {
  try {
    const allCategory = await Category.findAndCountAll();
    res.json({
      total: allCategory.count,
      invoices: allCategory.rows
    });
  } catch (error) {
    console.error('Error fetching invoices with status "Done":', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.put("/update", async (req, res) => {
  const { id, name } = req.body;
  try {
    const cate = await Category.findByPk(id);
    if (!cate) {
      return res.status(404).json({ error: 'Invoice not found' });
    }
    cate.Name = name;
    await cate.save();
    res.json({ message: 'Invoice updated successfully' });
  } catch (error) {
    console.error('Error updating invoice:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete("/delete", async (req, res) => {
  const { id } = req.body;
  try {
    const cate = await Category.findByPk(id);
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

router.post("/create", async (req, res) => {
  const { name } = req.body;
  try {
    const cate = await Category.create({ Name: name });
    res.json({ message: 'Category created successfully', category: cate });
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
