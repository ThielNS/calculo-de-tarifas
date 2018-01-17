import React  from 'react';
import { Route } from "react-router-dom";
import Header from '../../components/Header';
import Footer from '../../components/Footer';

class DefaultLayout extends React.Component {

  componentDidUpdate() {
    window.scrollTo(0,0);
  }

  render() {

    const { Component, ...restProps} = this.props;

    return (
      <div>
        <Header/>
        <Route {...restProps} render={Component}/>
        <Footer/>
      </div>
    );
  }
}

export default DefaultLayout;