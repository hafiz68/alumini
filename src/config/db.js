const {Sequelize} = require('sequelize');

const dotenv = require('dotenv');
dotenv.config();

// const db = {};

const sequelize = new Sequelize('alumini', 'postgres', '12344321', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
    pool:{
        max: 5,
        min:0,
        acqire: 30000,
        idle: 10000
    }
});

module.exports = sequelize;