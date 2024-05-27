module.exports = (sequelize, DataTypes) => {
    const Appointments = sequelize.define("Appointments", {
<<<<<<< HEAD
        User: {
            type: DataTypes.STRING,
            allowNull: false,
        },
=======
>>>>>>> 2cdeff876bf9b9ddd422f93bfb86075073870b36
        FirstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        LastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Mail: {
            type: DataTypes.STRING,
            allowNull: false
        },
        BookedDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        Interest: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        timestamps: false
    });
    return Appointments;
};
  