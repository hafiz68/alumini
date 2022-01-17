const authService = require("../services/authServices");
const Validation = require("../validation/usersValidations");
const employementServices = require('../services/empolyementServices');
const userService = require("../services/userServices");
const fs = require('fs')

const { v4 } = require("uuid");
const uuid = v4;

const createEmployement = async (req, res) =>{
    const { token } = req.headers;
    const { companyName, designation, startingYear, endingYear, city, country } = req.body;
    try{

        const resp = await authService.toknVerification(token);
        if(resp.error) return res.status(resp.error.code).send(resp.error.message);
        if(! resp.decoder.email) return res.status(403).send("Jason web token has not any email");
        const resp2 = await userService.userByMail(resp.decoder.email);
        if (resp2.User.id !== resp.decoder.id) return res.status(400).send("unauthorised user");
        if (!resp2.User) return res.status(400).send("Please sign up first");
        if (resp2.error) return res.status(resp2.error.code).send(resp2.error.message);
        if (resp2.User.active == false)
          return res
            .status(400)
            .send(
              "you deleted your account against this email do you want to recover"
            );
        const qualification = {
            id: uuid(),
            companyName, designation, startingYear, endingYear, city, country,
            UserId: resp2.User.id
        }
        const resp3 = await employementServices.createEmployement(qualification);
        if(resp3.error) return res.status(resp3.error.code).send(resp3.error.message);
        res.status(200).send({ createdEmployement: resp3.createdEmployement });
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Something went wrong. Please try again");
      }
};
const deleteEmployement = async (req, res) =>{
  const {id} = req.params;
    const { token } = req.headers;
    try{

        const resp = await authService.toknVerification(token);
        if(resp.error) return res.status(resp.error.code).send(resp.error.message);
        if(! resp.decoder.email) return res.status(403).send("Jason web token has not any email");
        const resp2 = await userService.userByMail(resp.decoder.email);
        if (!resp2.User) return res.status(400).send("Please sign up first");
        if (resp2.error) return res.status(resp2.error.code).send(resp2.error.message);
        if (resp2.User.active == false)
          return res
            .status(400)
            .send(
              "you deleted your account against this email do you want to recover"
            );
        const resp4 = await employementServices.getemployementById(id);
        if (resp4.error) return res.status(resp4.error.code).send(resp4.error.message);
        if (resp4.employements.UserId !== resp.decoder.id && resp.decoder.role !== Admin) return res.status(403).send("unauthorised User");
        const resp3 = await employementServices.deleteEmployement(id);
        if(resp3.error) return res.status(resp3.error.code).send(resp3.error.message);
        res.status(200).send("Qualification Deleted successfully");     
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Something went wrong. Please try again");
      }
};
const allEmployements = async (req, res) => {
  const { token } = req.headers;
    try {const resp2 = await authService.toknVerification(token);
      if(resp2.error) return res.status(resp2.error.code).send(resp2.error.message);
      if(resp2.decoder.email !== Admin) return res.status(403).send("You are not authorised to do this action");
      const resp = await employementServices.getEmployements();
      if (resp.error) return res.status(resp.error.code).send(resp.error.message);
      return res.status(200).send(resp.employements);
    } catch (err) {
      console.error(err);
      res.status(500).send("Something went wrong. Please try again");
    }
  };

  const getEmpByUserId = async (req, res) => {
    const { token } = req.headers;
    try {
        const resp = await authService.toknVerification(token);
        if(resp.error) return res.status(resp.error.code).send(resp.error.message);
        if(! resp.decoder.email) return res.status(403).send("Jason web token has not any email");
        const resp2 = await userService.userByMail(resp.decoder.email);
        if (!resp2.User) return res.status(400).send("Please sign up first");
        if (resp2.error) return res.status(resp2.error.code).send(resp2.error.message);
        if (resp2.User.active == false)
          return res
            .status(400)
            .send(
              "you deleted your account against this email do you want to recover"
            );
  
      const resp3 = await employementServices.getEmployementByUserId(resp.decoder.id);
      if(resp3.error) return res.status(resp3.error.code).send(resp3.error.message);

      return res.status(200).send(resp3.employements);
    } catch (err) {
      console.error(err);
      res.status(500).send("Something went wrong. Please try again");
    }
  };


  const updatedEmployement = async (req, res) =>{
    const { id } = req.params;
    const { token } = req.headers;
    const { companyName, designation, startingYear, endingYear, city, country } = req.body;
    try{

        const resp = await authService.toknVerification(token);
        if(resp.error) return res.status(resp.error.code).send(resp.error.message);
        if(! resp.decoder.email) return res.status(403).send("Jason web token has not any email");
        const resp2 = await userService.userByMail(resp.decoder.email);
        if (!resp2.User) return res.status(400).send("Please sign up first");
        if (resp2.error) return res.status(resp2.error.code).send(resp2.error.message);
        if (resp2.User.active == false)
          return res
            .status(400)
            .send(
              "you deleted your account against this email do you want to recover"
            );
            const resp4 = await employementServices.getemployementById(id);
            if (resp4.error) return res.status(resp4.error.code).send(resp4.error.message);
            if (resp4.employements.UserId !== resp.decoder.id && resp.decoder.role !== Admin) return res.status(403).send("unauthorised User");
        const qualification = {
            companyName, designation, startingYear, endingYear, city, country
        }
        const resp3 = await employementServices.updateEmployement(qualification, id );
        if(resp3.error) return res.status(resp3.error.code).send(resp3.error.message);
        res.status(200).send({ createdQualification: resp3.updatedQualification });
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Something went wrong. Please try again");
      }
};

module.exports = {
    createEmployement,
    deleteEmployement,
    allEmployements,
    getEmpByUserId,
    updatedEmployement
}