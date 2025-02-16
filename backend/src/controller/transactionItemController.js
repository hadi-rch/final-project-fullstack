const { PrismaClient } = require('@prisma/client')
const { getUser } = require('../utils/helper')

const prisma = new PrismaClient()


const getTransactionItem= async(req,res)=>{
  const transactionItem = await prisma.transactionsItems.findMany()
  return res.status(200).json(transactionItem)
  
}

const getTransactionItemById=async(req,res)=>{
  let {id} = req.params
  try {
    const transactionItem = await prisma.transactionsItems.findFirstOrThrow({
      where:{
        id: parseInt(id)
      }
    })
    res.json(transactionItem)
  } catch (err) {
    return res.status(404).json({error: err.message})
  }
}

const createTransactionItem = async (req, res)=>{
  let {userId} = getUser(req)
  let  {quantity,products_id} = req.body
  const transactionItem = await prisma.transactionsItems.create({
    data:{
        quantity,
        user_id:userId,
        products_id
    }
  })
  return res.json(transactionItem)
}


const updateTransactionItem = async (req, res)=>{
  let {userId} = getUser(req)
  let {id}= req.params
  id = parseInt(id)

  let  {quantity,products_id} = req.body
    const transactionItem = await prisma.transactionsItems.update({
      data:{
        quantity,products_id, user_id:userId
      },
      where:{
        id
      }
    //   include: {
    //     product_images: true
    //   }
    })
    res.json(transactionItem)
}

const deleteTransactionItem = async (req, res)=>{
  let {id}= req.params 
  id = parseInt(id)
  try{
    const transactionItem = await prisma.transactionsItems.findFirstOrThrow({
      where:{
        id
      }
    //   include: {
    
    //   }
    })
    
    await prisma.transactionsItems.delete({
      where: {
        id: parseInt(id)
      }
    })
    
    res.json("transactionItems was sucesfully deleted")
  }catch(err){
    res.json({err})
  }

}
module.exports ={
  getTransactionItem,
  getTransactionItemById,
  createTransactionItem,
  updateTransactionItem,
  deleteTransactionItem
}