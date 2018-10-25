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
  comments:[Comment]
});
var Sales=new Schema({
  userName:String,
  password:String,
  shopName:String,
})
// var connection=mongoose.createConnection('mongodb://marioshopping:marioshopping@cluster0-shard-00-00-1z9zg.mongodb.net:27017,cluster0-shard-00-01-1z9zg.mongodb.net:27017,cluster0-shard-00-02-1z9zg.mongodb.net:27017/shopping?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin');
var SalesMan=mongoose.model('Salesman',Sales);
module.exports=SalesMan;
