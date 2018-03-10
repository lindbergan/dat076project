import React  from 'react';
import { Header } from '../components/Header.js';
import { Grid, Row } from "react-bootstrap";
import { SortingButtons } from "../components/SortingButtons";


const Layout = props => (
<Grid className="App" fluid={true}>
  <Row>
    <Header logOut={ props.logOut }
            loggedInProfile={ props.profile }
            cartContent={props.cartContent}/>
  </Row>
  <SortingButtons className="sort-buttons" sortAscending={props.sortAscending}
                  sortDescending={props.sortDescending}
                  sortCheapest={props.sortCheapest}
                  sortMostExpensive={props.sortMostExpensive}
                  changeTerm={ props.changeTerm }/>
  <Row className="grid-main">
    { props.children }
  </Row>
  <style jsx="true">{`
    .grid-sidebar{
      background-color: #EAEAEA;
    }
    .grid-main{
      background: #EFEEDE;
    }
  `}</style>
</Grid>
);

export default Layout;
