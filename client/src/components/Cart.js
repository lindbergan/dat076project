import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Row } from "react-bootstrap";
import MaterialIcon from "material-icons-react";

export class Cart extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      cart: props.cartContent,
      total_amount: props.total_amount
    };
  }

  async componentDidMount() {
    const user_id = sessionStorage.getItem('userId');
    if (user_id !== null || user_id !== 'null') {
      fetch(`/carts/${user_id}`)
        .then(res => res.json())
        .then(cart => this.setState({ cart }));
    } else {
      console.log("user_id was null. Wasn't saved in sessionStorage.");
    }
  }

  render() {
    const cart = this.props.cartContent !== undefined ? this.props.cartContent : [];
    const total_amount = this.props.total_amount !== null ? this.props.total_amount : 0;
    const total_cost = cart.reduce((a, b) => a + b.product.price * b.amount, 0);

    return (<Grid className="cart-container" fluid={true}>
      <Row className="grid-icon">
        <div className="cart-icon">
          <MaterialIcon icon="shopping_cart" invert={true} size={50}/>
        </div>
      </Row>
      <Row className="grid-cart-info">
        <div>Nr of products: {total_amount}</div>

        <div>Total cost: {total_cost} kr</div>
        <div className="purchase-btn">
          <Link to="/checkout" >Go to checkout</Link>
        </div>
      </Row>

      <style jsx="true">{`
        .cart-container {
          color: white;
        }
        .grid-icon{
        }
        .cart-icon{
          font-size:4em;
          color:white;
          text-align: left;
        }
        .grid-cart-info{
          font-family: 'Hind Siliguri', sans-serif;
          text-align: left;
        }
        .purchase-btn a{
          color: white;
          cursor: pointer;
          text-decoration: underline;
        }
      `}</style>

    </Grid>)
  }
}
