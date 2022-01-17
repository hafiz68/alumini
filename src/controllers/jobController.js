const authService = require("../services/authServices");
const Validation = require("../validation/usersValidations");
const jobServices = require('../services/jobServices');
const userService = require("../services/userServices");

const { v4 } = require("uuid");
const uuid = v4;

const createJob = async (req, res) =>{
    const { token } = req.headers;
    const { jobTitle, jobDescription, companyName, companydescription, country } = req.body;
    try{

        const resp = await authService.toknVerification(token);
        if(resp.error) return res.status(resp.error.code).send(resp.error.message);
        if(! resp.decoder.email) return res.status(403).send("Jason web token has not any email");
        const validation = await Validation.createJobSchema.validate(req.body);
        if (validation.error) return res.status(403).json(validation.error.message);
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
            jobTitle, jobDescription, companyName, companydescription, country,
            UserId: resp2.User.id
        }
        const resp3 = await jobServices.createJob(qualification);
        if(resp3.error) return res.status(resp3.error.code).send(resp3.error.message);
        res.status(200).send({ createdJob: resp3.createdJob });
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Something went wrong. Please try again");
      }
};
const deleteJob = async (req, res) =>{
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
        const resp4 = await jobServices.getJobById(id);
        if(resp4.error) return res.status(resp4.error.code).send(resp4.error.message);
        if(resp4.jobs.UserId !== resp.decoder.id && resp.decoder.role !== Admin)res.status(403).send("Unauthorised Person");
        const resp3 = await jobServices.deleteJob(id);
        if(resp3.error) return res.status(resp3.error.code).send(resp3.error.message);
        res.status(200).send("Qualification Deleted successfully");     
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Something went wrong. Please try again");
      }
};
const allJobs = async (req, res) => {
    try {
      const resp = await jobServices.getJobs();
      if (resp.error) return res.status(resp.error.code).send(resp.error.message);
      return res.status(200).send(resp.jobs);
    } catch (err) {
      console.error(err);
      res.status(500).send("Something went wrong. Please try again");
    }
  };

  const getJobsByUserId = async (req, res) => {
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
  
      const resp3 = await jobServices.getJobById(resp.decoder.id);
      if(resp3.error) return res.status(resp3.error.code).send(resp3.error.message);

      return res.status(200).send(resp3.jobs);
    } catch (err) {
      console.error(err);
      res.status(500).send("Something went wrong. Please try again");
    }
  };


  const updatedJob = async (req, res) =>{
    const { id } = req.params;
    const { token } = req.headers;
    const { jobTitle, jobDescription, companyName, companydescription, country } = req.body;
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
            jobTitle, jobDescription, companyName, companydescription, country
        }
        const resp3 = await jobServices.updateJob(qualification, id );
        if(resp3.error) return res.status(resp3.error.code).send(resp3.error.message);
        res.status(200).send({ createdQualification: resp3.createdQualification });
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Something went wrong. Please try again");
      }
};

module.exports = {
    createJob,
    deleteJob,
    allJobs,
    getJobsByUserId,
    updatedJob
}