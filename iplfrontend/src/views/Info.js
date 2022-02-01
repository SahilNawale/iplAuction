import React from "react";
// react plugin for creating notifications over the dashboard
import NotificationAlert from "react-notification-alert";
// react-bootstrap components
import {
  Alert,
  Badge,
  Button,
  Card,
  Modal,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function Info() {
  const [showModal, setShowModal] = React.useState(false);
  const notificationAlertRef = React.useRef(null);
  const notify = (place) => {
    var color = Math.floor(Math.random() * 5 + 1);
    var type;
    switch (color) {
      case 1:
        type = "primary";
        break;
      case 2:
        type = "success";
        break;
      case 3:
        type = "danger";
        break;
      case 4:
        type = "warning";
        break;
      case 5:
        type = "info";
        break;
      default:
        break;
    }
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>
            Welcome to <b>Light Bootstrap Dashboard React</b> - a beautiful
            freebie for every web developer.
          </div>
        </div>
      ),
      type: type,
      icon: "nc-icon nc-bell-55",
      autoDismiss: 7,
    };
    notificationAlertRef.current.notificationAlert(options);
  };
  return (
    <>

      <div className="rna-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      <Container fluid>
        <Card>
          <Card.Header>
            <Card.Title as="h4">Info</Card.Title>
          </Card.Header>
          <Card.Body>
            Bonus Points:
      <hr/>
            1. Batting<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;●  There will be 3 categories: Powerplay, Middle Overs(abbreviated as middle), Death Overs(abbreviated as death).<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;●  You must choose 4 players for the Powerplay category,4 players for Middle category and 2 players for Death category.<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;●  If the category is powerplay then the sum of the batting powerplay ratings of the 4 players will be taken. Similarly, for Middle and Death as well.<br/>
&nbsp;&nbsp;&nbsp;&nbsp;●  If sum is above 90% then 5 bonus points (strictly >90%),
Above 80% then 3 bonus points (strictly >80%),
70% or above then 1 bonus point (>=70%).<br/>
            Less than 70% no bonus points.<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;●  1 batsman can be used in maximum 2 categories (any 2).<br/>
            <br/>
            2. Bowling<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;●  You must choose 3 players for Powerplay,3 players for Middle and 2 players for Death.<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;●  The bonus point system in terms of percentage of points will be the same as batting.<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;●  1 bowler can be used in maximum 2 categories (any 2).<br/>
            <br/>

            3. All Rounder<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;●  As you know each player will have 6 sub ratings, but for batsmen all the bowling ratings would be 0 and for bowlers all the batting ratings would be 0 (powerplay, middle and death).<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;●  For all rounders all 6 rating parameters will have value and thus they can be used as batsmen (in any of the 3 categories) or bowlers (in any of the 3 categories) or both.<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;●  1 all rounder can be used in maximum 4 categories (2 in batting and 2 in bowling).<br/>
<hr/>

*Star Fielder: You will get 2 bonus points for a player which will be marked star and those points will be added to your final score if and only if that star marked player is in your playing 11.<br/>
<hr/>

            *Player Chemistry:You will get 5 bonus points for a pair of players which will be mentioned in a Player Chemistry list which will be provided by us. These points will be added to your final score if and only if both the players are in your final  playing 11.<br/>
<hr/>
FINAL RATING<br/><br/>
            The final rating will be calculated by adding the overall rating of all the 11 players (which you submit out of all the ones you have bought), the bonus ratings acquired by the same 11 players in accordance with the categories you put them into, the star fielder points (if applicable) and player chemistry points (if applicable).<br/>

            <hr/>
            There will be closed bidding for players after 15 crores.
            <hr/>
            
            Players will go unsold if none of the teams bid for them. Unsold players will come back to the auction after all the players have gone under the hammer once.
            <hr/>

            POWER CARDS<br/><br/>
            There will be 5 types of power cards on offer. RTS and Yorker will be awarded to winners of the pre events. RTM will be provided to each team. For Game Changer and Global Power Card, there will be closed bidding and the team with highest bids will get these cards and that amount will be deducted from their budget. The types of cards are:<br/><br/>
            1. Yorker:<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;●  On application of this card, you can prohibit a team from getting that player. To be applied before the bidding starts for that particular player and won’t be disclosed to other teams.<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;● For example: If I apply a yorker card on team RCB just before the bidding for Virat Kohli starts (by informing the auctioneer in private), then even though RCB eventually wins the bid for Virat Kohli they wouldn’t get Virat Kohli and the second highest bidder would win the bid in that case.<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;● There will be only 1 Yorker card available in 1 slot.<br/><br/>

            2. RTM (Right to Match)<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;●  After the auction of the teams is done, each team will get a RTM card which they can use at any time during the auction.<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;● If Rohit Sharma is sold to CSK for 12 Cr, then MI can use the RTM card and get Rohit Sharma for 12 Cr.
            &nbsp;&nbsp;&nbsp;&nbsp;● But note that RTM can be used only on the player of the team you own, so MI can’t use the RTM card on MS Dhoni.
            &nbsp;&nbsp;&nbsp;&nbsp;● Also, this card can be used only once i.e., only on 1 player by a team.<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;● If such a scenario occurs that say CSK win the bid for Rohit Sharma for 12 Cr and MI use the RTM card but if DC (or any other team for that matter) has applied the yorker card on MI for Rohit Sharma, then CSK will only get Rohit Sharma. But MI keep their RTM card and can be used on another player.<br/><br/>

            3. RTS (Right to Sell)<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;● If you own this card you can at any point in the auction put back a player you own into the auction and get the money you paid for it back.<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;● Example: If you buy MS Dhoni for 15 Cr in the beginning of the auction but halfway through the auction you realize that you need the money or you feel 15 Cr is too much to spend, you can use the RTS card and with that you will get your 15 Cr back and MS Dhoni would become an unsold player and will come back in the auction for the teams to bid for later.<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;● There will be only 2 RTS cards available in 1 slot.<br/><br/>

            4. Game Changer<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;● This card can be used to change a player’s role. A batsman can be used as a bowler and vice-versa.<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;● Example: Shikhar Dhawan’s role can be changed from a batsman to a bowler. Similarly, Jasprit Bumrah’s role can be changed from bowler to batsman.<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;● There will be only 2 Game Changer cards available in 1 slot.<br/><br/>
            5. Global Power Card<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;● The playing 11 can have one extra Overseas Player i.e you can have 5 overseas players in your playing 11 instead of 4.<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;● There will be only 1 Global Power card available in 1 slot.<br/>
            <Row>
              <Col md="6">
                <h5>
                  <small>Info Style</small>
                </h5>
                <Alert variant="info">
                  <span>This is a plain notification</span>
                </Alert>
                <Alert variant="info">
                  <button
                    aria-hidden={true}
                    className="close"
                    data-dismiss="alert"
                    type="button"
                  >
                    <i className="nc-icon nc-simple-remove"></i>
                  </button>
                  <span>This is a notification with close button.</span>
                </Alert>
                <Alert className="alert-with-icon" variant="info">
                  <button
                    aria-hidden={true}
                    className="close"
                    data-dismiss="alert"
                    type="button"
                  >
                    <i className="nc-icon nc-simple-remove"></i>
                  </button>
                  <span
                    data-notify="icon"
                    className="nc-icon nc-bell-55"
                  ></span>
                  <span>
                    This is a notification with close button and icon.
                  </span>
                </Alert>
                <Alert className="alert-with-icon" variant="info">
                  <button
                    aria-hidden={true}
                    className="close"
                    data-dismiss="alert"
                    type="button"
                  >
                    <i className="nc-icon nc-simple-remove"></i>
                  </button>
                  <span
                    data-notify="icon"
                    className="nc-icon nc-bell-55"
                  ></span>
                  <span>
                    This is a notification with close button and icon and have
                    many lines. You can see that the icon and the close button
                    are always vertically aligned. This is a beautiful
                    notification. So you don't have to worry about the style.
                  </span>
                </Alert>
              </Col>
              <Col md="6">
                <h5>
                  <small>Notification States</small>
                </h5>
                <Alert variant="primary">
                  <button
                    aria-hidden={true}
                    className="close"
                    data-dismiss="alert"
                    type="button"
                  >
                    <i className="nc-icon nc-simple-remove"></i>
                  </button>
                  <span>
                    <b>Primary -</b>
                    This is a regular notification made with ".alert-primary"
                  </span>
                </Alert>
                <Alert variant="info">
                  <button
                    aria-hidden={true}
                    className="close"
                    data-dismiss="alert"
                    type="button"
                  >
                    <i className="nc-icon nc-simple-remove"></i>
                  </button>
                  <span>
                    <b>Info -</b>
                    This is a regular notification made with ".alert-info"
                  </span>
                </Alert>
                <Alert variant="success">
                  <button
                    aria-hidden={true}
                    className="close"
                    data-dismiss="alert"
                    type="button"
                  >
                    <i className="nc-icon nc-simple-remove"></i>
                  </button>
                  <span>
                    <b>Success -</b>
                    This is a regular notification made with ".alert-success"
                  </span>
                </Alert>
                <Alert variant="warning">
                  <button
                    aria-hidden={true}
                    className="close"
                    data-dismiss="alert"
                    type="button"
                  >
                    <i className="nc-icon nc-simple-remove"></i>
                  </button>
                  <span>
                    <b>Warning -</b>
                    This is a regular notification made with ".alert-warning"
                  </span>
                </Alert>
                <Alert variant="danger">
                  <button
                    aria-hidden={true}
                    className="close"
                    data-dismiss="alert"
                    type="button"
                  >
                    <i className="nc-icon nc-simple-remove"></i>
                  </button>
                  <span>
                    <b>Danger -</b>
                    This is a regular notification made with ".alert-danger"
                  </span>
                </Alert>
              </Col>
            </Row>
            <br></br>
            <br></br>
            <div className="places-buttons">
              <Row>
                <Col className="offset-md-3 text-center" md="6">
                  <Card.Title as="h4">Notifications Places</Card.Title>
                  <p className="card-category">
                    <small>Click to view notifications</small>
                  </p>
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col lg="3" md="3">
                  <Button block onClick={() => notify("tl")} variant="default">
                    Top Left
                  </Button>
                </Col>
                <Col lg="3" md="3">
                  <Button block onClick={() => notify("tc")} variant="default">
                    Top Center
                  </Button>
                </Col>
                <Col lg="3" md="3">
                  <Button block onClick={() => notify("tr")} variant="default">
                    Top Right
                  </Button>
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col lg="3" md="3">
                  <Button block onClick={() => notify("bl")} variant="default">
                    Bottom Left
                  </Button>
                </Col>
                <Col lg="3" md="3">
                  <Button block onClick={() => notify("bc")} variant="default">
                    Bottom Center
                  </Button>
                </Col>
                <Col lg="3" md="3">
                  <Button block onClick={() => notify("br")} variant="default">
                    Bottom Right
                  </Button>
                </Col>
              </Row>
            </div>
            <Row>
              <Col className="text-center" md="12">
                <h4 className="title">Modal</h4>
                <Button
                  className="btn-fill btn-wd"
                  variant="info"
                  onClick={() => setShowModal(true)}
                >
                  Launch Modal Mini
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        {/* Mini Modal */}
        <Modal
          className="modal-mini modal-primary"
          show={showModal}
          onHide={() => setShowModal(false)}
        >
          <Modal.Header className="justify-content-center">
            <div className="modal-profile">
              <i className="nc-icon nc-bulb-63"></i>
            </div>
          </Modal.Header>
          <Modal.Body className="text-center">
            <p>Always have an access to your profile</p>
          </Modal.Body>
          <div className="modal-footer">
            <Button
              className="btn-simple"
              type="button"
              variant="link"
              onClick={() => setShowModal(false)}
            >
              Back
            </Button>
            <Button
              className="btn-simple"
              type="button"
              variant="link"
              onClick={() => setShowModal(false)}
            >
              Close
            </Button>
          </div>
        </Modal>
        {/* End Modal */}
      </Container>
    </>
  );
}

export default Info;
