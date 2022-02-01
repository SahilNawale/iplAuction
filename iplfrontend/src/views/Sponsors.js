import React from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function Sponsors() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Our Top Sponsors</Card.Title>
                <p className="card-category">
                  For ipl auction event
                </p>
              </Card.Header>
              <Card.Body className="all-icons">
                <Row>
                  <Col className="font-icon-list" lg="4" md="4" sm="4" xs="6">
                    <Card className="card-user">
                      <div style={{ height: "100%" }} className="card-image">
                        <img
                          alt="..."
                          src={require("assets/img/MI.png").default}
                        ></img>
                      </div>
                      <hr></hr>
                      <div className="button-container mr-auto ml-auto">
                        <h5 className="title">Samsung</h5>
                      </div>
                    </Card>
                  </Col>
                  <Col className="font-icon-list" lg="4" md="4" sm="4" xs="6">
                    <Card className="card-user">
                      <div style={{ height: "100%" }} className="card-image">
                        <img
                          alt="..."
                          src={require("assets/img/MI.png").default}
                        ></img>
                      </div>
                      <hr></hr>
                      <div className="button-container mr-auto ml-auto">
                        <h5 className="title">Samsung</h5>
                      </div>
                    </Card>
                  </Col>
                  <Col className="font-icon-list" lg="4" md="4" sm="4" xs="6">
                    <Card className="card-user">
                      <div style={{ height: "100%" }} className="card-image">
                        <img
                          alt="..."
                          src={require("assets/img/MI.png").default}
                        ></img>
                      </div>
                      <hr></hr>
                      <div className="button-container mr-auto ml-auto">
                        <h5 className="title">Samsung</h5>
                      </div>
                    </Card>
                  </Col>
                  <Col className="font-icon-list" lg="4" md="4" sm="4" xs="6">
                    <Card className="card-user">
                      <div style={{ height: "100%" }} className="card-image">
                        <img
                          alt="..."
                          src={require("assets/img/MI.png").default}
                        ></img>
                      </div>
                      <hr></hr>
                      <div className="button-container mr-auto ml-auto">
                        <h5 className="title">Samsung</h5>
                      </div>
                    </Card>
                  </Col>
                  
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Sponsors;
