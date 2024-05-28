const express = require("express");
const router = express.Router();
const { WishList } = require("../models");

// Route to get all WishList items
router.get("/wishlist-items", async (req, res) => {
  try {
    const WishListItems = await WishList.findAll();
    res.status(200).json({ WishListItems });
  } catch (error) {
    console.error("Error getting WishList items:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to add a WishList item or update quantity if item already exists
router.get('/wishlist', async (req, res) => {
    try {
      const { username, PID, Name, Price, Image, Weight, Material, Size, Quantity } = req.query;
  
      if (!username || !PID || !Name || !Price || !Image || !Weight || !Material || !Size || !Quantity) {
        return res.status(400).json({ message: 'Missing required parameters' });
      }
  
      // Check if the item already exists in the user's WishList
      const existingWishListItem = await WishList.findOne({ where: { username: username, PID: PID } });
  
      if (existingWishListItem) {
        // If the item exists, update its quantity
        existingWishListItem.Quantity = 1; // Always 1
        await existingWishListItem.save();
        res.status(200).json({ message: 'WishList item quantity updated successfully', WishListItem: existingWishListItem });
      } else {
        // If the item does not exist, create a new WishList item
        const newWishListItem = await WishList.create({
          username,
          PID,
          Name,
          Price,
          Image,
          Weight,
          Material,
          Size,
          Quantity,
        });
        res.status(200).json({ message: 'New WishList item added successfully', WishListItem: newWishListItem });
      }
    } catch (error) {
      console.error('Error adding item to WishList:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
// Route to delete a wishlist item
router.delete("/wishlist-items/:pid", async (req, res) => {
    try {
        const { pid } = req.params;

        // Check if the PID parameter is provided
        if (!pid) {
            return res.status(400).json({ message: "Missing required parameter: pid" });
        }

        // Find the wishlist item by PID in the database
        const wishListItem = await WishList.findOne({ where: { PID: pid } });

        // Check if the wishlist item exists
        if (!wishListItem) {
            return res.status(404).json({ message: "Wishlist item not found" });
        }

        // Delete the wishlist item from the database
        await wishListItem.destroy();

        // Respond with a success message
        res.status(200).json({ message: "Wishlist item deleted successfully" });
    } catch (error) {
        // Handle errors
        console.error("Error deleting wishlist item:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
