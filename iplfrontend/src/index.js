import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import AdminLayout from "layouts/Admin.js";
import LandingPage from "components/LandingPage/LandingPage";
import Redirector from "Redirector";
import Calculator from "views/Calculator";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      {sessionStorage.getItem('token') ? <Route path="/admin" render={(props) => <AdminLayout {...props} />} /> : null}
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/redirector" component={Redirector} />
      <Route exact path="/calculator" component={Calculator} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
