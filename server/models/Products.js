module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define(
    "Products",
    {
      PID: {
        type: DataTypes.STRING,
        allowNULL: false,
      },
      Name: {
        type: DataTypes.STRING,
        allowNULL: false,
      },
      Price: {
        type: DataTypes.FLOAT,
        allowNULL: false,
      },
      Material: {
        type: DataTypes.STRING,
        allowNULL: false,
      },
      Weight: {
        type: DataTypes.STRING,
        allowNULL: false,
      },
      Stone: {
        type: DataTypes.STRING,
        allowNULL: false,
      },
      Size: {
        type: DataTypes.STRING,
        allowNULL: false,
      },
      Collections: {
        type: DataTypes.STRING,
        allowNULL: true,
      },
      Image: {
        type: DataTypes.STRING,
        allowNULL: false,
      },
      Image1: {
        type: DataTypes.STRING,
        allowNULL: true,
      },
      Image2: {
        type: DataTypes.STRING,
        allowNULL: true,
      },
      Image3: {
        type: DataTypes.STRING,
        allowNULL: true,
      },
      Status: {
        type: DataTypes.STRING,
        allowNULL: false,
      },
      Quantity: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
  return Products;
};
