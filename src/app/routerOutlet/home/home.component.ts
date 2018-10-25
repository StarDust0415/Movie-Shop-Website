import { Component, OnInit } from '@angular/core';
import {Product} from "../../Model/ProductModel";
import {GetProductService} from "../../service/get-product.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products:Product[]=[];
  constructor(private router:Router,private getProduct:GetProductService) { }
  getDetail(index):void{
    console.log(index);
    this.router.navigate(['/productdetail',index]);
  }

  ngOnInit() {
    this.getProduct.getProductList().then((result)=>{
      this.products.push(result[0]);
      this.products.push(result[6]);
      this.products.push(result[11]);

    });
  }

}
