var express = require('express')
var router = express.Router()
var userHelpers = require('../helpers/user-helpers')
var adminHelpers = require('../helpers/admin-helpers')
const { response } = require('express')
const async = require('hbs/lib/async')
const session = require('express-session')

// get admin panel 

router.get('/',(req,res)=>{


    userHelpers.getAllUsers().then((user)=>{
        let admin = true;
        console.log("from the admin router",admin)
        res.render("admin",{user,admin})
    })


})

router.get('/adminLogin',(req,res)=>{
  res.render('adminLogin')
})

router.post('/adminLogin',(req,res)=>{
  if(req.body.mail == "admin@a.com" && req.body.password == "admin"){
    session=req.session ;
    res.redirect('/admin')
  }
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

router.get('/editUser/:id',async(req,res)=>{
  let user =await adminHelpers.getUser(req.params.id)
  console.log(user)
  res.render('editUser',{user})
})

router.post('/updateUser/:id',(req,res)=>{
  adminHelpers.updateUser(req.params.id,req.body).then(()=>{
    res.redirect('/admin')
  })
})

router.get('/disable-user/:id',(req,res)=>{
  console.log(req.params.id)
  adminHelpers.disableUser(req.params.id).then((disable)=>{
    res.redirect('/admin')
  })
})

router.get('/enable-user/:id',(req,res)=>{
  console.log(req.params.id)
  adminHelpers.enableUser(req.params.id).then((enable)=>{
    res.redirect('/admin')
  })
})


router.get('/deleteUser/:id',(req,res)=>{
  let UserId = req.params.id
  adminHelpers.deleteUser(UserId).then((response)=>{
    res.redirect('/admin')
  })
})


  



module.exports = router;