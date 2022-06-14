pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";
//import "@openzeppelin/contracts/access/Ownable.sol"; 
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

/**
 * @title BlockWager
 * @author thezenvan.eth
 * @notice fill this
 * @dev fill this
 * NOTE: fill this
 */
contract BlockWager {
  /* ========== GLOBAL VARIABLES ========== */
  enum WagerStatus {
    Open,
    Closed
  }

  struct Wager {
    uint256 wagerId;
    address[] wallets;
    string title;
    string description;
    string decisionLogic;
    string banner;
    uint256 created;
    uint256 endDate;
    WagerStatus status;
    Category category;
  }

  struct Category {
    uint256 categoryId;
    string title;
    string description;
  }

  struct User {
    uint256 userId;
    string name;
    uint256 level;
    uint256 country;
  }

  mapping (uint256 => Wager) public wagers;
  uint256 public totalWagers = 0;
  uint256 public totalCategories = 0;
  mapping (address => uint256[]) public wagersByWallet;

  using SafeMath for uint256; //outlines use of SafeMath for uint256 variables

  /* ========== EVENTS ========== */

  /* ========== CONSTRUCTOR ========== */
  constructor() {
  }

  /* ========== MUTATIVE FUNCTIONS ========== */

  /**
  * @notice fill this
  * NOTE: fill this
  */
  function init() public {

  }

  /**
  * @notice creates a Wager struct and returns it
  * @param _title Wager title
  * @param _description wager description
  * @param _decisionLogic wager decision logic
  * @param _banner wager banner (IPFS link)
  * @param _endDate wager end date
  * @return status true if all is good, false if not
  */
  function createWager(
    string memory _title,
    string memory _description,
    string memory _decisionLogic,
    string memory _banner,
    uint256 _endDate
  ) external returns(bool status) {
    require(bytes(_title).length > 0, 'Title required');
    require(bytes(_description).length > 0, 'Description required');
    require(bytes(_decisionLogic).length > 0, 'Decision Logic required');
    require(bytes(_banner).length > 0, 'Banner required');
    address[] memory newWallets;
    Wager memory newWager = Wager(
      totalWagers,
      newWallets,
      _title,
      _description,
      _decisionLogic,
      _banner,
      block.timestamp,
      _endDate,
      WagerStatus.Open,
      Category(totalCategories, "test", "test cat")
    );
    wagers[totalWagers] = newWager;
    totalWagers++;

    return true;
  }

  /**
  * @notice returns a Wager by ID
  * @param _wagerId the Wager ID
  * @return Wager the Wager struct
  */
  function getWager(uint256 _wagerId) public view returns(Wager memory) {
    return wagers[_wagerId];
  }

  /**
  * @notice returns the lsat 10 wagers in an array to be featured on the homepage
  * @return newWagers an array of Wager
  */
  function getWagers() public view returns(Wager[] memory) {
    Wager[] memory newWagers = new Wager[](totalWagers);
    for (uint i = 0; i < totalWagers; i++) {
        newWagers[i] = wagers[i];
    }
    return newWagers;
  }
}
