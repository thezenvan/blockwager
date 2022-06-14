import { useContractReader } from "eth-hooks";
import { ethers } from "ethers";
import React from "react";
import { Link } from "react-router-dom";
import WagerGrid from "../components/WagerGrid";

/**
 * web3 props can be passed from '../App.jsx' into your local view component for use
 * @param {*} yourLocalBalance balance on current network
 * @param {*} readContracts contracts from current chain already pre-loaded using ethers contract module. More here https://docs.ethers.io/v5/api/contract/contract/
 * @returns react component
 **/
function WagerDetail({ readContracts }) {
  // you can also use hooks locally in your component of choice
  // in this case, let's keep track of 'purpose' variable from our contract
  const wagers = useContractReader(readContracts, "BlockWager", "getWagers");
  console.log("🤏 wagers",wagers && wagers[1][0].toNumber())

  return (
    <div>
      <div style={{ border: "1px solid #cccccc", padding: 16, width: 400, margin: "auto", marginTop: 64 }}>
        *********** WAGER DETAIL ************
        <WagerGrid wagers={wagers} />
      </div>
      <div style={{ margin: 32 }}>
        <span style={{ marginRight: 8 }}>✏️</span>
          Check out our discord
      </div>
    </div>
  );
}

export default WagerDetail;
