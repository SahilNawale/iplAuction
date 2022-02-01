import axiosInstance from 'AxiosInstance';
import React, { Fragment, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import PlayerCard from "components/PlayerCard";
import { useHistory } from 'react-router';
import styles from '../assets/css/Calculator.css'


function Calculator() {

  const playerCount = new Map();
  const [score, setScore] = useState(0)
  const history = useHistory()

  const [batsman, set_batsman] = useState();
  const [bowler, set_bowler] = useState();
  const [baseScore, setBaseScore] = useState();
  const [split, setSplit] = useState({
    BAT: {
      PPL: [],//4
      MO: [],//4
      DEATH: [],//2
    },
    BOWL: {
      PPL: [],//4
      MO: [],//4
      DEATH: [],//2
    }
  })

  const handleRemoveplayer = (type, category, player) => {
    split[type][category].map(player => {
      if (type === "BAT") {
        batsman.map(item => {
          if (item.name === player.name) {
            item[category] = false
            item['count']--
          }
        })
      }
      else if (type === "BOWL") {
        bowler.map(item => {
          if (item.name === player.name) {
            item[category] = false
            item['count']--
          }
        })
      }
    })
    let newSplit = { ...split }
    newSplit[type][category] = []
    setSplit(newSplit)
  }

  const handleAddPlayer = (type, category, player) => {
    let newSplit = { ...split }
    newSplit[type][category].push(player)
    if (type === "BAT") {
      batsman.map(item => {
        if (item.name === player.name) {
          item[category] = true
          item['count']++
        }
      })
    }
    else if (type === "BOWL") {
      bowler.map(item => {
        if (item.name === player.name) {
          item[category] = true
          item['count']++
        }
      })
    }
    console.log(batsman)
    setSplit(newSplit)
  }

  const calculateScore = () => {
    console.log(split)
    let temp = 0
    let score = 0
    split['BAT']['PPL'].map(player => {
      temp += player.bat_ppl
    })
    if (temp > 36) score += 5
    else if (temp > 32) score += 3
    else if (temp >= 28) score += 1
    temp = 0;

    split['BAT']['MO'].map(player => {
      temp += player.bat_mid
    })
    if (temp > 36) score += 5
    else if (temp > 32) score += 3
    else if (temp >= 28) score += 1
    temp = 0;

    split['BAT']['DEATH'].map(player => {
      temp += player.bat_death
    })
    if (temp > 18) score += 5
    else if (temp > 16) score += 3
    else if (temp >= 14) score += 1
    temp = 0;

    split['BOWL']['PPL'].map(player => {
      temp += player.bowl_ppl
    })
    if (temp > 27) score += 5
    else if (temp > 24) score += 3
    else if (temp >= 21) score += 1
    temp = 0;
    split['BOWL']['MO'].map(player => {
      temp += player.bowl_mid
    })
    if (temp > 27) score += 5
    else if (temp > 24) score += 3
    else if (temp >= 21) score += 1
    temp = 0;
    split['BOWL']['DEATH'].map(player => {
      temp += player.bowl_death
    })
    if (temp > 18) score += 5
    else if (temp > 16) score += 3
    else if (temp >= 14) score += 1
    temp = 0;

    setScore(baseScore+score)
  }

  const saveScore = () => {
    axiosInstance.post('calculator/save-players', split).then(res => {
      if (res.data === "Success") {
        axiosInstance.post('calculator/save-score', { score: score }).then(res => {
          if (res.data === "Success") {
            history.push('/admin/dashboard')
          }
        })
      }
    })
    
  }


  useEffect(() => {
    axiosInstance.get('calculator/batsman').then(res => {
      set_batsman(res.data)
    })

    axiosInstance.get('calculator/bowler').then(res => {
      set_bowler(res.data)

    })

    axiosInstance.get('playing11/all').then(res=>setBaseScore(res.data['score']))
  }, [])

  return (
    <div class='body'>
      <div class="top-btn">
        <nav>
          <ul class="pagination pagination-lg">
            <li class="page-item">
              <span class="page-link custom-btn" onClick={calculateScore}><i class="fas fa-calculator"></i></span>
            </li>
            <li class="page-item">
              <span id="score" class="page-link">{score}</span>
            </li>
          </ul>
        </nav>
        <nav aria-label="...">
          <ul class="pagination pagination-lg me-2">
            <li
              class="page-item"
              data-bs-toggle="collapse"
              data-bs-target=".multi-collapse"
              aria-controls="collapse1 collapse2"
            >
              <span class="page-link custom-btn"><i class="fas fa-exchange-alt"></i>

              </span>
            </li>
          </ul>
        </nav>
        <nav aria-label="...">
          <ul class="pagination pagination-lg me-2">
            <li class="page-item">
              <span class="page-link custom-btn" onClick={saveScore}><i class="fas fa-check"/></span>
            </li>
          </ul>
        </nav>
      </div>

      <div>
        <div class="collapse multi-collapse show" id="collapse1">
          <div class="custom-container" style={{ textAlign: "center" }}>BAT</div>
          <ul class="pagination pagination-lg me-2">
            <li
              class="page-item"
              data-bs-target="#collapse3"
              data-bs-toggle="collapse"
              aria-controls="collapse3"
            >
              <span class="page-link custom-btn" id="bat-ppl">PPL</span>
            </li>
            <li
              class="page-item"
              data-bs-target="#collapse4"
              data-bs-toggle="collapse"
              aria-controls="collapse4"
            >
              <span class="page-link custom-btn" id="bat-mo">MO</span>
            </li>
            <li
              class="page-item"
              data-bs-target="#collapse5"
              data-bs-toggle="collapse"
              aria-controls="collapse5"
            >
              <span class="page-link custom-btn" id="bat-death">DTH</span>
            </li>
          </ul>
          <div
            class="collapse row custom-container"
            id="collapse3"
            data-parent="#collapse1"
          >
            <div>
              PPL &nbsp; &nbsp;
              <button class="custom-btn type-2 col" onClick={()=>handleRemoveplayer("BAT","PPL")}>
                <i class="fas fa-times"></i>
              </button>
            </div>
            <hr style={{ margin: "10px" }} />
            <div className='row'>
            {split["BAT"]["PPL"] ? split['BAT']['PPL'].map((player, key) => (
              <Col lg="4" sm="6" key={key} style={{ justifyContent: "center" }}>
                  <PlayerCard key={key} image={player.image} color={player.color} name={player.name} overall={player.overall} bat_ppl={player.bat_ppl} bat_mid={player.bat_mid} bat_death={player.bat_death} bow_ppl={player.bow_ppl} bow_death={player.bow_death} bow_mid={player.bow_mid}
                      foreign={player.foreign} is_starred={player.is_starred} is_wk={player.is_wk} is_uncapped={player.is_uncapped} price="0" id={player.id} style={{ margin: "auto", borderRadius: "30px 30px 0px 0px", borderBottom: "None" ,marginTop:"10px"}} />
                  <div style={{ display: "flex", justifyContent: "center", margin: "auto", width: "300px", background: player['color'], border: "4px groove white", borderTop: "none", borderRadius: "0px 0px 30px 30px", padding: "5px" }}>
                  Bat PPL - {player.bat_ppl}
                  </div> 
              </Col>
          )) : null}
            </div>
          </div>
          <div
            class="collapse row custom-container"
            id="collapse4"
            data-parent="#collapse1"
          >
          <div class="col">
          MO &nbsp; &nbsp;
          <button class="custom-btn type-2 col" onClick={()=>handleRemoveplayer("BAT","MO")}>
            <i class="fas fa-times"></i>
          </button>
        </div>
        <hr style={{ margin: "10px" }} />
        <div className='row'>
        {split["BAT"]["MO"] ? split['BAT']['MO'].map((player, key) => (
          <Col lg="4" sm="6" key={key} style={{ justifyContent: "center" }}>
              <PlayerCard key={key} image={player.image} color={player.color} name={player.name} overall={player.overall} bat_ppl={player.bat_ppl} bat_mid={player.bat_mid} bat_death={player.bat_death} bow_ppl={player.bow_ppl} bow_death={player.bow_death} bow_mid={player.bow_mid}
                  foreign={player.foreign} is_starred={player.is_starred} is_wk={player.is_wk} is_uncapped={player.is_uncapped} price="0" id={player.id} style={{ margin: "auto", borderRadius: "30px 30px 0px 0px", borderBottom: "None",marginTop:"10px" }} />
              <div style={{ display: "flex", justifyContent: "center", margin: "auto", width: "300px", background: player['color'], border: "4px groove white", borderTop: "none", borderRadius: "0px 0px 30px 30px", padding: "5px" }}>
              Bat Mid - {player.bat_mid}
              </div>
          </Col>
      )) : null}
        </div>
          </div>
          <div
            class="collapse row custom-container"
            id="collapse5"
            data-parent="#collapse1"
          >
          <div class="col">
          DEATH &nbsp; &nbsp;
          <button class="custom-btn type-2 col" onClick={()=>handleRemoveplayer("BAT","DEATH")}>
            <i class="fas fa-times"></i>
          </button>
        </div>
        <hr style={{ margin: "10px" }} />
        <div className='row'>
        {split["BAT"]["DEATH"] ? split['BAT']['DEATH'].map((player, key) => (
          <Col lg="4" sm="6" key={key} style={{ justifyContent: "center" }}>
              <PlayerCard key={key} image={player.image} color={player.color} name={player.name} overall={player.overall} bat_ppl={player.bat_ppl} bat_mid={player.bat_mid} bat_death={player.bat_death} bow_ppl={player.bow_ppl} bow_death={player.bow_death} bow_mid={player.bow_mid}
                  foreign={player.foreign} is_starred={player.is_starred} is_wk={player.is_wk} is_uncapped={player.is_uncapped} price="0" id={player.id} style={{ margin: "auto", borderRadius: "30px 30px 0px 0px", borderBottom: "None",marginTop:"10px" }} />
              <div style={{ display: "flex", justifyContent: "center", margin: "auto", width: "300px", background: player['color'], border: "4px groove white", borderTop: "none", borderRadius: "0px 0px 30px 30px", padding: "5px" }}>
              Bat Death - {player.bat_death}
              </div>
          </Col>
      )) : null}
        </div>
          </div>
          <div class="row">
          {batsman ? batsman.map((player, key) => (
            <Col lg="4" sm="6" key={key} style={{ justifyContent: "center" }}>
                <PlayerCard key={key} image={player.image} color={player.color} name={player.name} overall={player.overall} bat_ppl={player.bat_ppl} bat_mid={player.bat_mid} bat_death={player.bat_death} bow_ppl={player.bow_ppl} bow_death={player.bow_death} bow_mid={player.bow_mid}
                    foreign={player.foreign} is_starred={player.is_starred} is_wk={player.is_wk} is_uncapped={player.is_uncapped} price="0" id={player.id} style={{ margin: "auto", borderRadius: "30px 30px 0px 0px", borderBottom: "None",marginTop:"10px" }} />
                <div style={{ display: "flex", justifyContent: "center", margin: "auto", width: "300px", background: player['color'], border: "4px groove white", borderTop: "none", borderRadius: "0px 0px 30px 30px", padding: "5px" }}>
                    {split['BAT']['PPL'].length<4 && player['count']<2 && !player['PPL']?<button onClick={() => handleAddPlayer("BAT", "PPL", player)} style={{ background: "black" }} className='btn btn-warning btn-sm me-1'>PPL</button>:null}
                    {split['BAT']['MO'].length<4 && player['count']<2 && !player['MO']?<button onClick={() => handleAddPlayer("BAT", "MO", player)} style={{ background: "black" }} className='btn btn-warning btn-sm me-1'>MO</button>:null}
                    {split['BAT']['DEATH'].length<2 && player['count']<2 && !player['DEATH']?<button onClick={() => handleAddPlayer("BAT", "DEATH", player)} style={{ background: "black" }} className='btn btn-warning btn-sm me-1'>DEATH</button>:null}
                    {player['count']>=2?"Exhausted":null}
                </div>
            </Col>
        )) : <span>Exhausted</span>}
          </div>
        </div>
      </div>

      <div>
        <div class="collapse multi-collapse" id="collapse2">
        <div class="custom-container" style={{ textAlign: "center" }}>BOWL</div>
          <ul class="pagination pagination-lg me-2">
            <li
              class="page-item"
              data-bs-target="#collapse6"
              data-bs-toggle="collapse"
              aria-controls="collapse6"
            >
              <span class="page-link custom-btn" id="bowl-ppl">PPL</span>
            </li>
            <li
              class="page-item"
              data-bs-target="#collapse7"
              data-bs-toggle="collapse"
              aria-controls="collapse7"
            >
              <span class="page-link custom-btn" id="bowl-mo">MO</span>
            </li>
            <li
              class="page-item"
              data-bs-target="#collapse8"
              data-bs-toggle="collapse"
              aria-controls="collapse8"
            >
              <span class="page-link custom-btn" id="bowl-death">DTH</span>
            </li>
          </ul>
          <div>
            <div class="collapse row custom-container" id="collapse6">
            <div class="col">
            PPL &nbsp; &nbsp;
            <button class="custom-btn type-2 col" onClick={()=>handleRemoveplayer("BOWL","PPL")}>
              <i class="fas fa-times"></i>
            </button>
          </div>
          <hr style={{ margin: "10px" }} />
          <div className='row'>
          {split["BOWL"]["PPL"] ? split['BOWL']['PPL'].map((player, key) => (
            <Col lg="4" sm="6" key={key} style={{ justifyContent: "center" }}>
                <PlayerCard key={key} image={player.image} color={player.color} name={player.name} overall={player.overall} bat_ppl={player.bat_ppl} bat_mid={player.bat_mid} bat_death={player.bat_death} bow_ppl={player.bow_ppl} bow_death={player.bow_death} bow_mid={player.bow_mid}
                    foreign={player.foreign} is_starred={player.is_starred} is_wk={player.is_wk} is_uncapped={player.is_uncapped} price="0" id={player.id} style={{ margin: "auto", borderRadius: "30px 30px 0px 0px", borderBottom: "None",marginTop:"10px" }} />
                <div style={{ display: "flex", justifyContent: "center", margin: "auto", width: "300px", background: player['color'], border: "4px groove white", borderTop: "none", borderRadius: "0px 0px 30px 30px", padding: "5px" }}>
                Bowl PPL - {player.bowl_ppl}
                </div>
            </Col>
        )) : null}
          </div>
            </div>
            <div class="collapse row custom-container" id="collapse7">
            <div class="col">
            MO &nbsp; &nbsp;
            <button class="custom-btn type-2 col" onClick={()=>handleRemoveplayer("BOWL","MO")}>
              <i class="fas fa-times"></i>
            </button>
          </div>
          <hr style={{ margin: "10px" }} />
          <div className='row'>
          {split["BOWL"]["MO"] ? split['BOWL']['MO'].map((player, key) => (
            <Col lg="4" sm="6" key={key} style={{ justifyContent: "center" }}>
                <PlayerCard key={key} image={player.image} color={player.color} name={player.name} overall={player.overall} bat_ppl={player.bat_ppl} bat_mid={player.bat_mid} bat_death={player.bat_death} bow_ppl={player.bow_ppl} bow_death={player.bow_death} bow_mid={player.bow_mid}
                    foreign={player.foreign} is_starred={player.is_starred} is_wk={player.is_wk} is_uncapped={player.is_uncapped} price="0" id={player.id} style={{ margin: "auto", borderRadius: "30px 30px 0px 0px", borderBottom: "None",marginTop:"10px" }} />
                <div style={{ display: "flex", justifyContent: "center", margin: "auto", width: "300px", background: player['color'], border: "4px groove white", borderTop: "none", borderRadius: "0px 0px 30px 30px", padding: "5px" }}>
                Bowl Mid - {player.bowl_ppl}
                </div>
            </Col>
        )) : null}
          </div>
            </div>
            <div class="collapse row custom-container" id="collapse8">
            <div class="col">
            DEATH &nbsp; &nbsp;
            <button class="custom-btn type-2 col" onClick={()=>handleRemoveplayer("BOWL","DEATH")}>
              <i class="fas fa-times"></i>
            </button>
          </div>
          <hr style={{ margin: "10px" }} />
          <div className='row'>
          {split["BOWL"]["DEATH"] ? split['BOWL']['DEATH'].map((player, key) => (
            <Col lg="4" sm="6" key={key} style={{ justifyContent: "center" }}>
                <PlayerCard key={key} image={player.image} color={player.color} name={player.name} overall={player.overall} bat_ppl={player.bat_ppl} bat_mid={player.bat_mid} bat_death={player.bat_death} bow_ppl={player.bow_ppl} bow_death={player.bow_death} bow_mid={player.bow_mid}
                    foreign={player.foreign} is_starred={player.is_starred} is_wk={player.is_wk} is_uncapped={player.is_uncapped} price="0" id={player.id} style={{ margin: "auto", borderRadius: "30px 30px 0px 0px", borderBottom: "None",marginTop:"10px" }} />
                <div style={{ display: "flex", justifyContent: "center", margin: "auto", width: "300px", background: player['color'], border: "4px groove white", borderTop: "none", borderRadius: "0px 0px 30px 30px", padding: "5px" }}>
                Bowl Death- {player.bowl_ppl}
                </div>
            </Col>
        )) : null}
          </div>
            </div>
          </div>
          <div className='row'>
          {bowler ? bowler.map((player, key) => (
            <Col lg="4" sm="6" key={key} style={{ justifyContent: "center" }}>
                <PlayerCard key={key} image={player.image} color={player.color} name={player.name} overall={player.overall} bat_ppl={player.bat_ppl} bat_mid={player.bat_mid} bat_death={player.bat_death} bow_ppl={player.bow_ppl} bow_death={player.bow_death} bow_mid={player.bow_mid}
                    foreign={player.foreign} is_starred={player.is_starred} is_wk={player.is_wk} is_uncapped={player.is_uncapped} price="0" id={player.id} style={{ margin: "auto", borderRadius: "30px 30px 0px 0px", borderBottom: "None",marginTop:"10px" }} />
                <div style={{ display: "flex", justifyContent: "center", margin: "auto", width: "300px", background: player['color'], border: "4px groove white", borderTop: "none", borderRadius: "0px 0px 30px 30px", padding: "5px" }}>
                {split['BOWL']['PPL'].length<3 && player['count']<2 && !player['PPL']?<button onClick={() => handleAddPlayer("BOWL", "PPL", player)} style={{ background: "black" }} className='btn btn-warning btn-sm me-1'>PPL</button>:null}
                {split['BOWL']['MO'].length<3 && player['count']<2 && !player['MO']?<button onClick={() => handleAddPlayer("BOWL", "MO", player)} style={{ background: "black" }} className='btn btn-warning btn-sm me-1'>MO</button>:null}
                {split['BOWL']['DEATH'].length<2 && player['count']<2 && !player['DEATH']?<button onClick={() => handleAddPlayer("BOWL", "DEATH", player)} style={{ background: "black" }} className='btn btn-warning btn-sm me-1'>DEATH</button>:null}
                {player['count']>=2?"Exhausted":null}
                </div>
            </Col>
        )) : <span>Exhausted</span>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calculator
