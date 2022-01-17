const db = require("../config/db");
const {Sequelize} = require('sequelize');

const Users = db.define("Users", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true
},
    userEmail: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
    userPassword: {
        type: Sequelize.STRING(500),
        allowNull: false
      },
    userName: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    batch: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    rollNo: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    department: {
      type: Sequelize.STRING(50),
      allowNull: false
    }, 
    linkedIn: {
    type: Sequelize.STRING(50),
    allowNull: true
    }, 
    gender: {
    type: Sequelize.ENUM('Male', 'Female'),
    allowNull: false
    },

    role: {
      type: Sequelize.ENUM('Student', 'Admin'),
      allowNull: false,
      defaultValue: 'Student'

    },
    phoneNo: {
        type: Sequelize.STRING(20),
        allowNull: true
    },
    birthDate:{
        type: Sequelize.DATE,
        allowNull: true
    },
    active: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    },
    deleteat: {
      type: Sequelize.DATE,
      defaultValue: null
    },
    verifyStudent: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    verifyAdmin: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    address:{
        type: Sequelize.STRING,
        allowNull: true
    },
    country:{
      type: Sequelize.STRING,
      allowNull: true
  },
  profilePic:{ 
    type: Sequelize.BLOB,
    allowNull: true

  },

  });

  module.exports= Users;

  