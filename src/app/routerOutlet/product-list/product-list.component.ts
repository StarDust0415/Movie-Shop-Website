import { Component, OnInit } from '@angular/core';
import {GetProductService} from '../../service/get-product.service';
import {ActivatedRoute, Router} from "@angular/router";

interface comparator{
  (a,b):boolean;
}
function bubbleSort(arr,comparator){
  for (let i=0;i<arr.length;i++){
    for (let j=i+1;j<arr.length;j++){
      if (comparator(arr[i],arr[j])){
        let temp=arr[i];
        arr[i]=arr[j];
        arr[j]=temp;
      }
    }
  }
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})

export class ProductListComponent implements OnInit {

  productsList:any[]=[];
  router:any;
  priceSort="Price";
  nameSort="Name";
  rateSort="Rate";
  constructor(private getProduct: GetProductService,router:Router,private route:ActivatedRoute) {
    this.router=router;
    this.route.params.subscribe(params => {
      this.getProduct.setSalesmanID(params['salesmanID']);
      this.getProduct.setText(params['text']);
      this.getProduct.setPage(params['page']);
      this.getProduct.setType(params['type']);
      
      this.getProduct.getProductList().then((result)=>
        {this.productsList=result;
          this.sort();
        }
      );
      // (+) converts string 'id' to a number
      // In a real app: dispatch action to load the details here.
    });
  }
  rateCalculate(specificProduct){
    let result=0;
    for (let i=0;i<specificProduct.comments.length;i++){
      result+=specificProduct.comments[i].rate;
    }
    return (result/specificProduct.comments.length)
  }
  sort(){
    if (this.rateSort!="Rate"){
      if (this.rateSort==="Low to High")
        bubbleSort(this.productsList,(a,b)=> this.rateCalculate(a)>this.rateCalculate(b)?true:false);
      else
        bubbleSort(this.productsList,(a,b)=> this.rateCalculate(a)<this.rateCalculate(b)?true:false);
    }
    if (this.nameSort!="Name"){
      if (this.nameSort==="A to Z")

      // to make it staple,we need to decide 0 and we assume it has been finished^
        bubbleSort(this.productsList,(a,b)=> a.productname>b.productname?true:false);
      else
        bubbleSort(this.productsList,(a,b)=> a.productname<b.productname?true:false);
    }
    if (this.priceSort!="Price"){
      if (this.priceSort==="Low to High"){
        console.log(this.priceSort);
        bubbleSort(this.productsList,(a,b)=> {
          return a.price>b.price?true:false;
        });
      }
      else{
        console.log(this.priceSort);
        bubbleSort(this.productsList,(a,b)=> {
          return a.price<b.price?true:false;
        });
      }
    }

  }
  change(num) {
    this.getProduct.setPage(num);
    
      this.router.navigate(['/productlist', this.getProduct.getSalesmanID(),
      this.getProduct.getType(), this.getProduct.getText(), this.getProduct.getPage()]);
  }
  getDetail(index): void {
    console.log(index);
    this.router.navigate(['/productdetail', index]);  }
  ngOnInit() {

  }

}
