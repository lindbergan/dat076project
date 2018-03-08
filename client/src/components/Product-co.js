import React, { Component } from 'react';
import { Button, Col, Grid, Row } from 'react-bootstrap';
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

    if(amount === 1){
    fetch(`/carts/${user_id}/${product_id}` , {
        method: 'delete'
      }).then(response =>
        console.log("ok" + response),
      ); //end fetch DELETE

    }else{
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
              <h4>Amount: {product.amount}</h4>
              <h4>Price: {this.state.price} kr</h4>
            </div>
          </Row>
          <Row>
            <Col md={6}>
              <Button className="add-button co-button"
                      bsStyle="success"
                      bsSize="large"
                      onClick={this.handleAdd}>+</Button>
            </Col>
            <Col md={6}>
              <Button className="delete-button co-button"
                      bsStyle="danger"
                      bsSize="large"
                      onClick={this.handleDelete}>-</Button>
            </Col>
          </Row>

          <style jsx="true">{`
          .product-container {
            background-color: #F5FFE1;
            margin: 10px;
            cursor: pointer;
            max-width: 350px;
          }
          .grid-img{
            background: white;
          }
          .img-container{
            background-color: #ccc;
            margin-top: 15px;
          }
          .grid-info{
            font-size:10px;
          }
          .button-product {
            margin-bottom: 15px;
          }
          .co-button {
            margin-bottom: 15px;
          }
          `}</style>
        </Grid>
      )
    } else {
      return (<div />)
    }
  }
}
