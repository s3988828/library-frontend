// models/book.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Book = sequelize.define('Book', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING
    },
    genre: {
        type: DataTypes.STRING
    },
    published_date: {
        type: DataTypes.STRING
    },
    file: {
        type: DataTypes.BLOB('long')
    }
});

module.exports = Book;
