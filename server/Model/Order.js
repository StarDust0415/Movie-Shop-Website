var express = require("express");
var mongoose = require("mongoose");
var Salesman = require('./SalesmanModel');
var Customer = require('./UserModel');
var Product = require('./ProductModel')
var bodyParser = require("body-parser");
var confirm = function(req, res) {
        Customer.update({
            "_id": req['userID'],
            "orders._id": req['_id']
        }, {
            $set: {
                "orders.$.status": "completed"
            }
        }, function(err, result) {
            if (err) throw err;
            res.status(200).json(result);
        });
    }
    // var validate = function(req, res) {
    //     return new Promise(function(resolve, reject) {
    //         var info = "";
    //         let sum = 0;
    //         for (let i = 0; i < req["orderProduct"].length; i++) {
    //             let t = i;
    //             Product.find({ '_id': req["orderProduct"][t]._id }, (err, result) => {
    //                     console.log(t);
    //                     if (err) throw err;
    //                     if (result[0].stock < req["orderProduct"][t].quantity) {
    //                         info = info + "The stock of " + result[0].productname + " is only " + result[0].stock + "!\n";
    //                     }
    //                     sum++;

//                     if (sum === req["orderProduct"].length) {
//                         res.json(info);
//                         if (info === "") {
//                             resolve(req, res);
//                         } else {
//                             reject();
//                         }
//                     }
//                 } //find salesman for each product,it's redundant but i have completed the previous work and i don't want to change i
//             );
//         }

//     });
// };




function cancel(req, res) {
    Customer.find({ "_id": req['userID'] }, function(err, result) {
        for (let j = 0; j < result[0]['orders'].length; j++) {
            if (result[0]['orders'][j]._id == req['_id']) {
                for (let t = 0; t < result[0]['orders'][j].length; t++) {
                    Product.update({
                        '_id': result[0]['orders'][j][t]._id
                    }, {
                        $inc: { 'stock': result[0]['orders'][j][t].quantity }
                    }, function(err, result) {
                        if (err) throw err;
                    });
                }
            }
        }
    });
    Customer.update({
        "_id": req['userID']
    }, {
        $pull: {
            "orders": {
                status: "pending",
                _id: req['_id']
            }
        }
    }, function(err, result) {
        if (err) throw err;
        res.status(200).json("Successfully!");
    });
}

function OrderUpload(req, res) {
    
    Customer.update({
        "_id": req['id']
    }, {
        $push: {
            "orders": {
                orderProduct: req['orderProduct'],
                status: "pending"
            }
        }
    }, function(err, result) {
        if (err) throw err;
        res.json("Successfully!");
    });
  
}

var Order = {};
Order.upload = OrderUpload;
Order.confirm = confirm;
Order.cancel = cancel;
module.exports = Order;