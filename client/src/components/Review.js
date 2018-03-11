import React, {Component} from 'react';
import './shadows.css';

export class Review extends Component {

  constructor(props){
    super(props);
    this.review = props.review;
    this.state = {
      author: ''
    }
  }

  componentWillMount() {
    return fetch(`/users/${this.review.user_id}`)
      .then(res => res.json())
      .then(res => {
        this.setState({ author: res.firstName + " " + res.lastName});
      })
      .catch(ex => console.log(ex));
  }

  render(){
    return(
      <div className="review-container effect1">
        <div className="grid-review-rating">
          {this.review.rating}
        </div>
        <div className="grid-review-title">
          { this.state.author }
        </div>
        <div className="grid-review-comment">
          {this.review.comment}
        </div>

        <style jsx="true">{`
          .review-container{
            width: 100%;
            display:grid;
            grid-template-rows: 2vw;
            grid-template-columns: 2vw;
            grid-template-areas:
              "grid-review-rating grid-review-title"
              "grid-review-comment grid-review-comment";
            background: white;
            margin: 5px 0 10px 0;
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
