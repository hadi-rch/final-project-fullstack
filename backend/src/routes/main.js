const express =  require('express')
const router = express.Router();
const { changePassword, login, register } = require('../controller/authController')
const { createProducts, deleteProducts, getProducts, getProductsById, updateProducts } = require('../controller/productsController')
const { getProfile, updateProfile } = require('../controller/profileController')
const { createTransaction, getTransaction, getTransactionById, updateTransaction } = require('../controller/transactionController')
const { createTransactionItem, deleteTransactionItem, getTransactionItem, getTransactionItemById, updateTransactionItem } = require('../controller/transactionItemController')
const { jwtAuth } = require('../middleware/auth')


router.get('/',(req,res)=>{
    return res.json({info: "This is root page"})
})

router.post('/api/register',register)
router.post('/api/login',login)
router.post('/api/change-password',changePassword)

router.get('/api/profile',jwtAuth,getProfile)
router.put('/api/profile',jwtAuth,updateProfile)

router.get('/api/product',getProducts)
router.post('/api/product',jwtAuth,createProducts)
router.get('/api/product/:id',getProductsById)
router.put('/api/product/:id',jwtAuth,updateProducts)
router.delete('/api/product/:id',jwtAuth,deleteProducts) 

router.get('/api/transaction-item',getTransactionItem)
router.post('/api/transaction-item',jwtAuth,createTransactionItem)
router.get('/api/transaction-item/:id',getTransactionItemById)
router.put('/api/transaction-item/:id',jwtAuth,updateTransactionItem)
router.delete('/api/transaction-item/:id',jwtAuth,deleteTransactionItem)

router.get('/api/transaction',getTransaction)
router.post('/api/transaction',jwtAuth,createTransaction)
router.get('/api/transaction/:id',getTransactionById)
router.put('/api/transaction/:id',jwtAuth,updateTransaction)
module.exports = router;