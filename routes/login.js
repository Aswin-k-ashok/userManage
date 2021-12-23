var express = require('express');
var router = express.Router();
var userHelpers = require('../helpers/user-helpers')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.get('/signup',(req,res)=>{
  res.render('signup')
})

router.post('/signup',(req,res)=>{
  

  userHelpers.addUser(req.body,(result)=>{
    
    res.send("data added")
    
  })


})



module.exports = router;
