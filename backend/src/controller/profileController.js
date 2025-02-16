const { PrismaClient } = require('@prisma/client')
const { getUser } = require('../utils/helper')
const prisma = new PrismaClient()


const getProfile = async (req, res) => {
    let { userId } = getUser(req);
    try{
      const profile = await prisma.profile.findFirstOrThrow({where: { user_id: userId }})
      return res.status(200).json(profile)
    }catch (err){
      return res.status(404).json({error: err})
    }
}

const updateProfile = async (req, res) => {
    let { userId } = getUser(req);
    let { address, firstName, lastName, city, birth_date } = req.body;

    try {
        const profile = await prisma.profile.update({
            where: {user_id: userId},
            data: {
                address, firstName, lastName, city, birth_date: new Date(birth_date), user_id: userId,
            }
        })
        return res.status(200).json(profile);
    } catch(err) {
        return res.status(404).json({error: err})
    }
}
  
module.exports ={
    getProfile,
    updateProfile
  }