// deploy/00_deploy_your_contract.js
const { LoremIpsum } = require("lorem-ipsum");
const { ethers } = require("hardhat");

const localChainId = "31337";

// const sleep = (ms) =>
//   new Promise((r) =>
//     setTimeout(() => {
//       console.log(`waited for ${(ms / 1000).toFixed(3)} seconds`);
//       r();
//     }, ms)
//   );

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

module.exports = async ({
  getNamedAccounts,
  getUnnamedAccounts,
  deployments,
  getChainId,
}) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const { users } = await getUnnamedAccounts();
  const chainId = await getChainId();

  await deploy("BlockWager", {
    // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
    from: deployer,
    // args: [ "Hello", ethers.utils.parseEther("1.5") ],
    log: true,
    waitConfirmations: 5,
  });

  // Getting a previously deployed contract
  const BlockWager = await ethers.getContract("BlockWager", deployer);

  const createTestWagers = async () => {
    console.log("test");
    try {
      await BlockWager.createWager(
        lorem.generateWords(3),
        lorem.generateParagraphs(2),
        lorem.generateParagraphs(2),
        "QmNMjWwk87fyRtVCwhQ38fAPohFeY6NTKMKHws6oqbQQjs/11.png",
        1625097600,
        ["Yes", "No"]
      );
    } catch (e) {
      console.error(e);
    }
  };

  console.log("Creating Wagers");
  // createTestWagers(BlockWager);

  // create a few wagers (do this with a for loop)
  try {
    await BlockWager.createWager(
      lorem.generateWords(3),
      lorem.generateParagraphs(2),
      lorem.generateParagraphs(2),
      "QmNMjWwk87fyRtVCwhQ38fAPohFeY6NTKMKHws6oqbQQjs/11.png",
      1625097600,
      ["Yes", "No"]
    );
    await BlockWager.createWager(
      lorem.generateWords(3),
      lorem.generateParagraphs(2),
      lorem.generateParagraphs(2),
      "QmNMjWwk87fyRtVCwhQ38fAPohFeY6NTKMKHws6oqbQQjs/12.png",
      1623097322,
      ["Yes", "No"]
    );
    await BlockWager.createWager(
      lorem.generateWords(3),
      lorem.generateParagraphs(2),
      lorem.generateParagraphs(2),
      "QmNMjWwk87fyRtVCwhQ38fAPohFeY6NTKMKHws6oqbQQjs/9.png",
      1625097600,
      ["Yes", "No"]
    );
    await BlockWager.createWager(
      lorem.generateWords(3),
      lorem.generateParagraphs(2),
      lorem.generateParagraphs(2),
      "QmNMjWwk87fyRtVCwhQ38fAPohFeY6NTKMKHws6oqbQQjs/8.png",
      1625097600,
      ["Yes", "No"]
    );
    await BlockWager.createWager(
      lorem.generateWords(3),
      lorem.generateParagraphs(2),
      lorem.generateParagraphs(2),
      "QmNMjWwk87fyRtVCwhQ38fAPohFeY6NTKMKHws6oqbQQjs/7.png",
      1625097600,
      ["Yes", "No"]
    );

    // cast some votes
    console.log("Casting votes...");
    await BlockWager.createVote(0, 1, {
      value: ethers.utils.parseUnits("0.001", "ether"),
    });
  } catch (e) {
    console.error(e);
  }

  /*
    To take ownership of yourContract using the ownable library uncomment next line and add the 
    address you want to be the owner. 
    // await yourContract.transferOwnership(YOUR_ADDRESS_HERE);

    //const yourContract = await ethers.getContractAt('YourContract', "0xaAC799eC2d00C013f1F11c37E654e59B0429DF6A") //<-- if you want to instantiate a version of a contract at a specific address!
  */

  /*
  //If you want to send value to an address from the deployer
  const deployerWallet = ethers.provider.getSigner()
  await deployerWallet.sendTransaction({
    to: "0x34aA3F359A9D614239015126635CE7732c18fDF3",
    value: ethers.utils.parseEther("0.001")
  })
  */

  /*
  //If you want to send some ETH to a contract on deploy (make your constructor payable!)
  const yourContract = await deploy("YourContract", [], {
  value: ethers.utils.parseEther("0.05")
  });
  */

  /*
  //If you want to link a library into your contract:
  // reference: https://github.com/austintgriffith/scaffold-eth/blob/using-libraries-example/packages/hardhat/scripts/deploy.js#L19
  const yourContract = await deploy("YourContract", [], {}, {
   LibraryName: **LibraryAddress**
  });
  */

  // Verify from the command line by running `yarn verify`

  // You can also Verify your contracts with Etherscan here...
  // You don't want to verify on localhost
  // try {
  //   if (chainId !== localChainId) {
  //     await run("verify:verify", {
  //       address: YourContract.address,
  //       contract: "contracts/YourContract.sol:YourContract",
  //       constructorArguments: [],
  //     });
  //   }
  // } catch (error) {
  //   console.error(error);
  // }
};
module.exports.tags = ["BlockWager"];
