import axiosInstance from 'AxiosInstance';
import PlayerCard from 'components/PlayerCard';
import React, { useEffect, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'

function Search() {

    const [searchText, setSearchText] = useState();

    const handleSearchText = (event) => {
        setSearchText(event.target.value);
    }

    const [searchResults, setSearchResults] = useState();

    useEffect(() => {
        const getPlayers = async () => {
            const response = (await axiosInstance.get(`search/${searchText}`)).data;
            setSearchResults(response);
        }
        getPlayers();
    }, [searchText]);


    return (
        <>
            <Row>
                <Col xs="9" style={{ margin: "auto" }}>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" onChange={handleSearchText} value={searchText} />
                    </div>
                </Col>
            </Row>
            <Row style={{ margin: "10px" }}>
                {searchResults === undefined || searchResults[0] === undefined ?
                    <h3 style={{ background: "white", borderRadius: "20px", margin: "auto", fontSize: "large", padding: "15px", color: "black", textAlign: "center", width: "50%", fontWeight: "900" }}>Type something to search / No player Found</h3> :
                    searchResults.map((player, key) => (
                        <Col lg="5" sm="6" key={key}>
                            <PlayerCard key={key} image={player.image} color={player.color} name={player.name} overall={player.overall} bat_ppl={player.bat_ppl} bat_mid={player.bat_mid} bat_death={player.bat_death} bow_ppl={player.bow_ppl} bow_death={player.bow_death} bow_mid={player.bow_mid} foreign={player.foreign} is_starred={player.is_starred} is_wk={player.is_wk} is_uncapped={player.is_uncapped} price="0"/>
                        </Col>
                    ))
                }
            </Row>
        </>
    )
}

export default Search
