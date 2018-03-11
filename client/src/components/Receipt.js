import React, {Component} from 'react';
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
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
      <div>
        <h1>Thank you for your purchase!</h1>
        <h4>Receipt: </h4>
        <table>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Price</th>
          </tr>
          {
            this.renderReceipt()
          }
        </table>
        <h5>Total: {total_price} kr</h5>
        <Link to="/" onClick={() => { this.clearCart(); this.props.updateCart(); }}>
          <Button
            className="btn btn-secondary"
          >Return to shopping view</Button>
        </Link>
        <style jsx="true"> {`
          table {
            margin: 0 auto;
          }
          th {
            padding-left: 10px;
          }
        `}
        </style>
      </div>
    )
  }
}
