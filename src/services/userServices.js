const Users = require('../models/users');
const {Sequelize} = require('sequelize');
const createUser = async(user) => {
    try {
        const createdUser = await Users.create(user);
        if(!createdUser) return {error: {message: "Something went wrong, try again", code: 500}};
        return {createdUser: createdUser};
    } catch (error) {
        console.log(error);
        return {error: {message: "Something went wrong, try again", code: 500}};
    }
};
const userByMail = async(email) => {
    try {
        const user = await Users.findOne({where:{userEmail:{ [Sequelize.Op.iLike]:email}}});
        return {User: user};
    } catch (error) {
        console.log(error);
        return {error: {message: "Something went wrong, try again", code: 500}};
    }
};
const getUserById = async(id) => {
    try {
        const newuser = await Users.findOne({where:{id }});
        let user = newuser.toJSON();
        return {user: user};
    } catch (error) {
        console.log(error);
        return {error: {message: "Something went wrong, try again", code: 500}};
    }
};
const verifyEmailUpdateByStudent = async(id)=>{
    try{
        let user = await Users.update({verifyStudent: true},{where:{id}});
         return  {user};
    } catch(error){
        console.log(error);
        return {error: {message: "Something went wrong, try again", code: 500}};
    }
    
};
const verifyEmailUpdate = async(id)=>{
    try{
        let user = await Users.update({verifyAdmin: true},{where:{id}});
         return  {user};
    } catch(error){
        console.log(error);
        return {error: {message: "Something went wrong, try again", code: 500}};
    }
    
};
const loginUpdate = async(id)=>{
    try{
        // let user = await Users.update({active: true},{where:{id:id}});
        let user = await Users.update({ active: true }, { where: { id } } )
         return  {user};
    } catch(error){
        console.log(error);
        return {error: {message: error.message, code: 500}};
    }
    
};
const destroyUser = async(id)=>{
    try{
        let user = await Users.destroy({where:{id}});
         return  {Message:"User deleted successfully"};
    } catch(error){
        console.log(error);
        return {error: {message: "Something went wrong, try again", code: 500}};
    }
    
};
const updateUser = async(user, id) => {
    try {
        const updatedUser = await Users.update( user , {where: { id}});
        if(!updatedUser) return {error: {message: "Something went wrong, try again", code: 500}};
        console.log(updatedUser);
        return {updatedUser: updatedUser};
    } catch (error) {
        console.log(error);
        return {error: {message: "Something went wrong, try again", code: 500}};
    }
};

const getUsers = async()=>{
    try{
        let users = await Users.findAll({where:{active: true}});
        
         return  {users};
    } catch(error){
        console.log(error);
        return {error: {message: "Something went wrong, try again", code: 500}};
    }
    
};
const deleteUser = async(id)=>{
    try{
        let user = await Users.update({active: false , deleteat: new Date()},{where:{id}});
         return  {Message:"User deleted successfully"};
    } catch(error){
        console.log(error);
        return {error: {message: "Something went wrong, try again", code: 500}};
    }
    
};

module.exports={
    createUser,
    userByMail,
    verifyEmailUpdate,
    verifyEmailUpdateByStudent,
    loginUpdate,
    destroyUser,
    getUserById,
    updateUser,
    getUsers,
    deleteUser
}