import React, { Component } from 'react';
import { Header } from './components/header.js';
import { Sidebar } from './components/sidebar.js';


const Layout = props => (


<div className="App grid-container">
  <div className="grid-header">
    <Header/>
  </div>
  <div className="grid-sidebar">
    <Sidebar/>
  </div>
  <div className="grid-main">
    {props.children}
  </div>
  <style jsx="true">{`
    .grid-container{
      display:grid;
      grid-template-rows: 150px auto;
      grid-template-columns: 20% 80%;
      grid-template-areas:
        "grid-header grid-header"
        "grid-sidebar grid-main"
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
      background-color: #EAEAEA;
      height: 100%;
      width: 100%;
    }
  `}</style>
</div>


);

export default Layout;
