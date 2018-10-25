import { Component, OnInit } from '@angular/core';
import {GetProductService} from "../../service/get-product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ShoppingCartService} from "../../service/shopping-cart.service";
import {UserService} from "../../service/User.service";
import {Product} from "../../Model/ProductModel";
import {Http, URLSearchParams} from "@angular/http";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  specificProduct=new Product();
  quantity=1;
  id:number;
  salesmanID="";
  type="";
  currentRate=3;
  commentcontent="";
  constructor(private http:Http,private getProduct:GetProductService,private router:ActivatedRoute,private user:UserService,private shoppingCart:ShoppingCartService) {
    this.router.params.subscribe(params=>{
      let parameter: URLSearchParams = new URLSearchParams();
      parameter.set("_id",params['id']);
      this.http.get("/api/getProduct",{search:parameter}).map(result=>{
        console.log(result);
        return result.json();
      }).toPromise().then(result=>{
        this.specificProduct=result;
        console.log(this.specificProduct);
      });
    })

  }
    // this.router.data
    //   .subscribe((data: { product: Product }) => {
    //     this.specificProduct = data.product;
    //     console.log(this.specificProduct);
    //   });
    // this.sub = this.router.params.subscribe(params => {
      //   let parameter: URLSearchParams = new URLSearchParams();
      //   parameter.set("_id",params['id']);
        // this.getProduct.setSalesmanID(params['salesmanID']);
        // this.getProduct.setText(params['text']);
        // this.getProduct.setPage(params['page']);
        // this.getProduct.setType(params['type']);
        // this.salesmanID=params['salesmanID'];
        // this.type=this.specificProduct.type;
      //   this.http.get("/api/getProduct",{search:parameter}).map(result=>result.json()).toPromise().then(
      //     (result)=>{
      //       this.specificProduct=result;
      //     }
      //   );
      // });
    bought(){
      if (this.user.getUser()==null)
        return false;
      for (let i=0;i<this.specificProduct.comments.length;i++){
        if (this.specificProduct.comments[i].name===this.user.getUser().userName){
          return false;
        }
      }
      for (let i=0;i<this.user.getUser().orders.length;i++){
        if (this.user.getUser().orders[i].status==="completed"){
          for (let j=0;j<this.user.getUser().orders[i].orderProduct.length;j++){
            if (this.user.getUser().orders[i].orderProduct[j]._id===this.specificProduct._id){
              return true;
            }
          }
        }

      }
      return false;
    }
    calculate():number{
      let result=0;
        for (let i=0;i<this.specificProduct.comments.length;i++){
          result+=this.specificProduct.comments[i].rate;
        }
        return (result/this.specificProduct.comments.length);
    }
    confirm(rate){
      this.getProduct.postComment(rate,this.commentcontent,this.user.getUser().userName,this.specificProduct._id)
      .then(result=>{
          if (result!=""){
            alert(result);
            let parameter: URLSearchParams = new URLSearchParams();
            parameter.set("_id",this.specificProduct._id);
            this.http.get("/api/getProduct",{search:parameter}).map(result=>{
              return result.json();
            }).toPromise().then(result=>{
              this.specificProduct=result;
            });
          }
        }
      );
    }
  decrease():void{
    if (this.quantity<=1){
      return;
    }
    this.quantity-=1;
  }
  increase():void{
    if (this.quantity>=10){
      return;
    }
    this.quantity+=1;
  }
  commit():void{
    this.shoppingCart.addProduct(Number(this.quantity),
      {productname:this.specificProduct.productname,productDescription:this.specificProduct.productDescription,imgUrl:this.specificProduct.imgUrl,
                quantity:Number(this.quantity),price:this.specificProduct.price,_id:this.specificProduct._id,salesmanId:this.specificProduct.salesmanId}, ()=>{
      this.quantity=1;
    });
    alert('You have added the item to the cart!');
  }

  ngOnInit() {
  }

}
