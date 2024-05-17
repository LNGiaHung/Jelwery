module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define("Products", {
    PID:{
      type: DataTypes.STRING,
      allowNULL: false
    },
    Name:{
        type: DataTypes.STRING,
        allowNULL: false
    },
    Price:{
        type: DataTypes.STRING,
        allowNULL: false
    },
    // Category:{
    //     type: DataTypes.STRING,
    //     allowNULL: false
    // },
    // Stone:{
    //     type: DataTypes.DATE,
    //     allowNULL: true
    // },
    Image:{
        type: DataTypes.STRING,
        allowNULL: false
    },
  },{
      timestamps: false
  })
  return Products;
  
}
