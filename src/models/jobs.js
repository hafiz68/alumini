const db = require("../config/db");
const {Sequelize} = require('sequelize');

const jobs = db.define("jobs", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true
},
    jobTitle: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
    jobDescription: {
        type: Sequelize.STRING(500),
        allowNull: false
      },
    companyName: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    companydescription: {
      type: Sequelize.STRING(500),
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

  module.exports= jobs;

  