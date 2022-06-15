import { useContractReader } from "eth-hooks";
import { ethers } from "ethers";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { Divider, Card, Row, Col, Typography, Image, Space, Tooltip } from "antd";
import { QuestionCircleTwoTone } from '@ant-design/icons';
import { DECISION_LOGIC_TEXT } from "../helpers/strings"

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
    <div style={{ padding: 2, width: 1100, margin: "auto", marginTop: 64 }}>
      <Space direction="vertical" align="left" size="middle" style={{ display: "flex" }}>
        <Row>
          <Col span={8}>
            <Image width={300} src={wager ? "https://gateway.pinata.cloud/ipfs/" + wager[4] : ""} />
          </Col>
          <Col span={16} align="left">
            <Row>
              <Col>
                <Title>{wager && wager[1]}</Title>
              </Col>
            </Row>
            <Row>
              <Col>{wager && wager[2]}</Col>
            </Row>
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col align="left">
            <Title>
              Decision Logic <Tooltip placement="topLeft" title={DECISION_LOGIC_TEXT}><QuestionCircleTwoTone /></Tooltip>
              </Title>
            {wager && wager[3]}
          </Col>
        </Row>
      </Space>
    </div>
  );
}

export default WagerDetail;
