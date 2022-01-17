const employement = require('../models/employement');
const {Sequelize} = require('sequelize');

const createEmployement = async(user) => {
    try {
        const createdEmployement = await employement.create(user);
        if(!createdEmployement) return {error: {message: "Something went wrong, try again", code: 500}};
        return {createdEmployement};
    } catch (error) {
        console.log(error);
        return {error: {message: "Something went wrong, try again", code: 500}};
    }
};
const getEmployements = async() => {
    try {
        const employements = await employement.findAll({where:{active: true}});
        if(!employements) return {error: {message: "Something went wrong, try again", code: 500}};
        return {employements};
    } catch (error) {
        console.log(error);
        return {error: {message: "Something went wrong, try again", code: 500}};
    }
};
const getemployementById = async(id) => {
    try {
        const employements = await employement.findAll({where:{id, active: true}});
        if(!employements) return {error: {message: "Something went wrong, try again", code: 500}};
        return {employements};
    } catch (error) {
        console.log(error);
        return {error: {message: "Something went wrong, try again", code: 500}};
    }
};
const getEmployementByUserId = async(id) => {
    try {
        const employements = await employement.findAll({where:{UserId: id, active: true}});
        if(!employements) return {error: {message: "Something went wrong, try again", code: 500}};
        return {employements};
    } catch (error) {
        console.log(error);
        return {error: {message: "Something went wrong, try again", code: 500}};
    }
};
const updateEmployement = async(user, id) => {
    try {
        const updateEmployement = await employement.update( user , {where: { id, active: true}});
        if(!updateEmployement) return {error: {message: "Something went wrong, try again", code: 500}};
        console.log(updateEmployement);
        return {updatedQualification: updateEmployement};
    } catch (error) {
        console.log(error);
        return {error: {message: "Something went wrong, try again", code: 500}};
    }
};
const deleteEmployement = async( id) => {
    try {
        const deleteEmployement = await employement.update( {active: false} , {where: { id}});
        if(!deleteEmployement) return {error: {message: "Something went wrong, try again", code: 500}};
        console.log(updatedUser);
        return {deleteEmployement: deleteEmployement};
    } catch (error) {
        console.log(error);
        return {error: {message: "Something went wrong, try again", code: 500}};
    }
};


module.exports = {
    createEmployement,
    getEmployements,
    updateEmployement,
    deleteEmployement,
    getemployementById,
    getEmployementByUserId
}