module.exports = (sequelize, DataTypes) => {
  const InvoiceDetail = sequelize.define("InvoiceDetail", {
    Invoice: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Products: {
        type: DataTypes.STRING,
        allowNull: false
    },
    UnitPrice: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    Quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },{
      timestamps: false
  });
  
  return InvoiceDetail;
};
