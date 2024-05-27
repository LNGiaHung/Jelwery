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
  


// // Route to add a cart item
// router.post("/cart-items", async (req, res) => {
//   try {
//     const { username, Name, Price, Image, Quantity } = req.body;

//     if (!username || !Name || !Price || !Image || !Quantity) {
//       return res.status(400).json({ message: "Missing required parameters" });
//     }

//     const newCartItem = await Cart.create({
//       username,
//       Name,
//       Price,
//       Image,
//       Quantity,
//     });

//     res.status(201).json({ cartItem: newCartItem });
//   } catch (error) {
//     console.error("Error adding item to cart:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// // Route to update a cart item's quantity
// router.put("/cart-items/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { Quantity } = req.body;

//     if (!id || !Quantity) {
//       return res.status(400).json({ message: "Missing required parameters" });
//     }

//     const cartItem = await Cart.findByPk(id);

//     if (!cartItem) {
//       return res.status(404).json({ message: "Cart item not found" });
//     }

//     cartItem.Quantity = Quantity;
//     await cartItem.save();

//     res.status(200).json({ message: "Cart item updated successfully", cartItem });
//   } catch (error) {
//     console.error("Error updating cart item:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// // Route to delete a cart item
// router.delete("/cart-items/:id", async (req, res) => {
//   try {
//     const { id } = req.params;

//     if (!id) {
//       return res.status(400).json({ message: "Missing required parameter: id" });
//     }

//     const cartItem = await Cart.findByPk(id);

//     if (!cartItem) {
//       return res.status(404).json({ message: "Cart item not found" });
//     }

//     await cartItem.destroy();

//     res.status(200).json({ message: "Cart item deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting cart item:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

module.exports = router;
