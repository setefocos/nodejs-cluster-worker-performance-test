const Sequelize = require('sequelize');

const connection = new Sequelize('test','test','test',{
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: false
});

module.exports = connection;