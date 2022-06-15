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
    string title;
    string description;
    string decisionLogic;
    string banner;
    uint256 created;
    uint256 endDate;
    WagerStatus status;
    Category category;
    string[] options;
    Vote[] votes;
  }

  struct Vote {
    address voteWallet;
    uint256 vote;
    uint256 voteDate;
    uint256 wagerAmount;
    uint256 timeMultiplier;
  }

  struct Category {
    uint256 categoryId;
    string title;
    string description;
  }

  struct User {
    uint256 userId;
    address userWallet;
    string name;
    uint256 level;
    uint256 country;
  }

  Wager[] wagers;
  uint256 public totalWagers = 0;
  uint256 public totalCategories = 0;

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
    uint256 _endDate,
    string[] memory options
  ) external returns(bool status) {
    require(bytes(_title).length > 0, 'Title required');
    require(bytes(_description).length > 0, 'Description required');
    require(bytes(_decisionLogic).length > 0, 'Decision Logic required');
    require(bytes(_banner).length > 0, 'Banner required');
    require(options.length > 0, 'Options required');
    Wager storage newWager = wagers.push();
    newWager.wagerId = totalWagers;
    newWager.title = _title;
    newWager.description = _description;
    newWager.decisionLogic = _decisionLogic;
    newWager.banner = _banner;
    newWager.created = block.timestamp;
    newWager.endDate = _endDate;
    newWager.status = WagerStatus.Open;
    newWager.category = Category(totalCategories, "test", "test cat");
    newWager.options = options;
    totalWagers++;
    return true;
  }

  /**
  * @notice returns a Wager by ID
  * @param _wagerId the Wager ID
  * @return Wager the Wager struct
  */
  function getWager(
    uint256 _wagerId
  ) public view returns(Wager memory) {
    return wagers[_wagerId];
  }

  /**
  * @notice returns the last 10 wagers in an array to be featured on the homepage
  * @return newWagers an array of Wager
  */
  function getWagers() public view returns(Wager[] memory) {
    Wager[] memory newWagers = new Wager[](totalWagers);
    for (uint i = 0; i < totalWagers; i++) {
      // only return useful stuff
      newWagers[i].wagerId = wagers[i].wagerId;
      newWagers[i].title = wagers[i].title;
      newWagers[i].description = wagers[i].description;
      newWagers[i].decisionLogic = wagers[i].decisionLogic;
      newWagers[i].banner = wagers[i].banner;
      newWagers[i].created = wagers[i].created;
      newWagers[i].endDate = wagers[i].endDate;
      newWagers[i].status = wagers[i].status;
      newWagers[i].category = wagers[i].category;
    }
    return newWagers;
  }

  /**
  * @notice create a Vote and adds to the appropriate Wager votes array
  * @param _wagerId the Wager ID
  * @return Wager the Wager struct
  */
  function createVote(
    uint256 _wagerId,
    uint256 _vote,
    uint256 _wagerAmount,
    uint256 _timeMultiplier
  ) public returns(Wager memory) {
    Vote memory newVote;
    newVote.voteWallet = msg.sender;
    newVote.vote = _vote;
    newVote.voteDate = block.timestamp;
    newVote.wagerAmount = _wagerAmount;
    newVote.timeMultiplier = _timeMultiplier;
    wagers[_wagerId].votes.push(newVote);
    return wagers[_wagerId];
  }
}
