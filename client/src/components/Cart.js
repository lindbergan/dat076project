import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Row } from "react-bootstrap";
import MaterialIcon from "material-icons-react";

export class Cart extends Component{

  constructor(props, context){
    super(props, context);
    this.state = {
      cart: '',
    };
  }

  async componentDidMount(){
    const user_id = sessionStorage.getItem('userId');

    if (user_id !== null || user_id !== 'null') {
      fetch(`/carts/${user_id}`)
        .then(res => res.json())
        .then(cart => this.setState({cart}));
    } else {
      console.log("user_id was null. Wasn't saved in sessionStorage.");
    }
  }

  render() {

    const cart = this.state.cart;
    const total_amount = cart.length;

    return(
      
      <Grid className="cart-container" fluid={true}>
        <Row className="grid-icon">
          <div className="cart-icon">
            <MaterialIcon icon="shopping_cart" invert={true} size={50}/>
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
