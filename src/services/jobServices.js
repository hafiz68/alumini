const {Sequelize} = require('sequelize');
const jobs = require('../models/jobs')


const createJob = async(user) => {
    try {
        const createdJob = await jobs.create(user);
        if(!createdJob) return {error: {message: "Something went wrong, try again", code: 500}};
        return {createdJob};
    } catch (error) {
        console.log(error);
        return {error: {message: "Something went wrong, try again", code: 500}};
    }
};
const getJobs = async() => {
    try {
        const jobs = await jobs.findAll({where:{active: true}});
        if(!jobs) return {error: {message: "Something went wrong, try again", code: 500}};
        return {jobs};
    } catch (error) {
        console.log(error);
        return {error: {message: "Something went wrong, try again", code: 500}};
    }
};
const getJobById = async(id) => {
    try {
        const jobs = await jobs.findAll({where:{id, active: true}});
        if(!jobs) return {error: {message: "Something went wrong, try again", code: 500}};
        return {jobs};
    } catch (error) {
        console.log(error);
        return {error: {message: "Something went wrong, try again", code: 500}};
    }
};
const getJobByUserId = async(id) => {
    try {
        const jobs = await jobs.findAll({where:{UserId: id, active: true}});
        if(!jobs) return {error: {message: "Something went wrong, try again", code: 500}};
        return {jobs};
    } catch (error) {
        console.log(error);
        return {error: {message: "Something went wrong, try again", code: 500}};
    }
};
const updateJob = async(user, id) => {
    try {
        const updatedJob = await jobs.update( user , {where: { id, active: true}});
        if(!updatedJob) return {error: {message: "Something went wrong, try again", code: 500}};
        console.log(updatedJob);
        return {updatedJob: updatedJob};
    } catch (error) {
        console.log(error);
        return {error: {message: "Something went wrong, try again", code: 500}};
    }
};
const deleteJob = async( id) => {
    try {
        const updatedJob = await jobs.update( {active: false} , {where: { id}});
        if(!updatedJob) return {error: {message: "Something went wrong, try again", code: 500}};
        console.log(updatedJob);
        return {updatedJob: updatedJob};
    } catch (error) {
        console.log(error);
        return {error: {message: "Something went wrong, try again", code: 500}};
    }
};


module.exports = {
    createJob,
    getJobs,
    updateJob,
    deleteJob,
    getJobById,
    getJobByUserId
}