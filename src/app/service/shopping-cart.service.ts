import { Injectable } from '@angular/core';
import {UserService} from "./User.service";
import {Http} from "@angular/http";
import {OrderProduct} from "../Model/CustomerModel";
import {Product} from "../Model/ProductModel";
@Injectable()
export class ShoppingCartService {
  productList:OrderProduct[]=[];

  constructor(private user:UserService,private http:Http) {

  }
  addProduct(quantity:number,product:OrderProduct,callback?){
    let flag=false;
    for (let i=0;i<this.productList.length;i++) {
      let sum: number = 0;
      if (this.productList[i]._id === product._id) {
        let sum: number = 0;
        sum += Number(quantity);
        sum += Number(this.productList[i].quantity);
        this.updateProduct(product, sum);
        return;
      }
    }
        let newProduct=new OrderProduct();
        newProduct=product;
        this.productList.push(newProduct);
        console.log(this.productList);
        this.updateDB();
        if (callback) callback();
  }


  getAllCart():Promise<any>{
    //we need to find out whether or not it is the first time to configure,the reason why we can't place it in constructor is that it is
    //not gurantted when calling getAllCart the productlist has been available(since the time)
    if (this.productList.length==0 &&this.user.getUser()===null){
      return new Promise((res,rej)=>{
          this.productList=JSON.parse(localStorage.getItem("shoppingCart"));
          if (this.productList==null) this.productList=[];
          res(this.productList);
            }
          );
      }else{
        return new Promise((res,rej)=>{
          res(this.productList);
        })
      }
  }
  updateProduct(orderProduct:OrderProduct,quantity:number,callback?){
    for (let i=0;i<this.productList.length;i++){
      if (this.productList[i]._id===orderProduct._id){
        this.productList[i].quantity=quantity;
      }
    }
    this.updateDB();
    if (callback) callback();
  }
  updateDB(){
    if (this.user.getUser()===null || this.user.getUser()===undefined){
      localStorage.setItem("shoppingCart",JSON.stringify(this.productList));
    }else{
      console.log(this.productList);
      this.http.post("/api/getShoppingCart",{_id:this.user.getUser()._id,productList:this.productList}).subscribe();
    }
  }
  clear(){
    this.productList=[];
    this.updateDB();
  }
  removeProduct(orderProduct:Product,callback?){
    var target=0;
    for (let i=0;i<this.productList.length;i++){
      if (this.productList[i].productname===orderProduct.productname){
        target=i;
        break;
      }
    }
    this.productList.splice(target,1);
    this.updateDB();
    if(callback) callback();
  }

}
