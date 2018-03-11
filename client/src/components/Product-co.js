import React, { Component } from 'react';
import {Col, Grid, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './shadows.css';
import MaterialIcon from 'material-icons-react';

export class ProductCO extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.state = {};
  }

  async componentDidMount() {
    const { product } = this.props;
    this.setState({ product });
  }

  handleAdd(e){
    const { product_id } = this.state.product;
    const { user_id } = this.state.product;
    const amount = this.state.product.amount + 1;

    fetch(`/carts/${user_id}`, {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              product_id: product_id,
              user_id: user_id,
              amount: amount,
            })
          }); //end fetch PUT
    this.props.updateCart();
  }

  handleDelete(e){
    const { user_id } = this.state.product;
    const { product_id } = this.state.product;
    const { amount } = this.state.product;

    if(amount === 1) {
      fetch(`/carts/${user_id}/${product_id}`, {
        method: 'delete'
      }).then(response =>
        console.log("ok" + response),
      ); //end fetch DELETE
    }
    else{
      let new_amount = amount - 1;
      fetch(`/carts/${user_id}`, {
              method: 'PUT',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                product_id: product_id,
                user_id: user_id,
                amount: new_amount,
              })
            }); //end fetch PUT
    }
    this.props.updateCart();
  }

  async getProduct(product) {
    fetch(`/products/${product.product_id}`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          name: res.product.name,
          price: res.product.price
        });
      })
      .catch(ex => console.log(ex));
  }

  render(){
    const { product } = this.state;

    if(product !== undefined) {
      if (this.state.name === undefined && this.state.price === undefined) {
        this.getProduct(product);
      }
      return(
        <Grid className="product-container effect1" fluid={true}>
          <Row>
            <Link to={"/product/" + product.product_id}>
              <div className="img-container">
                <MaterialIcon icon="insert_photo" size={100} />
              </div>
            </Link>
          </Row>
          <Row>
            <div className="info-container">
              <h3>{this.state.name}</h3>
              <h4 className="info-price">Amount: {product.amount}</h4>
              <h4 className="info-price">Price: {this.state.price} kr</h4>
            </div>
          </Row>
          <Row>
            <Col className="co-buttons-container" md={6}>
            <div className="delete-button co-button"
                 onClick={this.handleDelete}>
                    <i className="fas fa-minus"></i>
            </div>
            </Col>
            <Col className="co-buttons-container" md={6}>

              <div className="add-button co-button"
                   onClick={this.handleAdd}>
                      <i className="fas fa-plus"></i>
              </div>
            </Col>
          </Row>

          <style jsx="true">{`
          .product-container {
            background-color: #ffffff;
            margin: 10px;
            max-width: 350px;
            margin-bottom: 40px;
            padding:0;
          }
          .grid-img{
            background: white;
            cursor: pointer;
          }
          .info-price{
            font-size: 16px;
          }

          .img-container{
            background-color: #ccc;
            margin: 15px 15px 0 15px;
            padding: 20px 0 20px 0;
            cursor: pointer;
            background: linear-gradient(#ABB6BA, #abbaab);
          }

          .info-container{
            font-family: 'Hind Siliguri', sans-serif;
            text-align: left;
            margin-left: 15px;
          }

          .button-product {
            margin-bottom: 15px;
          }
          .co-buttons-container{
            padding:0;
          }

          .co-button {
            width: 100%;
            height: 50px;
            color: white;
            padding-top: 12px;
            margin:0;
            font-size: 20px;
            cursor:pointer;
          }
          .delete-button{
            background: #56ab2f; /* fallback for old browsers */
            background: -webkit-linear-gradient(to right, #EC4141, #CD3636); /* Chrome 10-25, Safari 5.1-6 */
            background: linear-gradient(to right, #EC4141, #CD3636); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
          }
          .add-button{
            background: #56ab2f; /* fallback for old browsers */
            background: -webkit-linear-gradient(to right, #56ab2f, #6BB549); /* Chrome 10-25, Safari 5.1-6 */
            background: linear-gradient(to right, #56ab2f, #6BB549); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
          }

          .delete-button:hover {
            background: #a92b2b; /* fallback for old browsers */
            background: -webkit-linear-gradient(to right, #a92b2b, #a92b2b); /* Chrome 10-25, Safari 5.1-6 */
            background: linear-gradient(to right, #a92b2b, #a92b2b); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
          }
          .add-button:hover {
            background: #56ab2f; /* fallback for old browsers */
            background: -webkit-linear-gradient(to right, #3b771f, #4b653f); /* Chrome 10-25, Safari 5.1-6 */
            background: linear-gradient(to right, #3b771f, #4b653f); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
          }
          `}</style>
        </Grid>
      )
    } else {
      return (<div />)
    }
  }
}
