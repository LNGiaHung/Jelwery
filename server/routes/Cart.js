const express = require("express");
const router = express.Router();
const { Cart } = require("../models");

// Route to get all cart items
router.get("/cart-items", async (req, res) => {
  try {
    const cartItems = await Cart.findAll();
    res.status(200).json({ cartItems });
  } catch (error) {
    console.error("Error getting cart items:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to add a cart item or update quantity if item already exists
router.get('/cart', async (req, res) => {
    try {
      const { username, PID, Name, Price, Image, Weight, Material, Size, Quantity } = req.query;
  
      if (!username || !PID || !Name || !Price || !Image || !Weight || !Material || !Size || !Quantity) {
        return res.status(400).json({ message: 'Missing required parameters' });
      }
  
      // Check if the item already exists in the user's cart
      const existingCartItem = await Cart.findOne({ where: { username: username, PID: PID } });
  
      if (existingCartItem) {
        // If the item exists, update its quantity
        existingCartItem.Quantity += parseInt(Quantity); // Increase the quantity
        await existingCartItem.save();
        res.status(200).json({ message: 'Cart item quantity updated successfully', cartItem: existingCartItem });
      } else {
        // If the item does not exist, create a new cart item
        const newCartItem = await Cart.create({
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
        res.status(200).json({ message: 'New cart item added successfully', cartItem: newCartItem });
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
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

// Route to delete a cart item
router.delete("/cart-items/:pid", async (req, res) => {
    try {
        const { pid } = req.params;

        // Check if the PID parameter is provided
        if (!pid) {
            return res.status(400).json({ message: "Missing required parameter: pid" });
        }

        // Find the cart item by PID in the database
        const cartItem = await Cart.findOne({ where: { PID: pid } });

        // Check if the cart item exists
        if (!cartItem) {
            return res.status(404).json({ message: "Cart item not found" });
        }

        // Delete the cart item from the database
        await cartItem.destroy();

        // Respond with a success message
        res.status(200).json({ message: "Cart item deleted successfully" });
    } catch (error) {
        // Handle errors
        console.error("Error deleting cart item:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
