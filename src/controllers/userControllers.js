const userService = require("../services/userServices");
const authService = require("../services/authServices");
const mailService = require("../services/mailServices");
const Validation = require("../validation/usersValidations");
const fs = require('fs');

const { v4 } = require("uuid");
const uuid = v4;
const bcrypt = require("bcrypt");
const signup = async (req, res) => {
  const {
    userName,
    userEmail,
    userPassword,
    batch,
    rollNo,
    department,
    linkedin,
    gender,
    role,
    phoneNo,
    birthDate,
    address,
    country,
  } = req.body;
  try {
    const resp = await userService.userByMail(userEmail);
    if (resp.User) return res.status(400).send("User already exist");
    if (resp.error) return res.status(resp.error.code).send(resp.error.message);
    if (resp.User && resp.User.active == false)
      return res
        .status(400)
        .send(
          "you deleted your account against this email do you want to recover"
        );
    const validation = await Validation.createUserSchema.validate(req.body);
    if (validation.error) return res.status(403).json(validation.error.message);
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(userPassword, salt);
    const newUser = {
      id: uuid(),
      userEmail: userEmail,
      userPassword: hashedPassword,
      userName: userName,
      batch: batch,
      rollNo: rollNo,
      department: department,
      linkedin: linkedin,
      gender: gender,
      role: role,
      phoneNo: phoneNo,
      birthDate: birthDate,
      address: address,
      country: country,
    };
    const resp4 = await authService.emailVerifyToken(newUser.userEmail);
    if (!resp4.token)
      return res.status(resp4.token.code).send(resp4.error.message);
    const verifyLink = `http://localhost:5000/alumini/verifyEmail/${resp4.token}`;
    const verifyLink1 = `http://localhost:5000/alumini/verifyEmailByStudent/${resp4.token}`;
    console.log("newUser:" + newUser);
    const createdUser = await userService.createUser(newUser);
    if (createdUser.error)
      return res.status(createdUser.error.code).send(createdUser.error.message);
    const resp3 = await mailService.sendingmail(
      userEmail,
      `Please click thae link to verify your email ${verifyLink1} `
    );
    if (resp3?.error)
      return res.status(resp3.error.code).send(resp3.error.message);
    const resp5 = await mailService.sendingmail(
      "aras.edu.pk@gmail.com",
      `Please click thae link to verify your email ${verifyLink} `
    );
    if (resp3?.error)
      return res.status(resp3.error.code).send(resp3.error.message);
    res.status(200).send({ createdUser: createdUser.createdUser });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Something went wrong, try again" });
  }
};

