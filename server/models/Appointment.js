module.exports = (sequelize, DataTypes) => {
    const Appointments = sequelize.define("Appointments", {
        User: {
            type: DataTypes.STRING,
            allowNull: false,
        },
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
  