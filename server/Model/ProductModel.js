const express = require('express');
const mongoose=require('mongoose');
var Schema=mongoose.Schema;
var Comment=new Schema({
  name:String,
  content:String,
  rate:Number
})
var Product=new Schema({
  salesmanId:String,
  productname:String,
  productDescription: String,
  stock: Number,
  imgUrl: String,
  price:Number,
  type:String,
  comments:[Comment],
});
var Product=mongoose.model('Product',Product);
module.exports=Product;
