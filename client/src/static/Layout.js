import React  from 'react';
import { Header } from '../components/Header.js';
import { Button, Grid, Row } from "react-bootstrap";
import { SortingButtons } from "../components/SortingButtons";
import { Footer } from "../components/Footer";

const Layout = props => (
<Grid className="App" fluid={true}>
  <Row>
    <Header logOut={ props.logOut }
            changeTerm={ props.changeTerm }
            loggedInProfile={ props.profile }
            cartContent={props.cartContent}
            total_amount={props.total_amount}/>
  </Row>
  <SortingButtons sortAscending={props.sortAscending}
                  sortDescending={props.sortDescending}
                  sortCheapest={props.sortCheapest}
                  sortMostExpensive={props.sortMostExpensive}/>
  <Row className="grid-main">
    { props.children }
  </Row>
  <Row>
    <Footer/>
  </Row>
  <style jsx="true">{`
    .grid-main{
      background-color: #f3efe7;
      padding: 25px;
    }
  `}</style>
</Grid>
);

export default Layout;
