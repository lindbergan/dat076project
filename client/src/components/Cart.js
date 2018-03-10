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
    return (<Grid className="cart-container" fluid={ true }>
      <Row className="grid-icon">
        <div className="cart-icon">
          <Link to="/checkout">
            <MaterialIcon icon="shopping_cart" invert={ true } size={ 65 }/>
          </Link>
        </div>
      </Row>
      <Row className="grid-cart-info">
        <table align="center">
          <tbody>
          <tr>
            <td><h5 className="title-row">Number of products:</h5></td>
            <td><h5 className="title-row">{ total_amount }</h5></td>
          </tr>
          </tbody>
          <tbody>
          <tr>
            <td><h5 className="title-row">Total cost:</h5></td>
            <td><h5 className="title-row">{ total_cost }</h5></td>
          </tr>
          </tbody>
        </table>
      </Row>
      <style jsx="true">{ `
          .cart-container {
            color: white;
          }

          .title-row {
            color: white;
            font-size: 20px;
            font-family: "Times New Roman";
            margin-right: 10px;
            text-shadow: 0 0 5px black;
          }
          .cart-container {
            color: white;
            text-shadow: 0 0 5px black;
          }
          .grid-icon{
          }
          .cart-icon{
            font-size: 4em;
            color:white;
            text-align: left;
            margin-top: 15px;
          }
          .grid-cart-info{
            font-family: 'Hind Siliguri', sans-serif;
            text-align: left;
          }
          .purchase-btn a{
            color: white;
            cursor: pointer;
          }
        ` }</style>
    </Grid>)
  }
}
