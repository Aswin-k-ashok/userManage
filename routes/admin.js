var express = require('express')
var router = express.Router()

// get admin panel 

router.get('/',(req,res)=>{
    res.render("admin")
})

module.exports = router;