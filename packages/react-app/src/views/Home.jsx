import { useContractReader } from "eth-hooks";
import React from "react";
import { WagerGrid } from "../components";

/**
 * web3 props can be passed from '../App.jsx' into your local view component for use
 * @param {*} yourLocalBalance balance on current network
 * @param {*} readContracts contracts from current chain already pre-loaded using ethers contract module. More here https://docs.ethers.io/v5/api/contract/contract/
 * @returns react component
 **/
function Home({ yourLocalBalance, readContracts }) {
  // you can also use hooks locally in your component of choice
  // in this case, let's keep track of 'purpose' variable from our contract
  const wagers = useContractReader(readContracts, "BlockWager", "getWagers");
  console.log("🤏 wagers", wagers && wagers);

  return (
    <div>
      <div style={{ margin: 32 }}>
        <WagerGrid wagers={wagers} />
      </div>
      <div style={{ margin: 32 }}>
        <span style={{ marginRight: 8 }}>✏️</span>
        Check out our discord
      </div>
    </div>
  );
}

export default Home;
