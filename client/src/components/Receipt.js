import React, {Component} from 'react';
import { Link } from "react-router-dom";

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
    .then(cart => this.setState({ cart: cart.cart }));
}


  render(){
    return(
      <Link to="/">
        <div>
          Return to mainpage
        </div>
      </Link>
    )
  }
}
