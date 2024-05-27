module.exports = (sequelize, DataTypes) => {
    const WishList = sequelize.define("WishList", {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      PID: {
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
      Weight: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Material: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Size: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },{
        timestamps: false
    });
    return WishList;
  };
  