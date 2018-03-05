import React, {Component} from 'react';
import './shadows.css';

export class Review extends Component{

  constructor(props){
    super(props);
    this.review = props.review;
    this.state = {}
  }

  // async componentDidMount() {
  //   fetch('/products/1/review/1')
  //     .then(res => res.json())
  //     .then(review => this.setState({ id: review.user_id,
  //                                     title:review.title,
  //                                     rating:review.rating,
  //                                     comment:review.comment }));
  // }

  render(){
    return(
      <div className="review-container effect7">

        <div className="grid-review-rating">
          {this.review.rating}
        </div>
        <div className="grid-review-title">
          HEJ
        </div>
        <div className="grid-review-comment">
          {this.review.comment}
        </div>


        <style jsx="true">{`
          .review-container{
            width: 50%;
            display:grid;
            grid-template-rows: 2vw;
            grid-template-columns: 2vw;
            grid-template-areas:
              "grid-review-rating grid-review-title"
              "grid-review-comment grid-review-comment";
            background: white;
            margin: 5px;
            padding: 1.5vw;
          }
          .grid-review-rating{
            display:grid;
            grid-area:grid-review-rating;
            font-size:2vw;
            font-weight: 900;
          }
          .grid-review-title{
            display:grid;
            grid-area:grid-review-title;
            font-size:2vw;
            font-weight: 200;
            text-align:left;
            padding-left: 1vw;
          }
          .grid-review-comment{
            display:grid;
            grid-area:grid-review-comment;
            text-align: justify;
            padding-top: 1.5vw;
          }
        `}</style>
      </div>
    );
  }


}
