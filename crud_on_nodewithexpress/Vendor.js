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
    const vendorlist = getVendorData()
    res.send(vendorlist)
  })

  //Create- post vendor details
  vendorRoutes.post('/vendor/add', (req, res) => {
 
    var existVendor = getVendorData()
    const newVendorId = Math.floor(100000 + Math.random() * 900000)
 
    existVendor[newVendorId] = req.body
   
    console.log(existVendor);
    saveVendorData(existVendor);
    res.send({success: true, msg: 'vendor added successfully'})
})

//update vendor details
vendorRoutes.put('/vendor/:id', (req, res) => {
    var existVendors = getVendorData()
    fs.readFile(dataPath, 'utf8', (err, data) => {
      const vendorId = req.params['id'];
      existVendors[vendorId] = req.body;
      saveVendorData(existVendors);
      res.send(`accounts with id ${vendorId} has been updated`)
    }, true);
  });

//delete Vendor record
  vendorRoutes.delete('/vendor/delete/:id', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      var existVendors = getVendorData()
      const userId = req.params['id'];
      delete existVendors[userId]; 
      saveVendorData(existVendors);
      res.send(`accounts with id ${userId} has been deleted`)
    }, true);
  })

module.exports = vendorRoutes