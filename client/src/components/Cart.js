import React, { Component } from 'react';


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

    const total_price = this.state.cart.total_price;
    console.log(total_price);
    if(total_price === 0){
      return(

        <div className="cart-container">Cart is empty


        <style jsx="true">{`

          .cart-container {
            background-color: steelblue;
          }

        `}</style>
        </div>

    );
    }else{
      return(

        <div className="cart-container">
          Products exists
          <div className="cart-icon">
            <i class="fas fa-shopping-cart"></i>
          </div>
        <style jsx="true">{`

          .cart-container {
            background-color: steelblue;
          }
          .cart-icon{
            font-size:3em;
            color:white;
          }

        `}</style>

        </div>

      );
    }

  }

}
