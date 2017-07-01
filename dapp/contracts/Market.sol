pragma solidity ^0.4.11;

contract Market {
	address public owner;
	string public repo_url;

	modifier onlyOwner() 
	{ // Modifier
		require(msg.sender == owner);
		_;
	}

	function Market() public  // constructor
	{
		owner = msg.sender;
	}

	function getRepoUrl() constant returns (string) 
	{
		return repo_url;
	}

	function setRepoUrl(string _repo_url) onlyOwner
	{
		repo_url = _repo_url;
	}

	/**********
     Standard kill() function to recover funds 
     **********/
    
    function kill()
    { 
        if (msg.sender == owner)  // only allow this action if the account sending the signal is the creator
            suicide(owner);       // kills this contract and sends remaining funds back to creator
    }

}

// contract MetaCoin {
// 	mapping (address => uint) balances;

// 	event Transfer(address indexed _from, address indexed _to, uint256 _value);

// 	function MetaCoin() {
// 		balances[tx.origin] = 10000;
// 	}

// 	function sendCoin(address receiver, uint amount) returns(bool sufficient) {
// 		if (balances[msg.sender] < amount) return false;
// 		balances[msg.sender] -= amount;
// 		balances[receiver] += amount;
// 		Transfer(msg.sender, receiver, amount);
// 		return true;
// 	}

// 	function getBalanceInEth(address addr) returns(uint){
// 		return ConvertLib.convert(getBalance(addr),2);
// 	}

// 	function getBalance(address addr) returns(uint) {
// 		return balances[addr];
// 	}
// }
