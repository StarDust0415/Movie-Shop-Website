import { Component, OnInit } from '@angular/core';
import {UserService} from "../../service/User.service";
import {Router} from "@angular/router";
import index from "@angular/cli/lib/cli";

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss']
})
export class ViewOrderComponent implements OnInit {
  orders:any[]=[]
  constructor(private user:UserService,private router:Router ) {
    this.orders=user.getUser().orders;
  }
  search(index:any){
    this.router.navigate(['/checkout',index]);
  }
  ngOnInit() {
  }

}
