var express=require("express");
var mongoose=require("mongoose");
mongoose.connect("mongodb://marioshopping:marioshopping@cluster0-shard-00-00-1z9zg.mongodb.net:27017,cluster0-shard-00-01-1z9zg.mongodb.net:27017,cluster0-shard-00-02-1z9zg.mongodb.net:27017/shopping?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin");
var Salesman=require('./SalesmanModel');

var addProduct=function (shopName,productName,productDescription,stock,price,imgUrl) {
  Salesman.update({shopName:shopName}, {
    $push: {
      productList: {
        productname: productName,
        productDescription: productDescription,
        stock: stock,
        price:price,
        imgUrl: imgUrl,
        comments: []
      }
    }
  },function (err,result) {
    if (err) throw err;
    console.log(result);}
    )};
addProduct("MarioShopping","wine"," an alcoholic beverage made from grapes, generally Vitis vinifera, fermented without the addition of sugars, acids, enzymes, water, or other nutrients",65,33,"");
// var addComment=function (shopName,productName,name,content,rate) {
//   Salesman.update({"shopName":shopName,"productList.productname":productName},
//     {$push:{
//       "productList.$.comments":{
//         name:name,
//         content:content,
//         rate:rate
//       }
//     }},function (err,result) {
//       if (err) throw err;
//       console.log(result);
//     }
//   )
// };
// addComment("liang","headphone","Leon","I like this earphone!",4);
// Salesman.findById(saleman._id,function (err,result) {
//   if (err)
//   console.log(result);
//   result.set({userName:"yun"});
// })
Salesman.update({userName:"liang"},{
  $push:{
    productList:{
      productname:"shower Gel",
      productDescription:"liquid product used for cleaning the body",
      stock:55,
      price:11,
      imgUrl:"",
      comments:[]
    }
  }
},function (err,result) {
  if (err) throw err;
  console.log(result);
});
Salesman.update({userName:"liang"},{
  $push:{
    productList:{
      productname:"headphone",
      productDescription:"a pair of small loudspeaker drivers that are designed to be worn on or around the head over a user's ears",
      stock:33,
      price:12,
      imgUrl:"",
      comments:[]
    }
  }
},function (err,result) {
  if (err) throw err;
  console.log(result);}
  );

