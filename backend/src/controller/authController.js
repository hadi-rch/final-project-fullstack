const { PrismaClient } = require('@prisma/client')
const { getUser } = require('../utils/helper')
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient()

const register = async (req,res) =>  {
    let{username,email,password} = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({data:{username,email,password: hashedPassword}})
    console.log(username)
    const expiresIn = 2*24*3600 //2 days
    const token = jwt.sign({userId: user.id},process.env.TOKEN_SECRET, {expiresIn});
    createProfile(user)
    return res.json({user:{id: user.id,username,email}, token})
}
const login = async (req, res) => {
    let {username, email, password} = req.body
    const users = await prisma.user.findMany({
        where: {
            OR: [
                {username},
                {email}
            ]
        }
    })

    if (users.length > 0 ){
        let user = users[0]
        const valid = bcrypt.compare(password, user.password)
        if(!valid){
            return res.json("invalid credential")
        }else{
            const expiresIn = 2*24*3600 // 2 days
            const token = jwt.sign({userId: user.id}, process.env.TOKEN_SECRET, {expiresIn })
            const {id, username, email} = user
            createProfile(user)
            return res.json({user: {id, username, email}, token})
        }
    }else{
        return res.json("invalid credential")
    }
}

const changePassword = async (req, res) => {
    try {
        let {userId} = getUser(req)
        const findUser = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });
        if (!findUser) {
            return res.json({message: "user not found"}, 400);
        }
        const { old_password, new_password, confirm_password } = req.body;
        if (! (new_password === confirm_password) ) {
            return res.json({"message" : "Password doesnt match"}, 400);
        }
        if (bcrypt.compareSync(old_password, findUser.password)) {
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = await bcrypt.hash(new_password, salt)
            const updateUsers = await prisma.user.updateMany({
                where: {
                  id: userId,
                },
                data: {
                  password: hashedPassword,
                },
            })
            if (updateUsers) {
                return res.json({"message" : "New Password has been changed"}, 200);
            } else {
                return res.json({"message" : "Updating password fail"}, 400)
            }
        } else {
            return res.json({"message" : "old password doesnt match"}, 400);
        }
    } catch (error) {
        console.log(error);
    }
}
const createProfile = async (user)=>{
    const getProfiles = await prisma.profile.findMany({
      where: {
        user_id: user.id
      }
    })
    
    if (getProfiles.length === 0){
      try{
        const profile = await prisma.profile.create({
          data: {
            user_id: user.id
          }
        })  
      }catch(err){
        console.log(err)
      }
    }
  
  }
  
module.exports ={
    register, login,changePassword
  }
  