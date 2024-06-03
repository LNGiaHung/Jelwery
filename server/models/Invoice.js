module.exports = (sequelize, DataTypes) => {
  const Invoices = sequelize.define("Invoices", {
    ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    User: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    BookedDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    Price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    Employee: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: false
  });

  Invoices.associate = (models) => {
    Invoices.hasMany(models.InvoiceDetail, {
      foreignKey: 'Invoice', // The foreign key in the InvoiceDetail model that references the Invoices model
      as: 'details', // Alias for the association (optional)
    });
  };
  // Define associations
  Invoices.associate = (models) => {
    Invoices.belongsTo(models.Users, {
      foreignKey: 'User', // The foreign key in the Invoices model that references the Users model
      as: 'customer', // Alias for the association (optional)
    });
  };

  return Invoices;
};
