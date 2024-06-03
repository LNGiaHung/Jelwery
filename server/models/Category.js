module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "Category",
    {
      ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      Name: {
        type: DataTypes.STRING,
        allowNULL: false,
      },
    },
    {
      timestamps: false,
    }
  );
  return Category;
};
