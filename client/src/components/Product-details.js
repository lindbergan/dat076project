import React, {Component} from 'react';
import { Review } from './Review.js';
import { Button, Col, Grid, Row } from "react-bootstrap";
import MaterialIcon from "material-icons-react";
import './shadows.css';
import ReactLoading from 'react-loading';

export class ProductDetails extends Component {
  constructor(props){
    super(props);
    this.product_id = props.product_id;
    this.state = {
      tempReviewRating: 0,
      tempReviewComment: ''
    }
  }

  async componentDidMount() {
    const savedUserId = sessionStorage.getItem('userId');
    const id = this.props.match.params.product_id;
    fetch('/products/' + id)
      .then(res => res.json())
      .then(product => {
        this.setState({ product: product.product });
      });
      fetch(`/products/${id}/reviews`)
        .then(res => res.json())
        .then(reviews => {
          this.setState({ reviews });
          const myReview = reviews.find(r => r.user_id === savedUserId);
          console.log(myReview);
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
          .then(reviews => { this.setState({ reviews : undefined }); this.setState({ reviews: reviews }) })
      });
  }

  render(){
    const product = this.state.product !== undefined ? this.state.product : '';
    const reviews = this.state.reviews !== undefined ? this.state.reviews : [];

    return(
      <div className="prod-details-wrapper">
      <Grid className="prod-details-container" fluid={true}>
        <Row className="info-row effect1">
          <Col className="img-container" md={4} lg={4}>
            <MaterialIcon icon="insert_photo" size={100} className="icon-details"/>
          </Col>
          <Col className="info-container" md={8} lg={8}>

            <div className="info-prod-name"><h1 className="prod-header">{product.name}</h1></div>
            <div className="info-prod-description">{product.description}</div>
            <div className="info-prod-price">Price: {product.price}</div>

          </Col>
        </Row>
        <Row>
          <Col className="reviews-container" md={6} lg={6}>
          <div id="reviews-header">
            <h3>REVIEWS</h3>
            </div>
            {
              reviews.map( review => (
                <Review key={`${review.user_id}${review.product_id}`} review={review} />
              )
            )}
          </Col>
          <Col className="add-review-container" md={6} lg={6}>
            <div id="reviews-header">
            <h3>ADD REVIEW</h3>
            </div>
            <Row><textarea id="new-review-message"
                           placeholder="Enter your review here"
                           onChange={(e) => {
                             this.setState({tempReviewComment : e.target.value });
                           }}
                           value={this.state.tempReviewComment}
            /></Row>
            <Row><select id="new-review-rating"
                         value={this.state.tempReviewRating}
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
            <Row><div id="new-review-button"
                         onClick={(e) => { e.preventDefault(); this.createReview() }}
            >Submit</div></Row>
          </Col>
        </Row>
        </Grid>
        <style jsx="true">{`
          .prod-details-wrapper{
            width:100%;
            height:100%;
            background: #EFEEDE;
            font-family: 'Hind Siliguri', sans-serif;

          }
          .prod-header{
            margin: auto 0;
            font-size: 2vw;
          }
          .prod-details-container{
            background: #EFEEDE;
            padding-left: 30px;
            padding-right: 30px;
            width: 80%;
          }
          .info-row{
            height: 350px;
            background: #EFEEDE;
            margin: 20px auto;
          }
          .img-container{
            background: linear-gradient(#ABB6BA, #abbaab);
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
            background: white;
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
            font-size: 1.0vw;
            padding: auto 0px;
          }
          .info-prod-price{
            display:grid;
            grid-area: info-prod-price;
            font-size: 1.7vw;
            padding: auto 0;
          }
          .reviews-container{
            background: #EFEEDE;
            padding: 0;
            font-family: 'Hind Siliguri', sans-serif;
          }
          #reviews-header{
            text-align: left;
          }
          #new-review-message{
            width: 100%;
            height: 160px;
            resize: none;
            vertical-align: top;
          }
          .add-review-container{
            padding-right: 0;

          }
          #new-review-rating{
            width: 100%;
            height: 35px;
            border-radius: 0;
            -webkit-appearance: none;
            -webkit-border-radius: 0px;
            float: left;
            padding-left:10px;
          }
          #new-review-button{
            overflow: hidden;
            width: 100%;
            height: 35px;
            background: #16222a; /* fallback for old browsers */
            background: -webkit-linear-gradient(to right, #243C48, #3a6073); /* Chrome 10-25, Safari 5.1-6 */
            background: linear-gradient(to right, #243C48, #3a6073); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
            color: white;
            font-size: 20px;
            padding-top: 5px;

          }
        `}</style>
      </div>
    )
  }
}
