let model_user = require('../models/user.model');
let model_cart = require('../models/cart.model');
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
//   let user = req.user;  
  let items = req.body.items;
  // let products = req.body.products;
  let totalCost = req.body.totalCost;
  let username = req.body.username;
  console.log({username,items,totalCost});
  let cart_details = await model_cart.create({username,items,totalCost});
  console.log(cart_details);
  res.json({cart_details}); 
});

router.get('/',async function(req,res,next){
  let user_cart_details = await model_cart.find();
  res.json({user_cart_details});
});

router.get('/usercart',authenticateUser,async function(req,res,next){
    let user = req.user;
    let cart_id = await model_cart.findOne({username:user.username}).select('_id');
    await model_user.findOneAndUpdate({username:user.username},{cart:cart_id});
    let user_cart_details = await model_cart.findOne({username:user.username});
    res.json({user_cart_details});
  });

router.put('/add',authenticateUser,async function(req,res,next){
let user = req.user;
let productId = req.body.productId;
let productName = req.body.productName;
let productImage = req.body.productImage;
let itemCost = req.body.itemCost;
let product = {
    productId: productId,
    productName: productName,
    productImage: productImage,
    itemCost: itemCost
}
    //   let user = req.user;
//   let cart_id = req.body.cart_id;
//   let cart = await model_cart.findOne({_id: cart_id});
function TotalCost(cart){
    let productCost = cart.map((product)=>{
      return product.quantity*product.itemCost;
    });
    return productCost.reduce((curr, acc)=> curr+acc,0);
  }
  let added_cart = await model_cart.findOneAndUpdate({username: user.username},{$push: {items:product}},{new:true});
  console.log("added_cart",added_cart.items);
  let updated_cart = await model_cart.findOneAndUpdate({username:user.username},{totalCost: TotalCost(added_cart.items)});
  console.log({updated_cart});
  res.json({updated_cart});
});

router.put('/remove',authenticateUser,async function(req,res,next){
    let user = req.user;
    let productId = req.body.productId;
    // let productName = req.body.productName;
    // let productImage = req.body.productImage;
    // let itemCost = req.body.itemCost;
    let product = {
        productId: productId
        // productName: productName,
        // productImage: productImage,
        // itemCost: itemCost
    }
        //   let user = req.user;
    //   let cart_id = req.body.cart_id;
    //   let cart = await model_cart.findOne({_id: cart_id});
    function TotalCost(cart){
        let productCost = cart.map((product)=>{
          return product.quantity*product.itemCost;
        });
        return productCost.reduce((curr, acc)=> curr+acc,0);
      }
      let removed_cart = await model_cart.findOneAndUpdate({username: user.username},{$pull: {items:product}},{new:true});
      console.log("removed_cart",removed_cart.items);
      let updated_cart = await model_cart.findOneAndUpdate({username:user.username},{totalCost: TotalCost(removed_cart.items)});
      console.log({updated_cart});
      res.json({updated_cart});
    });

router.put('/',authenticateUser,async function(req,res,next){
  let user = req.user;
  let quantity = req.body.quantity;
  let productId = req.body.productId;

  let cart_id = await model_cart.findOne({username:user.username}).select('_id');
  await model_user.findOneAndUpdate({username:user.username},{cart:cart_id});

  let update_product = await model_cart.findOne({username:user.username});
  console.log("updated product", update_product);
  let cart = update_product.items.map((product)=>{
    if(product.productId == productId){
      return {...product._doc, quantity: quantity}
    }
    return product;
  });
  console.log(cart);
  // update_product.quantity = count;
  function TotalCost(cart){
    let productCost = cart.map((product)=>{
      return product.quantity*product.itemCost;
    });
    return productCost.reduce((curr, acc)=> curr+acc,0);
  }
  let updated_cart = await model_cart.findOneAndUpdate({username:user.username},{items:cart,totalCost: TotalCost(cart)},{new:true});
  // console.log("cart ",updated_cart);
  // let updated_user_cart = await model_cart.findOneAndUpdate({user_name:user.user_name},{totalCost: TotalCost(cart),user_name:user.user_name});
  res.json({updated_cart});
});

module.exports = router