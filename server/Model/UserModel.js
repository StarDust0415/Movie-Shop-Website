const express = require('express');
const mongoose=require('mongoose');
var Schema=mongoose.Schema;
var Order=new Schema({
    status:String,
    orderProduct:[{
      name:{
        type:String,
        alias:"productname"
      },
      description:{
        type:String,
        alias:"productDescription"
      },
      imgURL:{
        type:String,
        alias:"imgUrl"
      },
      quantity:Number,
      price:Number,
    }]
}
  );
var CustomerUser=new Schema({
  userName:String,
  password:String,
  orders:[Order],
  shoppingCart:{
    orderProduct:[{
      name:{
        type:String,
        alias:"productname"
      },
      description:{
        type:String,
        alias:"productDescription"
      },
      imgURL:{
        type:String,
        alias:"imgUrl"
      },
      quantity:Number,
      price:Number,
      salesmanId:String
    }]
  }
})

var User=mongoose.model("customerusers",CustomerUser);
module.exports=User;

