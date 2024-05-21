module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Products",
    {
      Name: {
        type: DataTypes.STRING,
        allowNULL: false,
      },
      Type: {
        type: DataTypes.STRING,
        allowNULL: false,
      },
      Mail: {
        type: DataTypes.STRING,
        allowNULL: false,
      },
      DOB: {
        type: DataTypes.DATE,
        allowNULL: true,
      },
      Password: {
        type: DataTypes.STRING,
        allowNULL: false,
      },
    },
    {
      timestamps: false,
    }
  );
  return Users;
};
