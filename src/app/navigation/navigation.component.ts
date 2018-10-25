import { Component, OnInit, Input } from '@angular/core';
import {GetProductService} from "../service/get-product.service";
import {produtList} from "../app.component";
import {Router} from "@angular/router";
import {GetSalesmanService} from "../service/get-salesman.service";
import {_iterableDiffersFactory} from "@angular/core/src/application_module";
import {UserService} from "../service/User.service";

import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import { LoginComponent } from '../login/login.component'
import {ShoppingCartService} from "../service/shopping-cart.service";


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  public isCollapsed = true;
  private shopList:any[]=[];
  private isLogging=false;
  constructor(private router:Router,private products:GetProductService,private shoppingCart:ShoppingCartService,private salesman:GetSalesmanService,private user:UserService,private modalService: NgbModal) {
    salesman.getSalesman().then((result)=>{
      this.shopList=result;
    });
  }

  ngOnInit() {
  }
  select(_id){
    if (_id==="all"){
      this.products.setType("all");
      this.products.setPage(0);
      this.products.setText("all");
    }
    this.products.setSalesmanID(_id);
    this.router.navigate(['/productlist',this.products.getSalesmanID(),
      this.products.getType(),this.products.getText(),this.products.getPage()]);
  }
  find(text:String){
    this.products.setText(text);
    this.router.navigate(['/productlist',this.products.getSalesmanID(),
          this.products.getType(),this.products.getText(),this.products.getPage()]);
  }
  movies(){
    this.router.navigate(['/movies']);
  }
  viewOrder(){
    this.router.navigate(['/viewOrder']);
  }
  logOut(){
    this.user.logout();
    this.shoppingCart.clear();
    console.log(this.user.userList);
    this.router.navigate(["/"]);
  }

  open() {
    const modalRef = this.modalService.open(LoginComponent, {size: 'lg'});
    modalRef.componentInstance.name = 'World';
  }

}
