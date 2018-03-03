import React, { Component } from 'react';
import { Link } from 'react-router-dom';

function handleClick(e){
  e.preventDefault();
  console.log("link clicked");
}

export class Cart extends Component{

  constructor(props, context){
    super(props, context);
    this.state = {
      cart: [],
    };
  }

  async componentDidMount(){
    console.log("mounting successful");
    fetch('cart/1')
      .then(res => res.json())
      .then(cart => this.setState({cart}));
  }


  render(){

    const cart = this.state.cart;
    console.log(cart);
    if(!cart){
      return(

        <div className="cart-container">Cart is empty


        <style jsx="true">{`

          .cart-container {
            background-color: steelblue;
            display:grid;
            grid-template-columns: 50% 50%;
            grid-template-rows: 15% 60% 15%;
            grid-template-areas:
              ". . ."
              "grid-icon grid-cart-info"
              ". . ."
          }

        `}</style>
        </div>

    );
    }else{
      const total_amount = cart.total_amount;
      const total_price = cart.total_price;
      console.log("total amount: " + total_amount + "total price: " + total_price );
      return(

        <div className="cart-container">
          <div className="grid-icon">
            <div className="cart-icon">
              <i className="fas fa-shopping-cart"></i>
            </div>
          </div>
          <div className="grid-cart-info">
            <div>Number of products: {total_amount}</div>
            <div>Total cost: {total_price}</div>
            <div className="purchase-btn">
              <a href="#" onClick={handleClick}>Go to cashier</a>
            </div>
          </div>

        <style jsx="true">{`


          .cart-container {
            color: white;
            background-color: steelblue;
            display:grid;
            grid-template-columns: 50% 50%;
            grid-template-rows: 15% 60% 15%;
            grid-template-areas:
              ". . "
              "grid-icon grid-cart-info"
              ". ."
          }
          .grid-icon{
            display: grid;
            grid-area: grid-icon;
            text-align: center;
            content-align:center;
          }
          .cart-icon{
            font-size:4em;
            color:white;
          }
          .grid-cart-info{
            display: grid;
            grid-area: grid-cart-info;
            margin-left: 0;
            text-align: left;
          }
          .purchase-btn a{
            color: white;
            cursor: pointer;
          }

        `}</style>

        </div>

      );
    }

  }

}
