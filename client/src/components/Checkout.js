import React, {Component} from 'react';
import { ProductCO } from "./Product-co";


export class Checkout extends Component{
  constructor(){
    super();
    this.state={
      cart: '',
    }
  }

  async componentDidMount() {
    fetch('/carts/3')
      .then(res => res.json())
      .then(cart => this.setState({ cart }));

  }



  render(){
    const {cart} = this.state;
    console.log("***** cart ***** : " + cart);
    if(cart){
    return(

      <div className="checkout-wrapper">
        <div className="checkout-container">
        {this.state.cart.map(product => (
          <ProductCO key={ product.product_id } id={ product.product_id } product={ product } />
        ))}
        </div>

        <style jsx="true">{`
          .checkout-wrapper{
            background: #F7F7F7;
          }
          .checkout-container{
            margin: 0 auto;
            background: red;
          }

        `}</style>
      </div>
    )
  }else{
    return(
      <div className="checkout-container">
          CART IS LOADING
        <style jsx="true">{`
          .checkout-container{
            background: #F5FFE1;
          }
        `}</style>
      </div>
    )
  }
  }


}
