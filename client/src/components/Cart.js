import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Row } from "react-bootstrap";
import MaterialIcon from "material-icons-react";

export class Cart extends Component{

  constructor(){
    super();
  }

  render() {
    const cart = this.props.cartContent !== undefined ? this.props.cartContent : [];
    const total_amount = cart.length;
    return(

      <Grid className="cart-container" fluid={true}>
        <Row className="grid-icon">
          <div className="cart-icon">
            <Link to="/checkout" >
            <MaterialIcon icon="shopping_cart" invert={true} size={65}/>
            </Link>
          </div>
        </Row>
        <Row className="grid-cart-info">
          <div><h5>Number of products: {total_amount}</h5></div>
          <div><h5>Total cost: {total_amount}</h5></div>
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
