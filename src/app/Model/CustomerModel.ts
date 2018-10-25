export class Order{
    status:string;
    _id:string;
    orderProduct:OrderProduct[];
  }
  export class OrderProduct{
    productname: string;
    productDescription: string;
    imgUrl: string;
    quantity: number;
    price: number;
    _id:string;
    salesmanId:string;
  }
export class CustomerUser {
  _id:string;
  userName: string;
  password: string;
  orders: Order[];
  shoppingCart: OrderProduct[];
}
