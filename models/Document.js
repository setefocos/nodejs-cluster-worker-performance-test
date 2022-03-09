const Sequelize = require("sequelize");
const connection = require("../database/connection");

const Document = connection.define('documents',{
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    body:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Document.sync({force: false}).then(() => {});

module.exports = Document;