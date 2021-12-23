var express = require('express')
var router = express.Router()
var userHelpers = require('../helpers/user-helpers')

// get admin panel 

router.get('/',(req,res)=>{

    userHelpers.getAllUsers().then((user)=>{
        console.log(user);
        res.render("admin",{user})
    })


})

module.exports = router;