import React from 'react';


const ProductDetails = () => (

  <div className="prod-details-container">

  <div className="grid-det-img"> Img
  </div>

  <div className="grid-det-name"> Name
  </div>

  <div className="grid-det-info"> Info
  </div>

  <div className="grid-det-price"> Price
  </div>

    <style jsx="true">{`
      .prod-details-container{
        width:100%;
        height100%;
        display:grid;
        grid-template-rows: 100px auto 100px;
        grid-template-columns: 30%;
        grid-template-areas:
          "grid-det-img grid-det-name"
          "grid-det-img grid-det-info"
          "grid-det-img grid-det-price";
        background: #f3efe7;
      }
      .grid-det-img{
        display:grid;
        grid-area:grid-det-img;
        background:#E4F5C3;
      }
      .grid-det-name{
        display:grid;
        grid-area:grid-det-name;
        background:#CBF5C3;
      }
      .grid-det-info{
        display:grid;
        grid-area:grid-det-info;
        background:#C3E4F5;
      }
      .grid-det-price{
        display:grid;
        grid-area:grid-det-price;
        background:#C3CBF5;
      }


    `}</style>
  </div>
);

export default ProductDetails;
