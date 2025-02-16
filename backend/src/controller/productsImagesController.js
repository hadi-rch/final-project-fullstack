// const { PrismaClient } = require('@prisma/client')
// const prisma = new PrismaClient()


// const getProductImages = async (req,res) => {
//  const image = await prisma.product_images.findMany()
//  return res.status(200).json(image)
// }

// const getProductImagesById = async (req, res) => {
//     try {
//         const response = await prisma.product_images.findFirstOrThrow({
//             where: {
//                 id: Number(req.params.id)
//             }
//         })
//         return res.status(200).json(response)
//     } catch (err) {
//         return res.status(404).json({error: err.message})
//     }
// }
// const createProductImages = async (req, res) =>{
//     const {name, image_url, products_id} = req.body;
//     if (!isValidUrl(image_url)) {
//         return res.status(400).json({ err: "image_url value is not URL" });
//     }else{
//         const response = await prisma.product_images.create({
//             data:{
//                 name : name,
//                 image_url : image_url,
//                 products_id : products_id
//             }
//         })
//         res.status(201).json(response);
//     }
// }
// const updateProductImages = async (req, res) => {
//     let {name, image_url, products_id}= req.body
//     if (!isValidUrl(image_url)) {
//         return res.status(400).json({ err: "image_url value is not URL" });
//     }else{
//         const response = await prisma.product_images.update({
//             where: {
//                 id: Number(req.params.id)
//             },
//             data:{
//                 name : name,
//                 image_url : image_url,
//                 products_id : products_id
//             }
//         })
//         res.status(201).json(response);
//     }
// }

// const deleteProductImages = async (req, res) => {
//     await prisma.product_images.delete({
//         where: {
//             id: Number(req.params.id)
//         }
//     })
      
//     res.json("image was successfully deleted")
//   }
  
// const isValidUrl = image_url=> {
//   try { 
//       return Boolean(new URL(image_url)); 
//   }
//   catch(e){ 
//       return false; 
//   }
// }
// module.exports ={
//     getProductImages,
//     getProductImagesById,
//     createProductImages,
//     updateProductImages,
//     deleteProductImages
//   }