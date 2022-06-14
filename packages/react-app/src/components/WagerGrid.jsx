import React from "react";
import { Col, Row } from "antd";
import WagerCard from "./WagerCard";

// displays a Wager Card
export default function WagerGrid({ wagers }) {
  return (
    <div className="site-card-wrapper">
      <Row>
      {wagers && wagers.map((item) => (
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
          <WagerCard wager={item} />
        </Col>
      ))}
      </Row>
    </div>
  );
}
