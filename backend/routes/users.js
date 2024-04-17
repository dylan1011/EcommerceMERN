var express = require('express');
var router = express.Router();
let model_user = require('../models/user.model');
const authenticateUser = require('../authentication/authentication');
const {secretKey} = require('../authentication/config')
const jwt = require('jsonwebtoken');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  res.render('Users', { title: 'Express' });
});

router.post('/signup', async function(req, res, next) {
    // res.render('index', { title: 'Express' });
    let username = req.body.username;
    let password = req.body.password;
    let emailId = req.body.emailId;
    let phoneNo = req.body.phoneNo;
    let address1 = req.body.address1;
    let address2 = req.body.address2;
    let isAdmin = req.body.isAdmin;
    let cart = req.body.cart;
    console.log({username, password, emailId, phoneNo, address1, address2, isAdmin, cart});
    let userDetails = await model_user.create({username, password, emailId, phoneNo, address1, address2, isAdmin, cart});
    console.log({userDetails});
    res.json({userDetails});
  });

// router.get('/signup', function(req, res, next) {
//     // res.render('index', { title: 'Express' });

// });

router.post('/login', async function(req, res, next) {
    // res.render('index', { title: 'Express' });
    // const {username, password} = req.body;
  let username = req.body.username;
  let password = req.body.password;

  // Validating user Credentials
  if (!username || !password){
    return res.status(400).json({message: 'Please provide both credentials.'});
  }

  // Finding the user in the signup database
  // const user = await model_user.find(u => u.username === username && u.password === password);
  let user = await model_user.findOne({username: username, password: password});
  if (!user){
    return res.status(401).json({message: 'Invalid Credentials.'});
  }

  // Creating a JWT token
  const token = jwt.sign({user: {username: user.username, user_email: user.emailId}}, secretKey);
  console.log(token,secretKey);
  res.json({token,admin:user.isAdmin});
});


router.get('/login', authenticateUser,async function(req, res, next) {
    // res.render('index', { title: 'Express' });
    res.json({user: req.user, message: "Acess granted to this protected route"}); 
});

router.get('/profile', async function(req, res, next) {
  // res.send('respond with a resource');
  let user_profile = await model_user.find();
  res.json({user_profile});
});

router.post('/admin', async function(req, res, next) {
  // res.render('Users', { title: 'Express' });
  let userList = await model_user.find();
  console.log({userList});
  res.json({userList});
});

router.put('/admin', async function(req, res, next) {
  // res.render('Users', { title: 'Express' });
  let userList = await model_user.find();
  console.log({userList});
  res.json({userList});
});

router.get('/admin', async function(req, res, next) {
  res.render('Users', { title: 'Express' });
});

module.exports = router;