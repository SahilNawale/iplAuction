import React, { Component } from "react";
import { Container } from "react-bootstrap";

class Footer extends Component {
  render() {
    return (
      <footer className="footer px-0 px-lg-3 d-flex justify-content-center" style={{background:"linear-gradient(45deg, #ff0202, #1b00f8)"}} >
            <p className="copyright text-center" style={{color:"white"}}>
              © 2021, Ipl Auction, S.P.I.T
            </p>
      </footer>
    );
  }
}

export default Footer;
