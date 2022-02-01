import axiosInstance from "AxiosInstance";
import { mediaUrl } from "AxiosInstance";
import PlayerCard from "components/PlayerCard";
import React, { Fragment, useEffect, useState } from "react";
import { Card, Table, Container, Row, Col, Accordion } from "react-bootstrap";
import { useHistory } from "react-router";

function allTeams() {

  const history = useHistory()
  const [teamData, setTeamData] = useState()
  const [teamName, setTeamName] = useState()
  const [playerData, setPlayerData] = useState()
  const [powercards,setPowercards] = useState([])
  const [allScores,setAllScores] = useState([])


  useEffect(() => {
      axiosInstance.get(`all-team-data/${teamName}`).then(res=>{
        setTeamData(res.data[0])
      })

      axiosInstance.get(`all-player-data/${teamName}`).then((res)=>{
        setPlayerData(res.data)
      })

      axiosInstance.get(`powercard/${teamName}`).then((res)=>{
        setPowercards(res.data)
      })

      axiosInstance.get('leaderboard').then((res)=>{
        setAllScores(res.data)
        console.log(res.data)
      })
  }, [teamName])

  const customButton = {border:"none",background:"inherit"}
  const statsStyle = {margin:"5px 10px"}
  const statsBg = {background:"black",width:"100%",color:"white",borderRadius:"0px 0px 3px 3px",display:"Flex",flexWrap:"wrap",padding:"20px",marginBottom:"20px",justifyContent:"space-evenly",border:"2px solid"}

  return (
    <React.Fragment>
    {allScores?
    <Row>
    <div style={{borderRadius:"3px 3px 0px 0px",textAlign:"center",padding:"3px",background:"white"}}>Leaderboard</div>
    <div style={statsBg}>
      {allScores.map((team,key)=>(
        <div style={statsStyle}>{team.name}: {team.score}</div>        
      ))}
      </div>
      </Row>
      :null
      }
      <ul style={{background:"white",borderRadius:"10px",color:"black",marginBottom:"10px"}} className="nav justify-content-center">

        <li className="nav-item">
          <button style={customButton} className="nav-link " onClick={()=>{setTeamName("MI")}}>MI</button>
        </li>
        <li className="nav-item">
          <button style={customButton} className="nav-link" onClick={()=>{setTeamName("CSK")}}>CSK</button>
        </li>
        <li className="nav-item">
          <button style={customButton} className="nav-link" onClick={()=>{setTeamName("RCB")}}>RCB</button>
        </li>
        <li className="nav-item">
          <button style={customButton} className="nav-link" onClick={()=>{setTeamName("PK")}}>PK</button>
        </li>
        <li className="nav-item">
          <button style={customButton} className="nav-link" onClick={()=>{setTeamName("KKR")}}>KKR</button>
        </li>
        <li className="nav-item">
          <button style={customButton} className="nav-link" onClick={()=>{setTeamName("DC")}}>DC</button>
        </li>
        <li className="nav-item">
          <button style={customButton} className="nav-link" onClick={()=>{setTeamName("RR")}}>RR</button>
        </li>
        <li className="nav-item">
          <button style={customButton} className="nav-link" onClick={()=>{setTeamName("SRH")}}>SRH</button>
        </li>
      </ul>
      <Row>
      {teamData?
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
                  <Card.Title as="h4" >${teamData['budget']}CR</Card.Title>
                </div>
              </Col>
            </Row>
          </Card.Body>
          <Card.Footer>
            <hr/>
            <button className="stats btn btn-sm" onClick={()=>{history.push('/redirector')}}>
            <i className="fas fa-redo mr-1"></i>
              &nbsp;Update Now
            </button>
          </Card.Footer>
        </Card>
      </Col>:null}
      </Row>

      <Row>
      {powercards.length>0?
        <Col lg="12" sm="12">
        <Card className="card-stats"
        style={{height:"138px"}}
        >
          <Card.Body>
            <Row>
            {
              powercards.map((powercard)=>(
                  <img style={{width:"auto",height:"60px",filter:
                  powercard['used']?"sepia(100%) saturate(300%) brightness(50%) hue-rotate(180deg)":null
                  }} 
                  src={mediaUrl+ powercard['image']}/>
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
      </Col>:null}
      </Row>

      <Row>
      {playerData?
        playerData.map((player,key)=>(
        <Col lg="5" sm="6" key={key}>
          <PlayerCard key={key} image={player.image} color={player.color} name={player.name} overall={player.overall} bat_ppl={player.bat_ppl} bat_mid={player.bat_mid} bat_death={player.bat_death} bow_ppl={player.bow_ppl} bow_death={player.bow_death} bow_mid={player.bow_mid}
          foreign={player.foreign} is_starred={player.is_starred} is_wk={player.is_wk} is_uncapped={player.is_uncapped} price="0"/>
        </Col>
      )):null}
      </Row>

    </React.Fragment>
  );
}

export default allTeams;
