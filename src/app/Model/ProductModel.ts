export class Comment{
  name:string;
  content:string;
  rate:number;
  _id:string;
  constructor(){
    this.name="";
    this.content="";
    this.rate=0;
    this._id="";
  }
}
export class Product{
  _id:string;
  salesmanId:string;
  productname:string;
  productDescription: string;
  stock: number;
  imgUrl: string;
  price:number;
  type:string;
  comments:Comment[];
  constructor(){
    this._id="";
    this.salesmanId="";
    this.productname="";
    this.productDescription="";
    this.stock=0;
    this.imgUrl="";
    this.price=0;
    this.type="";
    this.comments=[];
  }
}
