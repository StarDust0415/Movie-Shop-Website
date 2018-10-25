import {Component, EventEmitter, OnInit, Output, Input} from '@angular/core';
import {UserService} from '../service/User.service';
import "rxjs";
import {Router} from "@angular/router";
import {ShoppingCartService} from "../service/shopping-cart.service";
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Http} from "@angular/http";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Input() name;

  @Output() submit= new EventEmitter<any>();
  inputUser= '';
  inputPassword= '';
  inputUser1= '';
  inputPassword1='';
  inputPassword2='';
  userEmail='';
  userList: any[]=[];
  isTrueUser= true;
  isTruePassword= true;

  constructor(private router:Router,private User: UserService,public activeModal: NgbActiveModal,private http:Http,private shoppingCart:ShoppingCartService) {
  }
  ngOnInit() {}
  confirm(inputUser,inputPassword) {
      this.User.userUpdate().then(()=>{
        this.User.validate(this.inputUser,inputPassword);
        if (this.User.getUser()!=null){
          alert("You have successfully logged in!");
          console.log(this.User.getUser());
          this.addCart();
          this.activeModal.close();
        }else{
          document.getElementById('loginError').innerHTML="Username or Password Wrong";
        }
      });
  }
  SignUP(inputUser,inputPassword1,inputPassword2,userEmail) {

    if (this.User.isTheSame(inputUser)) {
      document.getElementById("usernameError").innerHTML="Error:The user name has been occupied";
      return 0;
    }
    else{
      document.getElementById("usernameError").innerHTML="";
    }

    if (!inputUser.match(/\w+/)){
      document.getElementById("usernameError").innerHTML="Error:The user name is not valid.(A valid user name should contains letter,number or _)";
      return 0;
    }
    else{
      document.getElementById("usernameError").innerHTML="";
    }
    
    if (inputPassword1==''||inputPassword2==''||(inputPassword1!=inputPassword2)){
      document.getElementById("pwdError").innerHTML='Error:Two Passwords Are Different or Password Empty';
      return 0;
    }
    else {
      document.getElementById("pwdError").innerHTML="";
    }

    if(!userEmail.match(/([\w\.]+)@([\w\.]+)\.(\w+)/)){
      document.getElementById("emailError").innerHTML="Error:Email Invalid";
      return 0;
    }
    else{
      document.getElementById("emailError").innerHTML="";
    }

    this.http.post("/api/createUser", {
      type: "Customer",
      userName: inputUser,
      password: inputPassword1,
      shopName: ""
    }).toPromise().then((result) => {
      alert("You have successfully signed up!");
      this.activeModal.close();
      this.User.userUpdate().then(()=>this.User.validate(inputUser,inputPassword1));
    });
  }
    addCart(){
    for (var i=0;i<this.User.getUser().shoppingCart.length;i++){
      console.log(i);
      let {quantity,...product}=this.User.getUser().shoppingCart[i];
      console.log(product);
      this.shoppingCart.addProduct(quantity,{...product,quantity:quantity});
    }
    localStorage.setItem("shoppingCart",null);
  }

}
