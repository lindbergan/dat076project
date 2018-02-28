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

        <div>Cart is empty</div>

    );
    }else{
      return(

        <div>Products exists</div>

      );
    }

  }

}
