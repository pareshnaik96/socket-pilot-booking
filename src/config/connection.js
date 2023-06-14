const Sequelize = require('sequelize');

// Create a Sequelize instance
const sequelize = new Sequelize('pilot_socket', 'root', '12345', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
});
sequelize.authenticate()
    .then(() => {
        console.log('mysql is connected successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;
