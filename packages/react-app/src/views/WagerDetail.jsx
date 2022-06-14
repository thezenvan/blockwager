import { useContractReader } from "eth-hooks";
import { ethers } from "ethers";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { Avatar, Card, Row, Col, Typography, Image } from "antd";

/**
 * web3 props can be passed from '../App.jsx' into your local view component for use
 * @param {*} yourLocalBalance balance on current network
 * @param {*} readContracts contracts from current chain already pre-loaded using ethers contract module. More here https://docs.ethers.io/v5/api/contract/contract/
 * @returns react component
 **/
function WagerDetail({ readContracts }) {
  let { wagerId } = useParams();
  const { Meta } = Card;
  const { Title, Text } = Typography;
  const wager = useContractReader(readContracts, "BlockWager", "getWager", wagerId);
  console.log("🤏 wager", wager && wager);

  return (
    <div style={{ padding: 2, width: 1400, margin: "auto", marginTop: 64 }}>
      <Row>
        <Col span={8}>
          <Image width={400} src={wager ? "https://gateway.pinata.cloud/ipfs/" + wager[5] : ""} />
        </Col>
        <Col span={16}>
          <Row>
            <Col>
              <Title>{wager && wager[2]}</Title>
            </Col>
          </Row>
          <Row>
            <Col>{wager && wager[3]}</Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default WagerDetail;
