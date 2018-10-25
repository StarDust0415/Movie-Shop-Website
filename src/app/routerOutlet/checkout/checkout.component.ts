import { Component, OnInit } from '@angular/core';
import {UserService} from "../../service/User.service";
import {ShoppingCartService} from "../../service/shopping-cart.service";
import {OrderService} from "../../service/order.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Order} from "../../Model/CustomerModel";
import {Http} from "@angular/http";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  order:Order;
  wrong:any;
  sum:number;
  index=0;
  constructor(private router:Router,private user:UserService,private orderService:OrderService,private shoppingCart:ShoppingCartService,private route:ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.order=user.getUser().orders[+params['id']];
      console.log(this.order);
      console.log(this.order._id);
      // for (let i=order.orderProduct.lenght)
      // this.productsList=this.route.snapshot.data['0'];

      // (+) converts string 'id' to a number
      // In a real app: dispatch action to load the details here.
    });
  }

  ngOnInit() {
  }
  //为了统一逻辑，应该是checkout的时候，生成订单，然后自动导航到最后一个order的位置
  priceSum(){
    let sum=0;
    for (let i=0;i<this.order.orderProduct.length;i++){
      sum+=(this.order.orderProduct[i].price*this.order.orderProduct[i].quantity);
    }
    return sum;
  }

  checkout(){
    var regName= /^[a-zA-Z]+$/;
    var regMail= /([\w\.]+)@([\w\.]+)\.(\w+)/;
    var regZip= /^\d{5}$/;
    var regStreet=/^[A-Za-z0-9\s+\(,)+]+$/;
    var regCity_State=/^[a-zA-Z\s?]+$/;
    var regCardNum=/^\d{16}$/;
    var regCardName=/^[a-zA-Z\s?]+$/;

    var sa_fn=(<HTMLInputElement>document.getElementById('firstname-input')).value;
    var f1:boolean=false;
    var sa_ln=(<HTMLInputElement>document.getElementById('lastname-input')).value;
    var f2:boolean=false;
    var sa_street=(<HTMLInputElement>document.getElementById('address1-input')).value;
    var f3:boolean=false;
    var sa_city=(<HTMLInputElement>document.getElementById('city-input')).value;
    var f4:boolean=false;
    var sa_state=(<HTMLInputElement>document.getElementById('state-input')).value;
    var f5:boolean=false;
    var sa_zip=(<HTMLInputElement>document.getElementById('zipcode-input')).value;
    var f6:boolean=false;
    var ba_fn=(<HTMLInputElement>document.getElementById('firstname-input1')).value;
    var f7:boolean=false;
    var ba_ln=(<HTMLInputElement>document.getElementById('lastname-input1')).value;
    var f8:boolean=false;
    var ba_street=(<HTMLInputElement>document.getElementById('address1-input1')).value;
    var f9:boolean=false;
    var ba_city=(<HTMLInputElement>document.getElementById('city-input1')).value;
    var f10:boolean=false;
    var ba_state=(<HTMLInputElement>document.getElementById('state-input1')).value;
    var f11:boolean=false;
    var ba_zip=(<HTMLInputElement>document.getElementById('zipcode-input1')).value;
    var f12:boolean=false;
    var card_type=(<HTMLInputElement>document.getElementById('cardtype-input')).value;
    var f13:boolean=false;
    var card_name=(<HTMLInputElement>document.getElementById('holdername-input')).value;
    var f14:boolean=false;
    var card_num=(<HTMLInputElement>document.getElementById('cardnumber-input')).value;
    var f15:boolean=false;
    var card_year=(<HTMLInputElement>document.getElementById('year-input')).value;
    var f16:boolean=false;
    var card_month=(<HTMLInputElement>document.getElementById('month-input')).value;

    //alert(sa_fn);
    if(!regName.test(sa_fn)){
      document.getElementById('sa_firstname').innerHTML='Error:Name Invalid or Empty';
      //return 0;
    }
    else{
      document.getElementById('sa_firstname').innerHTML='';
      f1=true;
    }

    if(!regName.test(sa_ln)){
      document.getElementById('sa_lastname').innerHTML='Error:Name Invalid or Empty';
      //return 0;
    }
    else{
      document.getElementById('sa_lastname').innerHTML='';
      f2=true;
    }

    if(!regName.test(sa_street)){
      document.getElementById('sa_street').innerHTML='Error:Street Address Invalid or Empty';
      // return 0;
    }
    else{
      document.getElementById('sa_street').innerHTML='';
      f3=true;
    }

  if(!regCity_State.test(sa_city)){
    document.getElementById('sa_city').innerHTML='Error:City Invalid or Empty';
    // return 0;
  }
  else {
    document.getElementById('sa_city').innerHTML='';
    f4=true;
  }

  if(!regCity_State.test(sa_state)){
    document.getElementById('sa_state').innerHTML='Error:State Invalid or Empty';
    // return 0;
  }
  else {
    document.getElementById('sa_state').innerHTML='';
    f5=true;
  }

  if(!regZip.test(sa_zip)){
    document.getElementById('sa_zip').innerHTML='Error:Zipcode Invalid or Empty';
    // return 0;
  }
  else{
    document.getElementById('sa_zip').innerHTML='';
    f6=true;
  }

  if(!regName.test(ba_fn)){
      document.getElementById('ba_firstname').innerHTML='Error:Name Invalid or Empty';
      // return 0;
    }
    else {
      document.getElementById('ba_firstname').innerHTML='';
      f7=true;
    }

    if(!regName.test(ba_ln)){
      document.getElementById('ba_lastname').innerHTML='Error:Name Invalid or Empty';
      // return 0;
    }
    else {
      document.getElementById('ba_lastname').innerHTML='';
      f8=true;
    }

    if(!regName.test(ba_street)){
      document.getElementById('ba_street').innerHTML='Error:Street Address Invalid or Empty';
      // return 0;
    }
    else{
      document.getElementById('ba_street').innerHTML='';
      f9=true;
    }

  if(!regCity_State.test(ba_city)){
    document.getElementById('ba_city').innerHTML='Error:City Invalid or Empty';
    // return 0;
  }
  else{
    document.getElementById('ba_city').innerHTML='';
    f10=true;
  }

  if(!regCity_State.test(ba_state)){
    document.getElementById('ba_state').innerHTML='Error:State Invalid or Empty';
    // return 0;
  }
  else {
    document.getElementById('ba_state').innerHTML='';
    f11=true;
  }

  if(!regZip.test(ba_zip)){
    document.getElementById('ba_zip').innerHTML='Error:Zipcode Invalid or Empty';
    // return 0;
  }
  else {
    document.getElementById('ba_zip').innerHTML='';
    f12=true;
  }
  ////////////
  
if(card_type==''){
  document.getElementById('card_type').innerHTML='Error:Card Type Empty or Empty';
  // return 0;
} else{
  document.getElementById('card_type').innerHTML='';
  f13=true;
}

if(card_month=='' || card_year==''){
  document.getElementById('card_date').innerHTML='Error:Card Expired Date Empty';
  // return 0;
}
else{
  document.getElementById('card_date').innerHTML='';
  f14=true;
}

if(!regCardNum.test(card_num)){
  document.getElementById('card_num').innerHTML='Error:Card Number Invalid or Empty';
  // return 0;
}
else {
  document.getElementById('card_num').innerHTML='';
  f15=true;
}

if(!regCardName.test(card_name)){
  document.getElementById('card_name').innerHTML='Error:Card Name Invalid or Empty';
  // return 0;
}
else {
  document.getElementById('card_name').innerHTML='';
  f16=true;
}
if(f1&&f2&&f3&&f4&&f5&&f6&&f7&&f8&&f9&&f10&&f11&&f12&&f13&&f14&&f15&&f16){
    this.orderService.confirm(this.order._id,this.user.getUser()._id).then(()=>{
      alert("You have successfully commit your order!");
      this.user.userUpdate().then(()=>{
        this.user.validate(this.user.getUser().userName,this.user.getUser().password);
        this.router.navigate([""]);
      });
    });
  }
  else{
    return 0;
  }
  }
  cancel(){
    this.orderService.cancel(this.order._id,this.user.getUser()._id).then(()=>{
      alert("You have successfully cancel your order!");
      this.user.userUpdate().then(()=>{
        this.user.validate(this.user.getUser().userName,this.user.getUser().password);
        this.router.navigate([""]);

      });
    });
  }

}
