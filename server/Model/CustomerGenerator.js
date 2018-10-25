var express=require("express");
var mongoose=require("mongoose");
mongoose.connect("mongodb://marioshopping:marioshopping@cluster0-shard-00-00-1z9zg.mongodb.net:27017,cluster0-shard-00-01-1z9zg.mongodb.net:27017,cluster0-shard-00-02-1z9zg.mongodb.net:27017/shopping?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin");
var CustomerUser=require('./UserModel');
var addCustomer=function (userName,password) {
  var v=new CustomerUser({//can not use let,the reason require more effort
    userName:userName,
    password:password,
    orders:[]
  }).save(function (err) {
    if (err) throw err;
  })
  console.log(v);
}
addCustomer("yun","li");

