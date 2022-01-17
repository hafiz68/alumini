const students = require('../models/students');
const {Sequelize} = require('sequelize');

const createStudent = async(user) => {
    try {
        const createdStudents = await students.create(user);
        if(!createdStudents) return {error: {message: "Something went wrong, try again", code: 500}};
        return {createdStudents};
    } catch (error) {
        console.log(error);
        return {error: {message: "Something went wrong, try again", code: 500}};
    }
};
const getStudents = async() => {
    try {
        const student = await students.findAll();
        if(!student) return {error: {message: "Something went wrong, try again", code: 500}};
        return {student};
    } catch (error) {
        console.log(error);
        return {error: {message: "Something went wrong, try again", code: 500}};
    }
};

const getStudentById = async(id) => {
    try {
        const student = await students.findOne({where:{id, active: true}});
        if(!student) return {error: {message: "Something went wrong, try again", code: 500}};
        return {student};
    } catch (error) {
        console.log(error);
        return {error: {message: "Something went wrong, try again", code: 500}};
    }
};
const getStudentByBatch = async(batch) => {
    try {
        const student = await students.findAll({where:{batch , active: true}});
        if(!student) return {error: {message: "Something went wrong, try again", code: 500}};
        return {student};
    } catch (error) {
        console.log(error);
        return {error: {message: "Something went wrong, try again", code: 500}};
    }
};




module.exports = {
    createStudent,
    getStudents,
    getStudentById,
    getStudentByBatch
}