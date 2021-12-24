var express = require('express')
var router = express.Router()
var userHelpers = require('../helpers/user-helpers')

// get admin panel 

router.get('/',(req,res)=>{


    userHelpers.getAllUsers().then((user)=>{
        let admin = true;
        console.log("from the admin router",admin)
        res.render("admin",{user,admin})
    })


})

router.get('/addUser',(req,res)=>{
    res.render('addUser')
})

router.post('/addUser', (req, res) => {
    userHelpers.doSignup(req.body).then((response) => {
      if (response == true) {
        res.redirect('/admin')
      }
      console.log(response)
    })
  })
  



module.exports = router;