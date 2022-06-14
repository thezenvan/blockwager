import React from "react";
import { Typography } from "antd";
import { Avatar, Card } from "antd";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;

// displays a Wager Card
export default function WagerCard({ wager }) {
  const { Meta } = Card;
  return (
    <Link to={wager ? "/wager/"+wager[0].toNumber() : ""}>
      <Card
        style={{ width: 300 }}
        cover={<img alt="rwwe" src={wager ? "https://gateway.pinata.cloud/ipfs/"+wager[5] : ""} />}
        actions={[<SettingOutlined key="setting" />, <EditOutlined key="edit" />, <EllipsisOutlined key="ellipsis" />]}
      >
        <Meta
          avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
          title={wager && wager[2]}
          description={wager && wager[3]}
        />
      </Card>
    </Link>
  );
}
