import React, {Component} from 'react';
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import './shadows.css';

export class Receipt extends Component{
  constructor(props){
    super(props);
    this.state={
      cart: props.cart,
    };
}
  async componentDidMount() {
    const user_id = sessionStorage.getItem('userId');
    fetch(`/carts/${user_id}`)
      .then(res => res.json())
      .then(cart => this.setState({
        cart: cart.cart,
        total_price: cart.cart.reduce((a, b) => a + b.product.price * b.amount, 0)
      }));
  }
  renderReceipt() {
    if (this.state.cart !== undefined) {
      console.log(this.state.cart);
      return this.state.cart.map(product => {
        return (
          <tr>
            <td> {product.product.name} </td>
            <td> {product.amount} </td>
            <td> {product.product.price} kr</td>
            <hr />
          </tr>
        )
      });
    }
  }

  clearCart() {
    const user_id = sessionStorage.getItem('userId');
    return fetch(`/carts/${user_id}`, {
      method: 'delete'
    }).then(res => console.log(res))
      .catch(ex => console.log(ex));
  }

  render(){
    const total_price = this.state.total_price !== undefined ? this.state.total_price : 0;
    return(
      <div className="receipt-wrapper">
        <h1>Thank you for your purchase!</h1>
        <h4>Receipt: </h4>
        <table className="receipt-table effect1">
          <tr className="receipt-header">
            <th>Name</th>
            <th>Amount</th>
            <th>Price</th>
          </tr>
          {
            this.renderReceipt()
          }
          <h5 id="receipt-total">Total: {total_price} kr</h5>
        </table>

        <Link to="/" onClick={() => { this.clearCart(); this.props.updateCart(); }}>
          <Button
            className="back-btn effect1"
          >Return to shopping view</Button>
        </Link>
        <style jsx="true"> {`
          table {
            margin: 0 auto;
          }
          .receipt-wrapper{
            width: 50%;
            margin: 10px auto;
            background: F6F4EC;
            font-family: 'Hind Siliguri', sans-serif;
          }
          .receipt-header{
            font-weight: 700;
            margin-top: 10px;
          }
          .receipt-table{
            width: 50%;
            background: white;
            margin-bottom: 20px;
            padding: 10px;
          }
          th, td {
            padding-left: 10px;
            text-align:left;
          }
          .back-btn{
            border-radius: 0;
            background: #16222a; /* fallback for old browsers */
            background: -webkit-linear-gradient(to right, #243C48, #3a6073); /* Chrome 10-25, Safari 5.1-6 */
            background: linear-gradient(to right, #243C48, #3a6073); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
            color: white;
          }
          .back-btn:hover{
            color:white;
          }
          #receipt-total{
            font-weight: 700;
            text-align: left;
            padding: 10px;
          }
          @media (max-width: 800px) {
        .receipt-wrapper {
          width: 100%
        }
        .receipt-table{
          width: 50%;
          margin-bottom: 20px;
          padding: 10px;
        }
      }
        `}
        </style>
      </div>
    )
  }
}
