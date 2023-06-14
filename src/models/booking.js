const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


const Booking = sequelize.define('bookings', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    pickup_location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fare: {
        type: DataTypes.INTEGER,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    pilot_id: {
        type: DataTypes.INTEGER,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Booking;