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
        type: DataTypes.STRING,
        allowNULL: false,
      },
      Material: {
        type: DataTypes.STRING,
        allowNULL: false,
      },
      Weight: {
        type: DataTypes.FLOAT,
        allowNULL: false,
      },
      Stone: {
        type: DataTypes.STRING,
        allowNULL: false,
      },
      Size: {
        type: DataTypes.FLOAT,
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
    },
    {
      timestamps: false,
    }
  );
  return Products;
};
