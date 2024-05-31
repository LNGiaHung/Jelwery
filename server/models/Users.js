module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
    {
      FirstName: {
        type: DataTypes.STRING,
        allowNULL: false,
      },
      LastName: {
        type: DataTypes.STRING,
        allowNULL: false,
      },
      Mail: {
        type: DataTypes.STRING,
        allowNULL: false,
        unique: true,
      },
      DOB: {
        type: DataTypes.DATE,
        allowNULL: true,
      },
      Password: {
        type: DataTypes.STRING,
        allowNULL: false,
      },
      Gender: {
        type: DataTypes.STRING,
        allowNULL: false,
      },
      RelationshipStatus: {
        type: DataTypes.STRING,
        allowNULL: false,
      },
      Verify: {
        type: DataTypes.BOOLEAN,
        allowNULL: true,
        defaultValue: false,
      },
      Role: {
        type: DataTypes.STRING,
        allowNULL: true,
        defaultValue: "customer",
      },
    },
    {
      timestamps: false,
    }
  );
  return Users;
};
