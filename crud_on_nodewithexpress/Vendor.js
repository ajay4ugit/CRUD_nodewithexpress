const express = require("express")
const vendorRoutes = express.Router();
const fs = require('fs');

const dataPath = './Details/Vendor.json'


// util functions
const saveVendorData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync(dataPath, stringifyData)
}
const getVendorData = () => {
    const jsonData = fs.readFileSync(dataPath)
    return JSON.parse(jsonData)   
}

// Read - get all vendors from the json file
vendorRoutes.get('/vendor/list', (req, res) => {
  try{
    const vendorlist = getVendorData()
    res.send(vendorlist)
  }
  catch(error){
    res.status(500).json({error:error})
  }
  })

  //Create- post vendor details
  vendorRoutes.post('/vendor/add', (req, res) => {
 try{
    var existVendor = getVendorData()
    const newVendorId = Math.floor(100000 + Math.random() * 900000) 
    if(!newVendorId)
    {
      res.status(400).json({msg:"venodrId not found"})
    }
    existVendor[newVendorId] = req.body   
    console.log(existVendor);
    saveVendorData(existVendor);
    res.send({success: true, msg: 'vendor added successfully'})
 }
 catch(error)
 {
  res.status(500).json({error:error});
 }
})

//update vendor details
vendorRoutes.put('/vendor/:id', (req, res) => {
  try{
    var existVendors = getVendorData()
    fs.readFile(dataPath, 'utf8', (err, data) => {
      const vendorId = req.params['id'];
      if(!vendorId)
      {
        res.status(400).json({msg:"vendor Id is not found"})
      }
      existVendors[vendorId] = req.body;
      saveVendorData(existVendors);
      res.send(`accounts with id ${vendorId} has been updated`)
    }, true);
  }
  catch(error){
    res.status(500).json({error:error})
  }
  });

//delete Vendor record
  vendorRoutes.delete('/vendor/delete/:id', (req, res) => {
    try{
    fs.readFile(dataPath, 'utf8', (err, data) => {
      var existVendors = getVendorData()
      const userId = req.params['id'];
      if(!userId)
      {
        res.status(400).json({msg:"userId is not found"})
      }
      delete existVendors[userId]; 
      saveVendorData(existVendors);
      res.send(`accounts with id ${userId} has been deleted`)
    }, true);
  }
  catch(error)
  {
    res.json(500).json({error:error})
  }
  })

module.exports = vendorRoutes