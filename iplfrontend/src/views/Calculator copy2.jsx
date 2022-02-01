import axiosInstance from 'AxiosInstance';
import React, { Fragment, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import PlayerCard from "components/PlayerCard";
import { useHistory } from 'react-router';
import styles from '../assets/css/Calculator.module.css'


function Calculator() {

    const playerCount = new Map();
    const [score,setScore] = useState(0)
    const history = useHistory()

    const [batsman, set_batsman] = useState();
    const [bowler, set_bowler] = useState();
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

    const handleRemoveplayer = (type,category,player)=>{
        split[type][category].map(player=>{
            if(type==="BAT"){
                batsman.map(item=>{
                    if(item.name===player.name){
                        item[category]=false
                        item['count']--
                    }
                })    
            }
            else if(type==="BOWL"){
                bowler.map(item=>{
                    if(item.name===player.name){
                        item[category]=false
                        item['count']--
                    }
                })    
            }
        })
        let newSplit = {...split}
        newSplit[type][category] = []
        setSplit(newSplit)
    }

    const handleAddPlayer = (type, category, player) => {
        let newSplit = { ...split }
        newSplit[type][category].push(player)
        if(type==="BAT"){
            batsman.map(item=>{
                if(item.name===player.name){
                    item[category]=true
                    item['count']++
                }
            })    
        }
        else if(type==="BOWL"){
            bowler.map(item=>{
                if(item.name===player.name){
                    item[category]=true
                    item['count']++
                }
            })    
        }
        console.log(batsman)
        setSplit(newSplit)
    }

    const calculateScore = ()=>{
        let temp=0
        let score=0
        split['BAT']['PPL'].map(player=>{
            score+=player.overall
            player.is_starred?score+=2:null
            temp += player.bat_ppl
        })
        if(temp>36) score+=5
        else if(temp>32) score+=3
        else if(temp>=28) score+=1
        temp = 0;

        split['BAT']['MO'].map(player=>{
            score+=player.overall
            player.is_starred?score+=2:null
            temp += player.bat_mid
        })
        if(temp>36) score+=5
        else if(temp>32) score+=3
        else if(temp>=28) score+=1
        temp = 0;
        
        split['BAT']['DEATH'].map(player=>{
            score+=player.overall
            player.is_starred?score+=2:null
            temp += player.bat_death
        })
        if(temp>18) score+=5
        else if(temp>16) score+=3
        else if(temp>=14) score+=1
        temp = 0;
        
        split['BOWL']['PPL'].map(player=>{
            score+=player.overall
            player.is_starred?score+=2:null
            temp += player.bowl_ppl
        })
        if(temp>27) score+=5
        else if(temp>24) score+=3
        else if(temp>=21) score+=1
        temp = 0;
        split['BOWL']['MO'].map(player=>{
            score+=player.overall
            player.is_starred?score+=2:null
            temp += player.bowl_mid
        })
        if(temp>27) score+=5
        else if(temp>24) score+=3
        else if(temp>=21) score+=1
        temp = 0;
        split['BOWL']['DEATH'].map(player=>{
            score+=player.overall
            player.is_starred?score+=2:null
            temp += player.bowl_death
        })
        if(temp>18) score+=5
        else if(temp>16) score+=3
        else if(temp>=14) score+=1
        temp = 0;

        setScore(score)
    }

    const saveScore = ()=>{
        axiosInstance.post('calculator/save-players',split).then(res=>{
            if(res.data==="Success"){
                axiosInstance.post('calculator/save-score',{score:score}).then(res=>{
                    if(res.data==="Success"){
                        history.push('/admin/dashboard')
                    }
                })      
            }
        })
    }


    useEffect(() => {
        axiosInstance.get('calculator/batsman').then(res =>{
            set_batsman(res.data) 
        })

        axiosInstance.get('calculator/bowler').then(res =>{
            set_bowler(res.data)

        })
    }, [])

    return (
        <div className={styles.background}>
        {score}
        
            <div class="accordion" id="accordionExample">
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Batting
                        </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <Row>
                                PPL
                                <button className='btn btn-primary' onClick={()=>handleRemoveplayer("BAT","PPL")}>Clear</button>
                                {split["BAT"]["PPL"] ? split['BAT']['PPL'].map((player, key) => (
                                    <Col lg="4" sm="6" key={key} style={{ justifyContent: "center" }}>
                                        <PlayerCard key={key} image={player.image} color={player.color} name={player.name} overall={player.overall} bat_ppl={player.bat_ppl} bat_mid={player.bat_mid} bat_death={player.bat_death} bow_ppl={player.bow_ppl} bow_death={player.bow_death} bow_mid={player.bow_mid}
                                            foreign={player.foreign} is_starred={player.is_starred} is_wk={player.is_wk} is_uncapped={player.is_uncapped} price="0" id={player.id} style={{ margin: "auto", borderRadius: "30px 30px 0px 0px", borderBottom: "None" }} />
                                        <div style={{ display: "flex", justifyContent: "center", margin: "auto", width: "300px", background: player['color'], border: "4px groove white", borderTop: "none", borderRadius: "0px 0px 30px 30px", padding: "5px" }}>
                                        </div>
                                    </Col>
                                )) : null}
                            </Row>
                            <Row>
                                MO
                                <button className='btn btn-primary' onClick={()=>handleRemoveplayer("BAT","MO")}>Clear</button>
                                {split['BAT']['MO'] ? split['BAT']['MO'].map((player, key) => (
                                    <Col lg="4" sm="6" key={key} style={{ justifyContent: "center" }}>
                                        <PlayerCard key={key} image={player.image} color={player.color} name={player.name} overall={player.overall} bat_ppl={player.bat_ppl} bat_mid={player.bat_mid} bat_death={player.bat_death} bow_ppl={player.bow_ppl} bow_death={player.bow_death} bow_mid={player.bow_mid}
                                            foreign={player.foreign} is_starred={player.is_starred} is_wk={player.is_wk} is_uncapped={player.is_uncapped} price="0" id={player.id} style={{ margin: "auto", borderRadius: "30px 30px 0px 0px", borderBottom: "None" }} />
                                        <div style={{ display: "flex", justifyContent: "center", margin: "auto", width: "300px", background: player['color'], border: "4px groove white", borderTop: "none", borderRadius: "0px 0px 30px 30px", padding: "5px" }}>
                                        </div>
                                    </Col>
                                )) : null}
                            </Row>
                            <Row>
                                DEATH
                                <button className='btn btn-primary' onClick={()=>handleRemoveplayer("BAT","DEATH")}>Clear</button>
                                {split['BAT']['DEATH'] ? split['BAT']['DEATH'].map((player, key) => (
                                    <Col lg="4" sm="6" key={key} style={{ justifyContent: "center" }}>
                                        <PlayerCard key={key} image={player.image} color={player.color} name={player.name} overall={player.overall} bat_ppl={player.bat_ppl} bat_mid={player.bat_mid} bat_death={player.bat_death} bow_ppl={player.bow_ppl} bow_death={player.bow_death} bow_mid={player.bow_mid}
                                            foreign={player.foreign} is_starred={player.is_starred} is_wk={player.is_wk} is_uncapped={player.is_uncapped} price="0" id={player.id} style={{ margin: "auto", borderRadius: "30px 30px 0px 0px", borderBottom: "None" }} />
                                        <div style={{ display: "flex", justifyContent: "center", margin: "auto", width: "300px", background: player['color'], border: "4px groove white", borderTop: "none", borderRadius: "0px 0px 30px 30px", padding: "5px" }}>
                                        </div>
                                    </Col>
                                )) : null}
                            </Row>
                            <Row>
                                {batsman ? batsman.map((player, key) => (
                                    <Col lg="4" sm="6" key={key} style={{ justifyContent: "center" }}>
                                        <PlayerCard key={key} image={player.image} color={player.color} name={player.name} overall={player.overall} bat_ppl={player.bat_ppl} bat_mid={player.bat_mid} bat_death={player.bat_death} bow_ppl={player.bow_ppl} bow_death={player.bow_death} bow_mid={player.bow_mid}
                                            foreign={player.foreign} is_starred={player.is_starred} is_wk={player.is_wk} is_uncapped={player.is_uncapped} price="0" id={player.id} style={{ margin: "auto", borderRadius: "30px 30px 0px 0px", borderBottom: "None" }} />
                                        <div style={{ display: "flex", justifyContent: "center", margin: "auto", width: "300px", background: player['color'], border: "4px groove white", borderTop: "none", borderRadius: "0px 0px 30px 30px", padding: "5px" }}>
                                            {split['BAT']['PPL'].length<4 && player['count']<2 && !player['PPL']?<button onClick={() => handleAddPlayer("BAT", "PPL", player)} style={{ background: "black" }} className='btn btn-warning btn-sm me-1'>PPL</button>:null}
                                            {split['BAT']['MO'].length<4 && player['count']<2 && !player['MO']?<button onClick={() => handleAddPlayer("BAT", "MO", player)} style={{ background: "black" }} className='btn btn-warning btn-sm me-1'>MO</button>:null}
                                            {split['BAT']['DEATH'].length<2 && player['count']<2 && !player['DEATH']?<button onClick={() => handleAddPlayer("BAT", "DEATH", player)} style={{ background: "black" }} className='btn btn-warning btn-sm me-1'>DEATH</button>:null}
                                        </div>
                                    </Col>
                                )) : null}
                            </Row>
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingTwo">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Bowling
                        </button>
                    </h2>
                    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <div class="accordion-body">
                                <Row>
                                    PPL
                                    <button className='btn btn-primary' onClick={()=>handleRemoveplayer("BOWL","PPL")}>Clear</button>
                                    {split["BOWL"]["PPL"] ? split['BOWL']['PPL'].map((player, key) => (
                                        <Col lg="4" sm="6" key={key} style={{ justifyContent: "center" }}>
                                            <PlayerCard key={key} image={player.image} color={player.color} name={player.name} overall={player.overall} bat_ppl={player.bat_ppl} bat_mid={player.bat_mid} bat_death={player.bat_death} bow_ppl={player.bow_ppl} bow_death={player.bow_death} bow_mid={player.bow_mid}
                                                foreign={player.foreign} is_starred={player.is_starred} is_wk={player.is_wk} is_uncapped={player.is_uncapped} price="0" id={player.id} style={{ margin: "auto", borderRadius: "30px 30px 0px 0px", borderBottom: "None" }} />
                                            <div style={{ display: "flex", justifyContent: "center", margin: "auto", width: "300px", background: player['color'], border: "4px groove white", borderTop: "none", borderRadius: "0px 0px 30px 30px", padding: "5px" }}>
                                            </div>
                                        </Col>
                                    )) : null}
                                </Row>
                                <Row>
                                    MO
                                    <button className='btn btn-primary' onClick={()=>handleRemoveplayer("BOWL","MO")}>Clear</button>
                                    {split['BOWL']['MO'] ? split['BOWL']['MO'].map((player, key) => (
                                        <Col lg="4" sm="6" key={key} style={{ justifyContent: "center" }}>
                                            <PlayerCard key={key} image={player.image} color={player.color} name={player.name} overall={player.overall} bat_ppl={player.bat_ppl} bat_mid={player.bat_mid} bat_death={player.bat_death} bow_ppl={player.bow_ppl} bow_death={player.bow_death} bow_mid={player.bow_mid}
                                                foreign={player.foreign} is_starred={player.is_starred} is_wk={player.is_wk} is_uncapped={player.is_uncapped} price="0" id={player.id} style={{ margin: "auto", borderRadius: "30px 30px 0px 0px", borderBottom: "None" }} />
                                            <div style={{ display: "flex", justifyContent: "center", margin: "auto", width: "300px", background: player['color'], border: "4px groove white", borderTop: "none", borderRadius: "0px 0px 30px 30px", padding: "5px" }}>
                                            </div>
                                        </Col>
                                    )) : null}
                                </Row>
                                <Row>
                                    DEATH
                                    <button className='btn btn-primary' onClick={()=>handleRemoveplayer("BOWL","MO")}>Clear</button>
                                    {split['BOWL']['DEATH'] ? split['BOWL']['DEATH'].map((player, key) => (
                                        <Col lg="4" sm="6" key={key} style={{ justifyContent: "center" }}>
                                            <PlayerCard key={key} image={player.image} color={player.color} name={player.name} overall={player.overall} bat_ppl={player.bat_ppl} bat_mid={player.bat_mid} bat_death={player.bat_death} bow_ppl={player.bow_ppl} bow_death={player.bow_death} bow_mid={player.bow_mid}
                                                foreign={player.foreign} is_starred={player.is_starred} is_wk={player.is_wk} is_uncapped={player.is_uncapped} price="0" id={player.id} style={{ margin: "auto", borderRadius: "30px 30px 0px 0px", borderBottom: "None" }} />
                                            <div style={{ display: "flex", justifyContent: "center", margin: "auto", width: "300px", background: player['color'], border: "4px groove white", borderTop: "none", borderRadius: "0px 0px 30px 30px", padding: "5px" }}>
                                            </div>
                                        </Col>
                                    )) : null}
                                </Row>
                                <Row>
                                    {bowler ? bowler.map((player, key) => (
                                        <Col lg="4" sm="6" key={key} style={{ justifyContent: "center" }}>
                                            <PlayerCard key={key} image={player.image} color={player.color} name={player.name} overall={player.overall} bat_ppl={player.bat_ppl} bat_mid={player.bat_mid} bat_death={player.bat_death} bow_ppl={player.bow_ppl} bow_death={player.bow_death} bow_mid={player.bow_mid}
                                                foreign={player.foreign} is_starred={player.is_starred} is_wk={player.is_wk} is_uncapped={player.is_uncapped} price="0" id={player.id} style={{ margin: "auto", borderRadius: "30px 30px 0px 0px", borderBottom: "None" }} />
                                            <div style={{ display: "flex", justifyContent: "center", margin: "auto", width: "300px", background: player['color'], border: "4px groove white", borderTop: "none", borderRadius: "0px 0px 30px 30px", padding: "5px" }}>
                                            {split['BOWL']['PPL'].length<3 && player['count']<2 && !player['PPL']?<button onClick={() => handleAddPlayer("BOWL", "PPL", player)} style={{ background: "black" }} className='btn btn-warning btn-sm me-1'>PPL</button>:null}
                                            {split['BOWL']['MO'].length<3 && player['count']<2 && !player['MO']?<button onClick={() => handleAddPlayer("BOWL", "MO", player)} style={{ background: "black" }} className='btn btn-warning btn-sm me-1'>MO</button>:null}
                                            {split['BOWL']['DEATH'].length<2 && player['count']<2 && !player['DEATH']?<button onClick={() => handleAddPlayer("BOWL", "DEATH", player)} style={{ background: "black" }} className='btn btn-warning btn-sm me-1'>DEATH</button>:null}
                                            </div>
                                        </Col>
                                    )) : null}
                                </Row>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button className='btn btn-primary' onClick={calculateScore}>Calculate</button>
            <button className='btn btn-primary' onClick={saveScore}>Save</button>
        </div>
    )
}

export default Calculator
