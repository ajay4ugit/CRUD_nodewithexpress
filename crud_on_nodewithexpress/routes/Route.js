const express=require('express')
const router=express.Router();
const fs=require('fs')
const vendorRoutes = require("../Vendor")


router.use(vendorRoutes) // use vendor route

module.exports=router;
