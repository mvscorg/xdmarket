pragma solidity ^0.4.11;

import "./zeppelin/Ownable.sol";

contract Market is Ownable {
	string public repo_url;

	struct Reward {
		address publisher;
		uint rewardAmount; // Wei
		uint issueNumber; // number
		uint createTime;
		uint expirationTime;
		address counterParty;
	}

	// THIS?
	uint numRewards;
	mapping (uint => Reward) rewards;

	function Market() public  // constructor
	{
	}

	function getRepoUrl() 
		public
		constant
		returns (string) 
	{
		return repo_url;
	}

	function setRepoUrl(string _repo_url)
		onlyOwner
	{
		repo_url = _repo_url;
	}

	function postReward(uint _issueNumber, uint _expirationTime)
		public
		payable
	{
		numRewards = numRewards + 1;
		rewards[numRewards].publisher = msg.sender;
		rewards[numRewards].rewardAmount = msg.value;
		rewards[numRewards].issueNumber = _issueNumber;
		rewards[numRewards].createTime = now;
		rewards[numRewards].expirationTime = _expirationTime;
		// throw an event that tells the client which record
	}

	function getReward(uint rewardId)
		public
		constant
		returns (
			uint issueNumber,
			uint rewardAmount,
			uint createTime,
			uint expirationTime
		)
	{
		return (
			rewards[rewardId].issueNumber,
			rewards[rewardId].rewardAmount,
			rewards[rewardId].createTime,
			rewards[rewardId].expirationTime
		);
	}

	function getNumRewards() public constant returns (uint)
	{
		return numRewards;
	}


}
