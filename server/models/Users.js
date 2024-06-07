module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
    {
      CID: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      FirstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      LastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Mail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      DOB: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      Password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Gender: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "unknow"
      },
      RelationshipStatus: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "unknow"
      },
      Phone: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "unknow"
      },
      Address: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "unknow"
      },
      Verify: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: false,
      },
      Role: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "customer",
      },
    },
    {
      timestamps: false,
    }
  );

  // Assuming you have an Invoices model defined elsewhere
  // Replace 'models.Invoices' with the actual model name if needed
  Users.associate = (models) => {
    Users.hasMany(models.Invoices, {
      foreignKey: 'User', // The foreign key in the Invoices model that references the Users model
      as: 'invoices', // Alias for the association (optional)
    });
  };

  return Users;
};
