const { PrismaClient } = require('@prisma/client')
const { getUser } = require('../utils/helper')



const prisma = new PrismaClient()


const getProducts= async(req,res)=>{
  const allProducts = await prisma.products.findMany()
  return res.status(200).json(allProducts)
  
}

const getProductsById=async(req,res)=>{
  let {id} = req.params
  try {
    const product = await prisma.products.findFirstOrThrow({
      where:{
        id: parseInt(id)
      },
      // include: {
      //   images: true
      // }
    })
    res.json(product)
  } catch (err) {
    return res.status(404).json({error: err.message})
  }
}

const createProducts = async (req, res)=>{
  let {userId} = getUser(req)
  let  {productName, category, quantity,image, price, color, description} = req.body
  const products = await prisma.products.create({
    data:{
        productName, category, quantity,image, price, color, description, user_id:userId
    }
  })
  return res.json(products)
}


const updateProducts = async (req, res)=>{
  let {userId} = getUser(req)
  let {id}= req.params
  id = parseInt(id)

  let  {productName, category, quantity, price, color, description,image} = req.body
    const products = await prisma.products.update({
      data:{
        productName, category, quantity, price, color, description, user_id:userId,image
      },
      where:{
        id
      }
    })
    res.json(products)
}

const deleteProducts = async (req, res)=>{
  let {id}= req.params 
  id = parseInt(id)
  try{
    const product = await prisma.products.findFirstOrThrow({
      where:{
        id
      }
    })
    
    await prisma.products.delete({
      where: {
        id: parseInt(id)
      }
    })
    
    res.json("products was sucesfully deleted")
  }catch(err){
    res.json({err})
  }

}
module.exports ={
  getProducts,
  getProductsById,
  createProducts,
  updateProducts,
  deleteProducts
}


