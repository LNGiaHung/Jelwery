const Category = require("./Category");

module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define(
    "Products",
    {
      PID: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      Material: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Weight: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Stone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Size: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      CategoryId: {  // Changed 'Category' to 'CategoryId'
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Image1: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Image2: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Image3: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Status: {
        type: DataTypes.STRING,
        allowNull: false,
        default: 'Available'
      },
      Quantity: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      Collection: {
        type: DataTypes.STRING,
        allowNull: true,
      }
    },
    {
      timestamps: false,
    }
  );

  Products.associate = (models) => {
    Products.belongsTo(models.Category, {
      foreignKey: 'CategoryId',
      as: 'category',  // Alias for the association
    });
  };

  return Products;
};
