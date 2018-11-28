import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import SurveyNew from './surveys/SurveyNew';
import * as actions from "../actions";

import Header from "./Header";
import Landing from "./Landing";
import Dashboard from './Dashboard';

class App extends Component {
  componentDidMount() {
    console.log("componentDidMount");
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div className="container">
            <Header />
            <Route exact={true} path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route exact path="/surveys/new" component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
/*mapStateToProps stays null*/
export default connect(null, actions)(App);
