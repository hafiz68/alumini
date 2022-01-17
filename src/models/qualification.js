const db = require("../config/db");
const {Sequelize} = require('sequelize');

const qualification = db.define("qualification", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true
},
    degreeName: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
    institute: {
        type: Sequelize.STRING(500),
        allowNull: false
      },
    passingYear: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    cgpa: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    country: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    majorSubject: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    active: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    }
  });

  module.exports= qualification;

  