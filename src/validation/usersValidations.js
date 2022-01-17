const Joi = require('joi');


    
const createUserSchema = Joi.object({
    userName: Joi.string().required(),
    userEmail: Joi.string().email().required(),
    userPassword: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).required(),
    role: Joi.string(),
    batch:Joi.string().required(),
    rollNo: Joi.number().integer().required(),
    department: Joi.string().required(),
    phoneNo:Joi.string(),
    birthDate:Joi.date(),
    address:Joi.string(),
    linkedin:Joi.string(),
    gender:Joi.string(),
    country:Joi.string()
});
const createQualificationSchema = Joi.object({
    degreeName: Joi.string().required(),
    institute: Joi.string().required(),
    passingYear: Joi.string().required(),
    cgpa: Joi.number().required(),
    country:Joi.string(),
    majorSubject: Joi.string().required()  
});
const createJobSchema = Joi.object({
    jobTitle: Joi.string().required(),
    jobDescription: Joi.string().required(),
    companyName: Joi.string().required(),
    companydescription: Joi.string().required(),
    country:Joi.string(),
});






module.exports = {
    createUserSchema,
    createQualificationSchema,
    createJobSchema
}