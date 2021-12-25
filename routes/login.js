var express = require('express');
const {
  response
} = require('../app');
var router = express.Router();
var userHelpers = require('../helpers/user-helpers')

/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.session.loggedIn) {
    res.redirect('/home')
  } else {

    res.render('login',{"loginErr":req.session.loginErr});
    req.session.loginErr = false
  }
});

router.get('/home', (req, res) => {
  let user = req.session.user
  var admin = false
  console.log(user, "user data",admin)
  res.render('home', {
    user,admin
  })
})

router.post('/', (req, res) => {    //admin login
  console.log(req.body)
  if (req.body.mail == "admin@a.com" ) {
    userHelpers.doLogin(req.body).then((response) => {
      if (response.status) {
        req.session.loggedIn = true
        req.session.loginErr = true
        req.session.user = response.user
        console.log("from the other admin router")
      
         res.redirect('/admin')
      } else {
        console.log(req.session.loginErr)
        res.redirect('/')
      }
    })

  } else {
    userHelpers.doLogin(req.body).then((response) => {   //user login
      if (response.status) {
        req.session.loggedIn = true
        req.session.user = response.user
        res.redirect('/home')
      } else {
        req.session.loginErr = true
        res.redirect('/')
      }
    })
  }



})

router.get('/logOut', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})


router.get('/signup', (req, res) => {
  var admin = false 
  res.render('signup',{admin})
  console.log(admin ,"from sign up rute")
});




router.post('/signup', (req, res) => {

if(req.body.mail =="" && req.body.fname == "" && req.body.lname== "" && req.body.password ==""){
  res.send('form validation error')
}
else{
  userHelpers.doSignup(req.body).then((response) => {
    if (response == true) {
      res.redirect('/')
    }
    console.log(response)
  })
}

})






module.exports = router;