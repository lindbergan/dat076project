import React  from 'react';
import { Header } from './components/Header.js';

const Layout = props => (
<div className="App grid-container">
  <div className="grid-header">
    <Header logOut={ props.logOut } changeTerm={ props.changeTerm }/>
  </div>
  <div className="grid-main">
    { props.children }
  </div>
  <style jsx="true">{`
    .grid-container{
      display:grid;
      grid-template-rows: 150px auto;
      grid-template-columns: 20% 80%;
      grid-template-areas:
        "grid-header grid-header"
        "grid-main grid-main"
    }
    .grid-header{
      display:grid;
      grid-area: grid-header;
      height: 100%;
      width:100%;
      background-color: #B5C7CB;
    }

    .grid-sidebar{
      display: grid;
      grid-area: grid-sidebar;
      background-color: #EAEAEA;
    }

    .grid-main{
      display: grid;
      grid-area: grid-main;
      background-color: #f3efe7;
      height: 100%;
      width: 100%;
    }
  `}</style>
</div>
);

export default Layout;
