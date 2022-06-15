import React from "react";
import { Typography } from "antd";
import { Avatar, Card } from "antd";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import * as helpers from "../helpers/helpers";

const { Title, Text } = Typography;

// displays a Wager Card
export default function WagerCard({ wager }) {
  const { Meta } = Card;
  return (
    <Link to={wager ? "/wager/"+wager[0].toNumber() : ""}>
      <Card
        style={{ width: 300 }}
        cover={<img alt="rwwe" src={wager ? "https://gateway.pinata.cloud/ipfs/"+wager[4] : ""} />}
        actions={[<SettingOutlined key="setting" />, <EditOutlined key="edit" />, <EllipsisOutlined key="ellipsis" />]}
      >
        <Meta
          avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
          title={wager && wager[1]}
          description={wager && helpers.truncateString(wager[2], 100)}
        />
      </Card>
    </Link>
  );
}
