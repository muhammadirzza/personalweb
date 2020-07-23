const express=require('express')
const {emailControllers}=require('../controllers')
const router=express.Router()

router.post('/postemails', emailControllers.addemails)

module.exports=router
