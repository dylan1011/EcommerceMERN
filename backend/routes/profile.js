var express = require('express');
var router = express.Router();
let product_model = require('../models/product.model');
let user_model = require('../models/user.model');
let cart_model = require('../models/cart.model');
let authenticateUser = require('../authentication/authentication');
let mongoose = require('mongoose');

/* GET users listing. */
router.get('/user', authenticateUser, async function(req, res, next) {
  // res.send('respond with a resource');
  let user = req.user;
  let user_profile = await user_model.findOne({username:user.username});
  res.json({user_profile});
});

// router.post('/user/cart', async function(req, res, next) {   
//     let addToCart = await cart_model.create.findOne({productId: productId}).populate();
//     console.log({addToCart});
//     res.json({addToCart});
// });

// router.put('/user/cart', async function(req, res, next) {   
//   let updateCart = await cart_model.updateMany({}).populate;
//   console.log({updateCart});
//   res.json({updateCart});
// });

// router.get('/user/cart', async function(req, res, next) {
//   let cartItems = await cart_model.create.find();
//   console.log({cartItems});
//   res.json(cartItems);
// });

router.get('/cart', authenticateUser, async function(req, res, next) {
  // res.send('respond with a resource');
  const username = req.body.username;
  const userCart = userCarts[username] || [];
  res.json({userCart});
});

router.post('/cart/add', authenticateUser, async function(req, res, next) {
  const {username, productId, quantity } = req.body;
  const product = products.find(p => p.id === productId);
  const userCart = userCarts[username] || [];
  userCart.push({...product , quantity});
  userCart[username] = userCart;
  console.group({userCart})
  res.json({userCart});
});

router.put('/cart/update', authenticateUser, async function(req, res, next) {
  // res.send('respond with a resource');
  const { username , productId , quantity } = req.body;
  const userCart = userCarts[username] || [];
  const updatedCart = userCart.map(item => {
    if (item.id === productId) {
      return {...item, quantity};
    }
    return item;
  });
  userCarts[username] = updatedCart;
  console.log({updatedCart});
  res.json({updatedCart});
});

router.delete('/cart/remove', authenticateUser, async function(req, res, next) {
  const {userId , productId , quantity} = req.body;
  const userCart = userCarts[username] || [];
  const updatedCart = userCart.filter(item => item.id !== productId);
  userCarts[username] = updatedCart;
  res.json({updatedCart});
  console.log({updatedCart});
});

router.get('/products/all', authenticateUser, async function(req, res, next){
  let productList = await product_model.find();
  console.log({productList});
  res.json({productList});
});

module.exports = router;
