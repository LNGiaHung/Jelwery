module.exports = (sequelize, DataTypes) => {
    const Appointments = sequelize.define("Appointments", {
        UserID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
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
  