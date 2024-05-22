// models/Cart.js
module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define("Cart", {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Price: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },{
        timestamps: false
    })
    return Cart;
  };
  