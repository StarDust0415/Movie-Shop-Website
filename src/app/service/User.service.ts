import { Injectable } from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';
import {ShoppingCartService} from "./shopping-cart.service";
import {validate} from "codelyzer/walkerFactory/walkerFn";
import {CustomerUser} from "../Model/CustomerModel";
@Injectable()
export class UserService {
  userList:{customeruser:any,saleuser:any}={customeruser:1,saleuser:2};
  target:CustomerUser=null;
  type=null;
  constructor(private http: Http) {
    this.userUpdate().then(()=>{    console.log(this.userList)
    });
  }
  isTheSame(userName){
    console.log(userName);
    let target=null;
      for (let i=0;i<this.userList.customeruser.length;i++){
        if (this.userList.customeruser[i].userName === userName){
          target = this.userList.customeruser[i];
          break;
        }
      }
      console.log(target);
      if (target==null){
        return false;
      }else
        return true;
  }
  findOrder(index){
    //It's assumed that you are a user;
    return this.target.orders[index];
  }
  getType(){
    return this.type;
  }
  userUpdate(){
    return new Promise((resolve,reject)=>{
      let sum=0;
      this.http.get('/api/login')
        .map(function(res){
          var data=res.json();
          return data;
          //new User(data.userName,data.password);
        }).subscribe(result=>{
          console.log(result);
          this.userList.customeruser=result;
          sum++;
          if (sum==1) resolve();
        }
      );
    });
  }
  getuserLists() {
    return this.userUpdate().then(()=>this.userList);
  }
  getUser(){
    return this.target;
  }
  logout(){
    this.target=null;
  }
  validate(userName,password):boolean {
      this.target=null;
      for (let i=0;i<this.userList.customeruser.length;i++){
        if (this.userList.customeruser[i].userName === userName){
          this.target = this.userList.customeruser[i];
          break;
        }
      }
      if (this.target!=null &&this.target.password === password){
        this.type="customer";
        return true;
      }else{
        this.target=null;
      }
      for (let i=0;i<this.userList.saleuser.length;i++){
        if (this.userList.saleuser[i].userName === userName){
          this.target = this.userList.saleuser[i];
          break;
        }
      }
      if (this.target!=null &&this.target.password === password){
        this.type="salesman";
      }else{
        this.target=null;
      }
      if (this.target===null) return false;
      else return true;
  }
}
