import {Component, OnChanges, OnInit} from '@angular/core';
import { ShoppingCartService} from "../../service/shopping-cart.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../service/User.service";
import {OrderService} from "../../service/order.service";
import {Http} from "@angular/http";
import {ResolveCartGuard} from "../../guard/resolve-cart.guard";
import {Order, OrderProduct} from "../../Model/CustomerModel";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit{
  productList:OrderProduct[]=[];
  userList:any;
  constructor(private shoppingCart:ShoppingCartService,private router:Router,private user:UserService,private order:OrderService,
    private http:Http,private ShoppingGuard:ResolveCartGuard,private route:ActivatedRoute) {
    // this.productList=this.route.snapshot.data["0"];
    this.shoppingCart.getAllCart().then(result=>{
      this.productList=result;})
  }

  remove(product:OrderProduct):void{
    let target=0;
    for (let i=0;i<this.productList.length;i++){
      if (this.productList[i].productname==product.productname){
        target=i;
        break;
      }
    }
    this.productList.splice(target,1);
    this.update();
  }
  shopping():void{
    this.router.navigate(['/productlist',"all","all","all",0]);
  }
  update():void{
    this.shoppingCart.updateDB();
  }
  sum(){
    let sum=0;
    if (!this.productList) return 0;
    for (let i=0;i<this.productList.length;i++){
     sum+=(this.productList[i].quantity*this.productList[i].price);
    }
    return sum;
  }
  checkout():void{
    //需要做判断是否有登陆
    if (this.user.getUser()===null){
      alert("You need to log in!");
      return;
    }
    if (this.user.getType()=="salesman"){
      alert("You are not a customer!");
      return;
    }
    this.order.orderGenerate(this.productList,this.user.getUser()._id).then(result=>{
      if (result ==="Successfully!") {
        this.user.userUpdate().then(()=>{
          this.user.validate(this.user.getUser().userName,this.user.getUser().password);
          console.log(this.user.getUser());
        //   let newOne=new Order();
        //   newOne={orderProduct:this.productList,status:"pending","_id":"1"};
        //   this.user.getUser().orders.push(newOne);
          this.router.navigate(['/checkout',this.user.getUser().orders.length-1])
          this.shoppingCart.clear();
          });
      }else{
        alert(result);
      }
    });


  }
  decrease(product):void{
    if (product.quantity<=1){
      return;
    }
    product.quantity-=1;
    this.update();
  }
  increase(product):void{
    if (product.quantity>=10){
      return;
    }
    product.quantity+=1;
    this.update();
  }
  ngOnInit() {

  }

}
