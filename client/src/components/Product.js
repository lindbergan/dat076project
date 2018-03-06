import React, { Component } from 'react';
import { Button, Col, Grid, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './shadows.css';
import MaterialIcon from 'material-icons-react';

  function handleClick(e){
    console.log("Add button clicked, post req initiated");
    // return fetch('/carts/3/4' , {
    //     method: 'delete'
    //   }).then(response =>
    //     response.json().then(json => {
    //       return json;
    //     })
    //   );
  }

export class Product extends Component {
  constructor() {
    super();
    this.state = {};
  }

  async componentDidMount() {
    const { product } = this.props;
    this.setState({ product });
  }

  render(){
    const { product } = this.state;
    if(product !== undefined) {
      return(
        <Grid className="product-container effect1" fluid={true}>
          <Row>
            <Col className="grid-img" md={6} lg={6}>
              <Link to={"/product/" + product.product_id}>
                <div className="img-container">
                  <MaterialIcon icon="insert_photo" size={175} />
                </div>
              </Link>
            </Col>
            <Col className="grid-info" md={6} lg={6}>
              <div className="info-container">
                { product.name } <br/>
                { product.product_id }<br/>
                { product.price }<br/>
              </div>
            </Col>
          </Row>
          <Row>
            <Button className="buy-button"
                    bsStyle="success"
                    bsSize="sm"
                    onClick={handleClick}>Add to cart</Button>
          </Row>

          <style jsx="true">{`
          .product-container {
            background-color: #F5FFE1;
            margin: 10px;
            cursor: pointer;
            padding: 50px;
            max-width: 350px;
          }
          .grid-img{
            background: white;
          }
          .img-container{
            background-color: white;
          }
          .grid-info{
            font-size:10px;
          }
          `}</style>
        </Grid>
      )
    } else {
      return(
        <div className="product">
          <h1>Product loading...</h1>
          <style jsx="true">{`
          .product {
            width: 100px;
            height: 100px;
            background-color: yellow;
          }
          `}</style>
        </div>
      )
    }
  }
}
