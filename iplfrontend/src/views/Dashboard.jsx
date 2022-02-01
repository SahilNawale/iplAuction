import React, { Fragment, useEffect, useState } from "react";
import axiosInstance from '../AxiosInstance';
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import PlayerCard from "components/PlayerCard";
import { BackendUrl } from "AxiosInstance";
import { mediaUrl } from "AxiosInstance";
import { useHistory } from "react-router";

function Dashboard() {

  const history = useHistory()

  const token = sessionStorage.getItem("token")

  const [info, setInfo] = useState()
  const [players, setPlayers] = useState([])
  const [powercards, setPowercards] = useState([])
  const [stats, setStats] = useState([])
  const [playing11Stats, setPlaying11Stats] = useState([])

  useEffect(() => {
    const getInfo = async () => {
      const response1 = (await axiosInstance.get(`team/details`)).data;
      setInfo(response1[0])

      const response2 = (await axiosInstance.get(`team/players-bought`)).data;
      setPlayers(response2)
      console.log(response2)

      const response3 = (await axiosInstance.get(`powercard/${token[5]}`)).data
      setPowercards(response3)

      const response4 = (await axiosInstance.get(`team/statistics`)).data
      setStats(response4)

      const response5 = (await axiosInstance.get(`playing11/all`)).data
      setPlaying11Stats(response5)

    }
    getInfo();
  }, []);

  const statsStyle = {margin:"5px 10px"}
  const statsBg = {background:"black",width:"100%",color:"white",borderRadius:"0px 0px 3px 3px",display:"Flex",flexWrap:"wrap",padding:"20px",marginBottom:"20px",justifyContent:"space-evenly",border:"2px solid"}

  return (
    <React.Fragment>
      <Container fluid>
        <Row>
        {info&&playing11Stats?
          <Fragment>
            <Col lg="4" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-chart text-warning"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Score</p>
                      <Card.Title as="h4">{info['score']}/{playing11Stats.score}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <button className="stats btn btn-sm" onClick={()=>{history.push('/calculator')}}>
                <i class="fas fa-calculator"/>
                  &nbsp;Calculate Now
                </button>
              </Card.Footer>
            </Card>
          </Col>
          
          <Col lg="4" sm="6">
            <Card className="card-stats"
            >
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-money-coins text-success"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Budget</p>
                      <Card.Title as="h4" >${info['budget']}CR</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <button className="stats btn btn-sm" onClick={()=>{history.push('/redirector')}}>
                <i className="fas fa-redo mr-1"></i>
                  &nbsp;Update Now
                </button>
              </Card.Footer>
            </Card>
            </Col>
            </Fragment>
            :null}
        </Row>
        <Row>
        {powercards&&powercards.length>0 ?
          <Col lg="12" sm="12">
            <Card className="card-stats"
            >
              <Card.Body>
                <Row>
                    {powercards.map((powercard,key) => (
                      <img key={key} style={{
                        marginBottom:"5px",width: "auto", height: "60px", filter:
                          powercard['used'] ? "sepia(100%) saturate(300%) brightness(50%) hue-rotate(180deg)" : null
                      }}
                        src={mediaUrl + powercard['image']} />
                    ))} 
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  Powercards
                </div>
              </Card.Footer>
            </Card>
          </Col>
          : null
                  }
        </Row>
        {stats?
        <Row><div style={{borderRadius:"3px 3px 0px 0px",textAlign:"center",padding:"3px",background:"white"}}>Overall</div>
          <div style={statsBg}>
                  <div style={statsStyle}>Bat : {stats['bat']}/7</div>
                  <div style={statsStyle}>Bowl : {stats['bowl']}/7</div>
                  <div style={statsStyle}>All : {stats['all']}/4</div>
                  <div style={statsStyle}>Total : {stats['total']}/15</div>
                  <div style={statsStyle}>highest Overall : {stats['highestOverall']+" - "+stats['highestOverallName']}</div>
                  <div style={statsStyle}>Starred : {stats['starred']}</div>
                  <div style={statsStyle}>Uncapped : {stats['uncapped']}</div>
                  <div style={statsStyle}>Foreign : {stats['foreign']}/5</div>
                  <div style={statsStyle}>Wk : {stats['wk']}/3</div>
          </div>
        </Row>:null
        }
        {playing11Stats?
          <Row><div style={{borderRadius:"3px 3px 0px 0px",textAlign:"center",padding:"3px",background:"white"}}>Playing  11</div>
            <div style={statsBg}>
                    <div style={statsStyle}>Bat : {playing11Stats['bat']}/5</div>
                    <div style={statsStyle}>Bowl : {playing11Stats['bowl']}/5</div>
                    <div style={statsStyle}>All : {playing11Stats['all']}/3</div>
                    <div style={statsStyle}>Total : {playing11Stats['total']}/11</div>
                    <div style={statsStyle}>highest Overall : {playing11Stats['highestOverall']+" - "+playing11Stats['highestOverallName']}</div>
                    <div style={statsStyle}>Starred : {playing11Stats['starred']}</div>
                    <div style={statsStyle}>Uncapped : {playing11Stats['uncapped']}</div>
                    <div style={statsStyle}>Foreign : {playing11Stats['foreign']}/4</div>
                    <div style={statsStyle}>Wk : {playing11Stats['wk']}/2</div>
            </div>
          </Row>:null
          }
        <Row>
          {players.map((player, key) => (
            <Col lg="4" sm="6" key={key}>
              <PlayerCard key={key} image={player.image} color={player.color} name={player.name} overall={player.overall} bat_ppl={player.bat_ppl} bat_mid={player.bat_mid} bat_death={player.bat_death} bow_ppl={player.bow_ppl} bow_death={player.bow_death} bow_mid={player.bow_mid}
                foreign={player.foreign} is_starred={player.is_starred} is_wk={player.is_wk} is_uncapped={player.is_uncapped} price={player.price} id={player.id} playing11={player.playing11}/>
            </Col>
          ))}
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default Dashboard;
