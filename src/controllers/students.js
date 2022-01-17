const studentServices = require("../services/studentsServices");
const authService = require("../services/authServices");
const mailService = require("../services/mailServices");
const Validation = require("../validation/usersValidations");

const { v4 } = require("uuid");
const uuid = v4;
const bcrypt = require("bcrypt");
const createStudent =async (req, res) =>{
    const { token } = req.headers;

   const {name, batch} = req.body;
   try{
    const resp = await authService.toknVerification(token);
    if(resp.error) return res.status(resp.error.code).send(resp.error.message);
    if(resp.decoder.role !== Admin) return res.status(403).send("you have not access to add student");
       console.log(req.body);
       let stud = {
        studentName: name,
        batch: batch
       }
       const students = await studentServices.createStudent(stud);
       if(students.error)res.status(students.error).send(students.error.message);
       return res.status(200).send(students)
   }
   catch(err) {
    console.error(err);
    res.status(500).send("Something went wrong. Please try again");
  }
};
const allStudents =async (req, res) =>{
    const { token } = req.headers;

    try{
        const resp = await authService.toknVerification(token);
        if(resp.error) return res.status(resp.error.code).send(resp.error.message);
        if(resp.decoder.role !== Admin) return res.status(403).send("you have not access to get students");
        const students = await studentServices.getStudents();
        if(students.error)res.status(students.error).send(students.error.message);
        return res.status(200).send(students)
    }
    catch(err) {
     console.error(err);
     res.status(500).send("Something went wrong. Please try again");
   }
 };
 const studentsByid = async (req,res)=>{
    const { token } = req.headers;

    try{
        const resp = await authService.toknVerification(token);
        if(resp.error) return res.status(resp.error.code).send(resp.error.message);
        if(resp.decoder.role !== Admin) return res.status(403).send("you have not access to get students");
        const {id} = req.params;
        const student = await studentServices.getStudentById(id);
        if(student.error)res.status(student.error).send(student.error.message);
        return res.status(200).send(student)
    }
    catch(err) {
        console.error(err);
        res.status(500).send("Something went wrong. Please try again");
      }
}
const studentsByBatch = async (req,res)=>{
    try{
        const {batch} = req.body;
        const student = await studentServices.getStudentByBatch(batch);
        if(student.error)res.status(student.error).send(student.error.message);
        let stud = student.student.map((item)=>{
            return item.studentName
            })
        return res.status(200).send({student: stud})
    }
    catch(err) {
        console.error(err);
        res.status(500).send("Something went wrong. Please try again");
      }
}

module.exports = {
    createStudent,
    allStudents,
    studentsByBatch,
    studentsByid
};
