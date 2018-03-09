import React, {Component} from 'react';
import {Review} from './review.js';
import { Button, Col, Grid, Row } from "react-bootstrap";
import MaterialIcon from "material-icons-react";



export class ProductDetails extends Component{

constructor(props){
  super(props);
  this.product_id = props.product_id;
  this.state = {
    product: '',
    reviews: '',
    tempReviewRating: 0,
    tempReviewComment: ''
  }
}

async componentDidMount() {
  const savedUserId = sessionStorage.getItem('userId');
  const id = this.props.match.params.product_id;
  fetch('/products/' + id)
    .then(res => res.json())
    .then(product => this.setState({ product: product.product }));

    fetch(`/products/${id}/reviews`)
      .then(res => res.json())
      .then(reviews => {
        this.setState({ reviews });

        const myReview = reviews.find(r => r.user_id === savedUserId);
        myReview !== undefined ? this.setState({
          tempReviewRating: myReview.rating,
          tempReviewComment: myReview.comment
        }) : '';
      })
}

createReview() {
  const savedUserId = sessionStorage.getItem('userId');
  return fetch(`/products/${this.props.match.params.product_id}/reviews/${savedUserId}`)
    .then(res => res.json())
    .then(res => {
      const reqMethod = res.length === 0 ? 'POST' : 'PUT';
      fetch(`/products/${this.props.match.params.product_id}/reviews`, {
        method: reqMethod,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: savedUserId,
          product_id: this.props.match.params.product_id,
          rating: this.state.tempReviewRating,
          comment: this.state.tempReviewComment,
        })
      });
      return res;
    })
    .then(_ => {
      fetch(`/products/${this.props.match.params.product_id}/reviews`)
        .then(res => res.json())
        .then(reviews => this.setState({ reviews}))
    });
}

render(){

  const { product } = this.state;
  const { reviews } = this.state;

  if(product && reviews){

  return(
    <div className="prod-details-wrapper">
    <Grid className="prod-details-container" fluid={true}>
      <Row className="info-row">
        <Col className="img-container" md={4} lg={4}>
          <MaterialIcon icon="insert_photo" size={100} className="icon-details"/>
        </Col>
        <Col className="info-container" md={8} lg={8}>

          <div className="info-prod-name"><h1 className="prod-header">{this.state.product.name}</h1></div>
          <div className="info-prod-description">{this.state.product.description}</div>
          <div className="info-prod-price">Price: {this.state.product.price}</div>

        </Col>
      </Row>
      <Row>
        <Col md={6} lg={6}>
          {this.state.reviews.map( review => (
              <Review key={`${review.user_id}${review.product_id}`} review={review} />
            )
          )}
        </Col>
        <Col md={6} lg={6}>
          <Row>Enter message: <input promt="Message..."
                                     value={this.state.tempReviewComment}
                                     onChange={(e) => {
                                       this.setState({tempReviewComment : e.target.value });
                                     }}
          /></Row>
          <Row>Enter rating: <select value={this.state.tempReviewRating}
                                    onChange={(e) => {
                                      this.setState({tempReviewRating : e.target.value});
                                    }}
          >
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select></Row>
          <Row><Button className="btn btn-success"
                       bsSize="large"
                       onClick={(e) => { e.preventDefault(); this.createReview() }}
          >Submit</Button></Row>
        </Col>
      </Row>
      </Grid>
      <style jsx="true">{`
        .prod-details-wrapper{
          width:100%;
          height:100%;
          background: blue;
        }
        .prod-header{
          margin: auto 0;
          font-size: 2vw;
        }
        .prod-details-container{
          background: #F7F7F7;
        }
        .info-row{
          height: 250px;
          background: #DFDFDF;
          padding: 20px 0;
        }
        .img-container{
          background: red;
          height: 100%;
        }
        .info-container{
          text-align:left;
          display: grid;
          grid-template-rows: 25% 60% 15%;
          grid-template-areas:
            "info-prod-name"
            "info-prod-description"
            "info-prod-price";
          height: 100%;
          background: steelblue;
        }
        .info-prod-name{

          display:grid;
          grid-area: info-prod-name;
        }
        .info-prod-description{
          display:grid;
          grid-area: info-prod-description;
          text-align: justify;
          width: 70%;
          font-size: 1.2vw;
          padding: auto 0px;
        }
        .info-prod-price{
          display:grid;
          grid-area: info-prod-price;
          font-size: 1.7vw;
          padding: auto 0px;
        }
      `}</style>
    </div>
  );}else{
    return(
      <div>Review not found...</div>
    );
  }
}

};
