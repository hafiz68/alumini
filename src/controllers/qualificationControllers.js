const authService = require("../services/authServices");
const Validation = require("../validation/usersValidations");
const qualificationServices = require('../services/qualificationsServices');
const userService = require("../services/userServices");

const { v4 } = require("uuid");
const uuid = v4;
const { response } = require("express");

const createQualification = async (req, res) =>{
    const { token } = req.headers;
    const { degreeName, institute, passingYear, cgpa, country, majorSubject } = req.body;
    try{

        const resp = await authService.toknVerification(token);
        if(resp.error) return res.status(resp.error.code).send(resp.error.message);
        const validation = await Validation.createQualificationSchema.validate(req.body);
        if (validation.error) return res.status(403).json(validation.error.message);
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
        const qualification = {
            id: uuid(),
            degreeName,
            institute, passingYear, cgpa, country, majorSubject,
            UserId: resp2.User.id
        }
        const resp3 = await qualificationServices.createQualification(qualification);
        if(resp3.error) return res.status(resp3.error.code).send(resp3.error.message);
        res.status(200).send({ createdQualification: resp3.createdQualification });
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Something went wrong. Please try again");
      }
};
const deleteQualification = async (req, res) =>{
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
        const resp3 = await qualificationServices.deleteQualification(resp.decoder.id);
        if(resp3.error) return res.status(resp3.error.code).send(resp3.error.message);
        res.status(200).send("Qualification Deleted successfully");     
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Something went wrong. Please try again");
      }
};
const allQualifications = async (req, res) => {
    try {
      const resp = await qualificationServices.getQualifications();
      if (resp.error) return res.status(resp.error.code).send(resp.error.message);
      return res.status(200).send(resp.qualifications);
    } catch (err) {
      console.error(err);
      res.status(500).send("Something went wrong. Please try again");
    }
  };

  const getByUserId = async (req, res) => {
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
  
      const resp3 = await qualificationServices.getQualificationByUserId(resp.decoder.id);
      if(resp3.error) return res.status(resp3.error.code).send(resp3.error.message);

      return res.status(200).send(resp3.qualifications);
    } catch (err) {
      console.error(err);
      res.status(500).send("Something went wrong. Please try again");
    }
  };


  const updatedQualification = async (req, res) =>{
    const { id } = req.params;
    const { token } = req.headers;
    const { degreeName, institute, passingYear, cgpa, country, majorSubject } = req.body;
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
        const qualification = {
            degreeName,
            institute, passingYear, cgpa, country, majorSubject
        }
        const resp3 = await qualificationServices.updateQualification(qualification, id );
        if(resp3.error) return res.status(resp3.error.code).send(resp3.error.message);
        res.status(200).send({ createdQualification: resp3.createdQualification });
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Something went wrong. Please try again");
      }
};

module.exports = {
    createQualification,
    deleteQualification,
    allQualifications,
    getByUserId,
    updatedQualification
}