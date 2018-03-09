import React  from 'react';
import { Header } from './components/Header.js';
import { Grid, Row } from "react-bootstrap";

const Layout = props => (
<Grid className="App" fluid={true}>
  <Row>
    <Header logOut={ props.logOut } changeTerm={ props.changeTerm } loggedInProfile={ props.profile }/>
  </Row>
  <Row className="grid-main">
    { props.children }
  </Row>
  <style jsx="true">{`
    .grid-sidebar{
      background-color: #EAEAEA;
    }

    .grid-main{
      background-color: #E9E9E9;
      height: 100%;
    }
  `}</style>
</Grid>
);

export default Layout;
