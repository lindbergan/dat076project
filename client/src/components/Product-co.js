import React, { Component } from 'react';
import { Button, Col, Grid, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './shadows.css';
import MaterialIcon from 'material-icons-react';


// TODO: make dynamic


export class ProductCO extends Component {
  constructor() {
    super();
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.state = {
      name: '',
      price: -1
    };

  }

  async componentDidMount() {
    const { product } = this.props;
    this.setState({ product });
  }

  handleAdd(e){
    console.log("Add button clicked, post req initiated");
    const user_id = sessionStorage.getItem('userId');
    return fetch(`/carts/${user_id}`, {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              product_id: '3',
              user_id: user_id.toString(),
              amount: '10',
            })
          }); //end fetch
  }
  // TODO: Handle the case of the product not being in the cart ????
  handleDelete(e){

    const { product_id } = this.state.product;
    return fetch(`/carts/3/${product_id}` , {
        method: 'delete'
      }).then(response =>
        console.log("ok" + response),
      );

  }

  async getProduct(product) {
    fetch(`/products/${product.product_id}`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          name: res.name,
          price: res.price
        });
      })
      .catch(ex => console.log(ex));
  }

  render(){
    const { product } = this.state;
    if(product !== undefined) {
      if (this.state.name === '' && this.state.price === -1) {
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
                      onClick={this.handleAdd}>Add</Button>
            </Col>
            <Col md={6}>
              <Button className="delete-button co-button"
                      bsStyle="danger"
                      bsSize="large"
                      onClick={this.handleDelete}>Delete</Button>
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
