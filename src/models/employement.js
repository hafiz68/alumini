const db = require("../config/db");
const {Sequelize} = require('sequelize');

const employement = db.define("employemnet", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true
},
    companyName: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
    designation: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
    startingYear: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    endingYear: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
    city: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    country: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    active: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    }
  });

  module.exports= employement;

  