const {Sequelize} = require('sequelize');
const qualification = require('../models/qualification')


const createQualification = async(user) => {
    try {
        const createdQualification = await qualification.create(user);
        if(!createdQualification) return {error: {message: "Something went wrong, try again", code: 500}};
        return {createdQualification};
    } catch (error) {
        console.log(error);
        return {error: {message: "Something went wrong, try again", code: 500}};
    }
};
const getQualifications = async() => {
    try {
        const qualifications = await qualification.findAll({where:{active: true}});
        if(!qualifications) return {error: {message: "Something went wrong, try again", code: 500}};
        return {qualifications};
    } catch (error) {
        console.log(error);
        return {error: {message: "Something went wrong, try again", code: 500}};
    }
};
const getQualificationById = async(id) => {
    try {
        const qualifications = await qualification.findAll({where:{id, active: true}});
        if(!qualifications) return {error: {message: "Something went wrong, try again", code: 500}};
        return {qualifications};
    } catch (error) {
        console.log(error);
        return {error: {message: "Something went wrong, try again", code: 500}};
    }
};
const getQualificationByUserId = async(id) => {
    try {
        const qualifications = await qualification.findAll({where:{UserId: id, active: true}});
        if(!qualifications) return {error: {message: "Something went wrong, try again", code: 500}};
        return {qualifications};
    } catch (error) {
        console.log(error);
        return {error: {message: "Something went wrong, try again", code: 500}};
    }
};
const updateQualification = async(user, id) => {
    try {
        const updatedQualification = await qualification.update( user , {where: { id, active: true}});
        if(!updatedQualification) return {error: {message: "Something went wrong, try again", code: 500}};
        console.log(updatedQualification);
        return {updatedQualification: updatedQualification};
    } catch (error) {
        console.log(error);
        return {error: {message: "Something went wrong, try again", code: 500}};
    }
};
const deleteQualification = async( id) => {
    try {
        const updatedQualification = await qualification.update( {active: false} , {where: { id}});
        if(!updatedQualification) return {error: {message: "Something went wrong, try again", code: 500}};
        console.log(updatedUser);
        return {updatedQualification: updatedQualification};
    } catch (error) {
        console.log(error);
        return {error: {message: "Something went wrong, try again", code: 500}};
    }
};


module.exports = {
    createQualification,
    getQualifications,
    updateQualification,
    deleteQualification,
    getQualificationById,
    getQualificationByUserId
}