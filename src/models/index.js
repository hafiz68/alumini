const users = require ('./users.js');
const qualification = require ('./qualification.js');
const jobs = require ('./jobs');
const employement = require ('./employement.js');
const students = require ('./students.js');

const { user } = require('pg/lib/defaults');

users.hasMany(qualification,{
    foreignkey: 'userId'
})
users.hasMany(jobs, {
    foreignkey: 'userId'
})
users.hasMany( employement ,{
    foreignkey: 'userId'
})
students.hasMany( users ,{
    foreignkey: 'studentsId'
})


module.exports = {
    users,
    qualification,
    employement,
    jobs,
    students
}