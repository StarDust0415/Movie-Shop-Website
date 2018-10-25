import { Component, OnInit } from '@angular/core';
import {UserService} from "../../service/User.service";
import {Router} from "@angular/router";
import {Http} from "@angular/http";

// Checkout测试用
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  // Checkout测试用
  public model: any;
  search = (text$: Observable<string>) =>
  text$
    .debounceTime(200)
    .distinctUntilChanged()
    .map(term => term.length < 2 ? []
      : states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));


  types=['Customer',"Salesman"];
  type='';
  constructor(private http:Http,private router:Router,private User: UserService) { }
  inputUser= '';
  inputPassword= '';
  shopName="";
  ngOnInit() {
  }
  confirm(inputUser,inputPassword) {
    if (this.type==''){
      alert("You need to select type!");
      return;

    }
    if (this.User.isTheSame(this.inputUser)){
      alert("The user name has been occupied");
      return;
    };

    this.http.post("/api/createUser",{type:this.type,userName:inputUser,password:inputPassword,shopName:this.shopName})
      .toPromise().then((result)=>{
        console.log(result);
      this.User.userUpdate().then(()=>{});
      alert("You have successfully signed up!");
    });

  }
}
