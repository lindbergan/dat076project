import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Row } from "react-bootstrap";


export class Cart extends Component{

  constructor(props, context){
    super(props, context);
    this.state = {
      cart: '',
    };
  }

  async componentDidMount(){
    const user_id = sessionStorage.getItem('userId');
    fetch(`/carts/${user_id}`)
      .then(res => res.json())
      .then(cart => this.setState({cart}));
  }


  render(){

    const cart = this.state.cart;
    if(!cart){
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
      const total_amount = cart.length;
      return(

        <Grid className="cart-container" fluid={true}>
          <Row className="grid-icon">
            <div className="cart-icon">
              <i className="fas fa-shopping-cart"></i>
            </div>
          </Row>
          <Row className="grid-cart-info">
            <div>Number of products: {total_amount}</div>
            <div>Total cost: {total_amount}</div>
            <div className="purchase-btn">
              <Link to="/checkout" >Go to cashier</Link>
            </div>
          </Row>

        <style jsx="true">{`


          .cart-container {
            color: white;
            background-color: steelblue;
          }
          .grid-icon{
          }
          .cart-icon{
            font-size:4em;
            color:white;
          }
          .grid-cart-info{
          }
          .purchase-btn a{
            color: white;
            cursor: pointer;
          }

        `}</style>

        </Grid>

      );
    }

  }

}
