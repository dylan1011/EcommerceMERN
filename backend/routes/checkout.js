let model_user = require('../models/user.model');
let model_cart = require('../models/cart.model');
let model_checkout = require('../models/checkout.model');
var mongoose = require('mongoose');
var express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const authenticateUser = require('../authentication/authentication');
const {secretKey} = require('../authentication/config');
var router = express.Router();

// router.get('/', function(req, res, next) {
//     res.send('respond with a cart');
//   });

router.post('/',async function (req, res, next){
    // let user = req.user;
    let cartItem = req.body.cartItem;
    let paymentMethod = req.body.paymentMethod;
    let username = req.body.username;
    console.log({cartItem,paymentMethod,username});
    let checkout_details = await model_checkout.create({cartItem,paymentMethod,username});
    console.log(checkout_details);
    res.json({checkout_details}); 
});

router.get('/', authenticateUser,async function (req,res,next){
  let user = req.user;
  let cart_id = await model_cart.findOne({username:user.username}).select('_id');
  console.log("cart id", cart_id);
  let user_checkout = await model_checkout.findOneAndUpdate({username:user.username},{cartItem:cart_id});
  res.json({user_checkout});
});

// router.put('/', authenticateUser,async function (req,res,next){
//   let user = req.user;
//   let count = req.body.count;
//   let user_checkout = await model_cart.findOneAndUpdate({user_name:user.user_name},{});
//   res.json({user_checkout});
// });

router.get('/user/checkout', authenticateUser,async function (req,res,next){
  let user = req.user;
  let cart_id = await model_cart.findOne({username:user.username}).select('_id');
  console.log("cart id", cart_id);
  let checkout_id = await model_checkout.findOne({username:user.username}).select('_id');
  console.log("checkout id ",checkout_id);
  await model_user.findOneAndUpdate({username:user.username},{checkout: checkout_id});
  let user_checkout = await model_checkout.findOneAndUpdate({username:user.username},{cartItem:cart_id}).populate("cartItem");
  res.json({user_checkout});
});

module.exports = router