const verifyEmailByStudent = async (req, res) => {
  const { token } = req.params;

  try {
    const resp = await authService.toknVerification(token);
    if (resp.error) return res.status(resp.error.code).send(resp.error.message);
    console.log(resp.decoder);
    const resp2 = await userService.userByMail(resp.decoder.email);
    if (resp2.error)
      return res.status(resp2.error.code).send(resp2.error.message);
    let deletedDate = resp2.User.updatedAt;
    deletedDate.setDate(deletedDate.getDate() + 1);
    console.log(deletedDate);
    console.log(new Date());
    if (new Date() > deletedDate) {
      destroyuser = await userService.destroyUser(resp2.User.id);
      // console.log({dest:destroyuser})
      return res.status(403).send({ message: "Please sign up again" });
    }

    const resp4 = await userService.verifyEmailUpdateByStudent(resp2.User.id);
    if (resp4.error)
      return res.status(resp4.error.code).send(resp4.error.message);
    return res.redirect("http://localhost:3000/login");
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong. Please try again");
  }
};
const verifyEmail = async (req, res) => {
  const { token } = req.params;

  try {
    const resp = await authService.toknVerification(token);
    if (resp.error) return res.status(resp.error.code).send(resp.error.message);
    console.log(resp.decoder);
    const resp2 = await userService.userByMail(resp.decoder.email);
    if (resp2.error)
      return res.status(resp2.error.code).send(resp2.error.message);
    let deletedDate = resp2.User.updatedAt;
    deletedDate.setDate(deletedDate.getDate() + 1);
    console.log(deletedDate);
    console.log(new Date());
    if (new Date() > deletedDate) {
      destroyuser = await userService.destroyUser(resp2.User.id);
      // console.log({dest:destroyuser})
      return res.status(403).send({ message: "Please sign up again" });
    }

    const resp4 = await userService.verifyEmailUpdate(resp2.User.id);
    if (resp4.error)
      return res.status(resp4.error.code).send(resp4.error.message);
    return res.redirect("http://localhost:3000/login");
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong. Please try again");
  }
};
const resendVerifyMail = async (req, res) => {
  const {
    userName,
    userEmail,
    userPassword,
    batch,
    rollNo,
    department,
    linkedin,
    gender,
    role,
    phoneNo,
    birthDate,
    address,
    country,
  } = req.body;
  try {
    const resp = await userService.userByMail(userEmail);
    if (!resp.User) return res.status(400).send("PLease signup");
    if (resp.User.verifyStudent === true && resp.User.verifyAdmin === true)
      return res.status(400).send("User already exist");
    if (resp.error) return res.status(resp.error.code).send(resp.error.message);
    if (resp.User && !resp.User.active)
      return res
        .status(400)
        .send(
          "you deleted your account against this email do you want to recover"
        );
    const validation = await Validation.createUserSchema.validate(req.body);
    if (validation.error) return res.status(403).json(validation.error.message);
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(userPassword, salt);
    const newUser = {
      id: uuid(),
      userEmail: userEmail,
      userPassword: hashedPassword,
      userName: userName,
      batch: batch,
      rollNo: rollNo,
      department: department,
      linkedin: linkedin,
      gender: gender,
      role: role,
      phoneNo: phoneNo,
      birthDate: birthDate,
      address: address,
      country: country,
    };
    const resp4 = await authService.emailVerifyToken(newUser.userEmail);
    if (!resp4.token)
      return res.status(resp4.token.code).send(resp4.error.message);
    const verifyLink = `http://localhost:5000/alumini/verifyEmail/${resp4.token}`;
    const verifyLink1 = `http://localhost:5000/alumini/verifyEmailByStudent/${resp4.token}`;
    console.log("newUser:" + newUser);
    const resp3 = await mailService.sendingmail(
      userEmail,
      `Please click thae link to verify your email 
      ${verifyLink1} `
    );
    if (resp3?.error)
      return res.status(resp3.error.code).send(resp3.error.message);
    const resp5 = await mailService.sendingmail(
      "aras.edu.pk@gmail.com",
      `Please click thae link to verify your email 
      ${verifyLink} `
    );
    if (resp3?.error)
      return res.status(resp3.error.code).send(resp3.error.message);
    res.status(200).redirect("http://localhost:3000/login");
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Something went wrong, try again" });
  }
};
const signInUser = async (req, res) => {
  const { userEmail, userPassword } = req.body;
  try {
    const resp = await userService.userByMail(userEmail);
    if (!resp.User) return res.status(400).send("User not found");
    if (resp.User.verifyStudent === false )
      return res.status(400).send("Verify your mail");
      if (resp.User.verifyAdmin === false )
      return res.status(400).send("Ask admin to verify and send verify email again");
    if (resp.error) return res.status(resp.error.code).send(resp.error.message);
    if (resp.User.deleteat != null && !resp.User.active) {
      let deletedDate = resp.User.deleteat;
      console.log(deletedDate);
      deletedDate.setDate(deletedDate.getDate() + 30);
      console.log(deletedDate);
      console.log(new Date());
      if (new Date() > deletedDate) {
        destroyuser = await userService.destroyUser(resp.user.id);
        // console.log({dest:destroyuser})
        return res.status(400).send({ message: "No User found" });
      }
    }
    const resp2 = await authService.passwordVerification(
      userPassword,
      resp.User.userPassword
    );
    if (resp2.error)
      return res.status(resp2.error.code).send(resp2.error.message);

    const resp3 = await authService.tokengenerator(
      resp.User.id,
      resp.User.userEmail,
      resp.User.role
    );

    if (resp3.error)
      return res.status(resp3.error.code).send(resp3.error.message);

    if (!resp.User.active) {
      console.log("Here...");
      const resp4 = await userService.loginUpdate(resp.User.id);

      if (resp4.error)
        return res.status(resp4.error.code).send(resp4.error.message);
    }
    const resp5 = await userService.getUserById(resp.User.id);
    if (resp5.error)
      return res.status(resp5.error.code).send(resp5.error.message);
    return res.status(200).send({ signInUser: resp5.user, token: resp3.token });
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong. Please try again");
  }
};
const updateUser = async (req, res) => {
  let { id } = req.params;
  const { userName, linkedin, phoneNo, address, country } = req.body;
  const { token } = req.headers;
  try {
    const resp = await authService.toknVerification(token);
    if (resp.error) return res.status(resp.error.code).send(resp.error.message);
    console.log(resp.decoder);
    if (id !== resp.decoder.id) return res.status(403).send("unautorized user");

    const resp2 = await userService.getUserById(id);
    if (resp2.error)
      return res.status(resp2.error.code).send(resp2.error.message);
    const newUser = {
      id: uuid(),
      userName: userName,
      linkedin: linkedin,
      phoneNo: phoneNo,
      address: address,
      country: country,
    };
    const resp4 = await userService.updateUser(newUser, id);
    if (resp4.error)
      return res.status(resp4.error.code).send(resp4.error.message);
    if (resp4.updatedUser.length < 1)
      res.status(500).send({ message: "Could not update user" });

    return res.status(200).json(resp4.updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong. Please try again");
  }
};
const updatePass = async (req, res) => {
  let { id } = req.params;
  const { userPassword, newPassword } = req.body;
  const { token } = req.headers;
  try {
    const resp = await authService.toknVerification(token);
    if (resp.error) return res.status(resp.error.code).send(resp.error.message);
    if (id !== resp.decoder.id) return res.status(403).send("unautorized user");
    let resp2 = await userService.getUserById(id);
    if (resp2.error)
      return res.status(resp2.error.code).send(resp2.error.message);
      console.log("Ahmad");
    const resp3 = await authService.passwordVerification(
      userPassword,
      resp2.user.userPassword
    );

    if (resp3.error)
      return res.status(resp3.error.code).send(resp3.error.message);
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    resp2.user.userPassword = hashedPassword;
    let newPass ={ userPassword : resp2.user.userPassword}
    const resp4 = await userService.updateUser(newPass , id);
    if (resp4.error)
      return res.status(resp4.error.code).send(resp4.error.message);
    return res.status(200).send({ updatedUser: "password updated" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong. Please try again");
  }
};

const forgetPass = async (req, res) => {
  const { email } = req.body;
  try {
    const resp = await userService.userByMail(email);
    if (resp.User.active == false)
      return res
        .status(400)
        .send(
          "you deleted your account against this email do you want to recover"
        );
    if (resp.error) return res.status(resp.error.code).send(resp.error.message);
    if (!resp.User) return res.status(400).send("Incorrect email");
    let randomCode = Math.floor(10000000 + Math.random() * 90000000);
    console.log(randomCode);
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(randomCode.toString(), salt);
    resp.User.userPassword = hashedPassword;
    let newPass ={ userPassword : resp.User.userPassword}
    console.log(hashedPassword);
    const resp4 = await userService.updateUser(newPass , id);
    if (resp4.error)
      return res.status(resp4.error.code).send(resp4.error.message);
    const resp3 = await mailService.sendingmail(email, randomCode.toString());
    if (resp3?.error) return res.status(resp3.error.code).send(resp3.error.message);
    return res.status(200).send("check your email for new");
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong. Please try again");
  }
};

const allCustomers = async (req, res) => {
  try {
    const resp = await userService.getUsers();
    if (resp.error) return res.status(resp.error.code).send(resp.error.message);
    if (!resp.users) return res.status(400).send("No user found");

    resp.users = resp.users.map((user) => {
      user = user.toJSON();
      delete user.userPassword;
      return user;
    });
    return res.status(200).send(resp.users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong. Please try again");
  }
};
const getById = async (req, res) => {
  let id = req.params.id;
  try {
    const resp = await userService.getUserById(id);
    if (!resp.user) return res.status(400).send("No user found");

    delete resp.user.userPassword;
    return res.status(200).send(resp.user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong. Please try again");
  }
};

const deleteUser = async (req, res) => {
  let id = req.params.id;
  const { token } = req.headers;
  const { userEmail, userPassword } = req.body;
  try {
    const resp = await authService.toknVerification(token);
    if (resp.error) return res.status(resp.error.code).send(resp.error.message);
    console.log(resp.decoder);
    if (id !== resp.decoder.id) return res.status(403).send("unautorized user");

    const resp2 = await userService.getUserById(id);
    if (resp2.error)return res.status(resp2.error.code).send(resp2.error.message);
    if (!resp2.user || userEmail !== resp2.user.userEmail)
      return res.status(403).send("unautorized user");
    const resp3 = await authService.passwordVerification(
      userPassword,
      resp2.user.userPassword
    );
    if (resp3.error)
      return res.status(resp3.error.code).send(resp3.error.message);
    const resp4 = await userService.deleteUser(resp.decoder.id);
    if (resp4.error)
      return res.status(resp4.error.code).send(resp4.error.message);
    return res.status(200).send(resp4.Message);
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong. Please try again");
  }
};

const updateProfilePicture = async (req, res) => {
  const { token } = req.headers;
 try{
  const resp = await authService.toknVerification(token);
  if (resp.error) return res.status(resp.error.code).send(resp.error.message);
  if ( !resp.decoder.id) return res.status(403).send("unautorized user");
  const resp2 = await userService.getUserById(resp.decoder.id);
  if (resp2.error)return res.status(resp2.error.code).send(resp2.error.message);
  if (!req.files) return res.status(500).send({ message: 'Please select a file.' });
  const profilePic = req.files.img;
  const splitArray = req.files.img.name.split('.');
  const extension = req.files.img.name.split('.')[splitArray.length - 1];
  profilePic.name = `profile-${uuid()}.${extension}`
  let pictureSaved = true;
  const path = __dirname + "/uploads/" + profilePic.name;
  profilePic.mv(path, (err) => {
    if (err) {
      console.log(+ err)
      pictureSaved = false;
    }
  })

  if (!pictureSaved) {
    return res.status(500).send({ message: 'Couldn\'t update profile picture. 1' })
  }
  let oldDeleted = true;
  if (resp2.user.profilePic) {
    fs.unlink(__dirname + '/uploads/' + resp2.user.profilePic, (err) => {
      if (err) {
        console.log(err)
        oldDeleted = false;
      }
    })
  }
  if (!oldDeleted) {
    return res.status(500).send({ message: 'Couldn\'t update profile picture. 2' })
  }
  
 const userPic = {profilePic : profilePic.name};
  
  const resp4 = await userService.updateUser(userPic , resp.decoder.id);
    if (resp4.error)
      return res.status(resp4.error.code).send(resp4.error.message);
    return res.status(200).send({ updatedUser: resp4.updatedUser });
 }  catch (err) {
  console.error(err);
  res.status(500).send("Something went wrong. Please try again");
}
}



module.exports = {
  signup,
  verifyEmail,
  verifyEmailByStudent,
  resendVerifyMail,
  signInUser,
  updateUser,
  updatePass,
  forgetPass,
  allCustomers,
  getById,
  deleteUser,
  updateProfilePicture
};
