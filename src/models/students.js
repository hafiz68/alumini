const db = require("../config/db");
const {Sequelize} = require('sequelize');

const students = db.define("students", {
  id: {
    type: Sequelize.INTEGER,
    serialKey: true,
    primaryKey: true,
    autoIncrement: true,
},
    studentName: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
    batch: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
    active: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    }
  });

  module.exports= students;

  