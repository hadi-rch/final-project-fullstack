const { PrismaClient } = require('@prisma/client')
const { getUser } = require('../utils/helper')

const prisma = new PrismaClient()


const getTransaction= async(req,res)=>{
  const transaction = await prisma.transactions.findMany()
  const response = JSON.stringify(
    transaction,
    (key, value) => (typeof value === 'bigint' ? value.toString() : value) // return everything else unchanged
  )
  return res.status(200).json(JSON.parse(response));
  
}

const getTransactionById=async(req,res)=>{
  let {id} = req.params
  try {
    const transaction = await prisma.transactions.findFirstOrThrow({
      where:{
        id: parseInt(id)
      }
    })
    const response = JSON.stringify(
        transaction,
        (key, value) => (typeof value === 'bigint' ? value.toString() : value) // return everything else unchanged
      )

      return res.status(200).json(JSON.parse(response));
  } catch (err) {
    return res.status(404).json({error: err.message})
  }
}

const createTransaction = async (req, res)=>{
  let {userId} = getUser(req)
  let  {fullAddress,recipient,phone_number,total_price,courier,status,payment,cart_id} = req.body
  const transaction = await prisma.transactions.create({
    data:{ 
        fullAddress,recipient,phone_number,
        total_price : BigInt(total_price),
        courier,status,payment,cart_id,user_id:userId
    }
  })
    const response = JSON.stringify(
    transaction,
    (key, value) => (typeof value === 'bigint' ? value.toString() : value) // return everything else unchanged
  )
  return res.status(200).json(JSON.parse(response));
}


const updateTransaction = async (req, res)=>{
  let {userId} = getUser(req)
  let {id}= req.params
  id = parseInt(id)

  let  {fullAddress,recipient,phone_number,total_price,courier,status,payment,cart_id} = req.body
    const transaction = await prisma.transactions.update({
      data:{
        fullAddress,recipient,phone_number,
        total_price : BigInt(total_price),
        courier,status,payment,cart_id,user_id:userId
      },
      where:{
        id
      }
    })
    const response = JSON.stringify(
        transaction,
        (key, value) => (typeof value === 'bigint' ? value.toString() : value) // return everything else unchanged
      )
      return res.status(200).json(JSON.parse(response));
}


module.exports ={
  getTransaction,
  getTransactionById,
  createTransaction,
  updateTransaction
}

