import axiosInstance from 'AxiosInstance'
import React, { Fragment } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { useHistory } from 'react-router'

function PlayerCard(props) {

  const history = useHistory()

  const handlePlaying11 = (action,id)=>{
    axiosInstance.post(`playing11/${action}`,{playerId:id}).then((res)=>console.log(res.data))
    history.push('/redirector')
  }

  return (
    <Card className="card-stats" style={{
      borderRadius: '30px',
      background: 'linear-gradient(45deg,' + props['color'] + ', #313131)',
      color: "#ffb600",
      border: "4px groove white",
      width: "300px",
      margin:"10px auto",
      ...props.style
    }}>
      <Card.Body>
        <Row>
          <Col xs="5">
            <div className="icon-big text-center icon-warning">
              <img
                src={"http://127.0.0.1:8000/media/" + props.image} />
            </div>
          </Col>
          <Col xs="6" style={{ textAlign: "center" }}>
            <h5>{props['name']}</h5>
            <h5>Bat</h5>
            <h5>{props.overall}</h5>
            <h6 style={{ color: "white" }}>{props['foreign'] ? <i className="fas fa-plane" style={{ color: "white" }} /> : null}&nbsp;{props['is_starred'] ? <i className="fas fa-star" style={{ color: "white" }} /> : null}&nbsp;{props['is_wk'] ? "WK" : null}&nbsp;{props['is_uncapped'] ? "UN" : null}</h6>
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer style={{ textAlign: "center" }}>
        <hr style={{ border: '1px solid white' }} />
        {props['price'] != 0 ? 
        <Fragment>
          Price : {props['price']} CR&nbsp;&nbsp;
          {props.playing11?
            <i style={{fontSize:"large",color:"white"}} className='fas fa-minus-circle' onClick={()=>{handlePlaying11("remove",props['id'])}}/>:
            <i style={{fontSize:"large",color:"white"}} className='fas fa-plus-circle' onClick={()=>{handlePlaying11("add",props['id'])}}/>}
          <hr style={{ border: '1px solid white' }}/>
        </Fragment>
        : null}
        <Col xs="6">
          <div className="numbers">
            <p className="card-category">Bat</p>
            <hr style={{ border: '1px solid white' }} />
            <h6>{props.bat_ppl} PPL</h6>
            <hr style={{ border: '1px solid white' }} />
            <h6>{props.bat_mid} MO</h6>
            <hr style={{ border: '1px solid white' }} />
            <h6>{props.bat_death} D</h6>
          </div>
        </Col>
        <Col xs="6">
          <div className="numbers">
            <p className="card-category">Bowl</p>
            <hr style={{ border: '1px solid white' }} />
            <h6>{props.bow_ppl} PPL</h6>
            <hr style={{ border: '1px solid white' }} />
            <h6>{props.bow_mid} MO</h6>
            <hr style={{ border: '1px solid white' }} />
            <h6>{props.bow_death} D</h6>
          </div>
        </Col>
      </Card.Footer>
    </Card>
  )
}

export default PlayerCard
