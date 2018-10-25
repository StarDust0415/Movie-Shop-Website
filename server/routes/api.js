const express = require('express');
const app = express();
const mongoose = require('mongoose');
var Salesman = require("../Model/SalesmanModel");
var CustomerUser = require('../Model/UserModel.js');
var bodyParser = require("body-parser");
var Order = require('../Model/Order');
var Product = require('../Model/ProductModel')
mongoose.connect("mongodb://SimpleMovie:!123456@cluster0-shard-00-00-cikkm.mongodb.net:27017,cluster0-shard-00-01-cikkm.mongodb.net:27017,cluster0-shard-00-02-cikkm.mongodb.net:27017/SimpleMovie?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin");

// var newUser=Blog({
//   title:"first Article",
//   content:"try",
//   time:new Date()
// })
// newUser.save(function(err) {
//   if (err) throw err;
//
//   console.log('Blog created!');
// });
const router = express.Router();
app.use(bodyParser.json());
router.get('/login', (req, res) => {
    CustomerUser.find({}, function(err, users) {
        console.log(users);
        res.status(200).json(users);
    });
});
router.get('/salesman', (req, res) => {
    Salesman.find({}, { shopName: 1 }, function(err, salesman) {
        res.status(200).json(salesman);
    });
});
router.get('/productlist', (req, res) => {
    var query = {};
    if (req.query.salesmanId && req.query.salesmanId !== "all") {
        query.salesmanId = req.query.salesmanId;
    }
    if (req.query.type && req.query.type !== "all") {
        query.type = req.query.type;
    }
    if (req.query.text && req.query.text !== "all") {
        query.productname = { $regex: req.query.text };
    }
    var page = Number(req.query.page)
    Product.find(query, function(err, products) {
            res.status(200).json(products);
        })
        .skip(page * 15).limit(15);

});
router.post('/orderlist', (req, res) => {
    Order.upload(req.body, res);
});
router.post('/order1', (req, res) => {
    Order.confirm(req.body, res);
});
router.post('/order2', (req, res) => {
    Order.cancel(req.body, res);
});
router.post('/getShoppingCart', (req, res) => {
    if (req.body._id === 0) {
        CustomerUser.update({}, {
            $set: { shoppingCart: req.body.productList }
        }, function(err, result) {
            if (err) throw err;
            console.log(result);
        });
    } else {
        CustomerUser.update({ _id: req.body._id }, {
            $set: { shoppingCart: req.body.productList }
        }, function(err, result) {
            if (err) throw err;
            console.log(result)
            res.status(200).json("successfully!");
        });
    }
});
router.post("/comment", (req, res) => {
    console.log(req.body);
    Product.update({ _id: req.body._id }, {
        $push: {
            comments: {
                rate: req.body.rate,
                name: req.body.name,
                content: req.body.content
            }
        }
    }, function(err, result) {
        if (err) throw err;
        res.status(200).json("You have commented successfully!");
    })
});
router.get("/getProduct", (req, res) => {
    let result = req.query._id;
    Product.find({ _id: result }, function(err, product) {
        res.status(200).json(product[0]);
    });
})

router.post('/createUser', (req, res) => {
    console.log(req.body);
    if (req.body.type === "Customer") {
        CustomerUser.update({ userName: req.body.userName }, {
            $set: { password: req.body.password, orders: [] }
        }, { upsert: true }, function(err, result) {
            if (err) throw err;
            res.status(200).send(result);
        });
    } else {
        Salesman.update({ userName: req.body.userName }, {
            $set: { passsword: req.body.password, shopName: req.body.shopName }
        }, { upsert: true }, function(err, result) {
            if (err) throw err;
            res.status(200).send(result);
        });
    }
});
router.get('/getShoppingCart', (req, res) => {
    let result = req.query._id;
    CustomerUser.find({ userName: result }, { shoppingCart: 1 }, function(err, user) {
        res.status(200).json(user);
    });
});
module.exports = router;