var Market = artifacts.require("./Market.sol");

var moment = require('moment');

// assert from chai

contract('Market', function(accounts) {
  var owner = accounts[1];
  var nonowner = accounts[2];

  var instance;

  // reward data
  var publisher = accounts[3];
  var issue_number = 23;
  var expiration_time = moment().add(30, 'days').unix();
  var amount = web3.toWei(1,'ether');

  var counterParty = accounts[4];



  describe("setting the repo url",function(){

    it("is allowed for the owner", function(done) {
      Market.new({
        "from":owner
      }).then(function(_instance){
        instance = _instance;
        return instance.setRepoUrl('mvscorg/xdmarket',{"from":owner});
      }).then(function(tx){
        return instance.getRepoUrl.call();
      }).then(function(result){
        assert.equal('mvscorg/xdmarket',result,'did not return correct repoUrl');
        done();
      });
    }); // it

    it("is not allowed for others", function(done){
      instance.setRepoUrl('mvscorg/xdmarketzz',{"from":nonowner}).catch(function(e){
        done();
      }).then(function(tx){
        assert(false,'mistakenly allowed another user to setRepoUrl');
        done();
      });
    }); // it
  }); // setting the repo url

  describe("the rewards", function() {

    var publisher_balance_pre_reward;
    var publisher_gas_used;


    it('count should be zero initially', function(done){
      instance.getNumRewards.call().then(function(n_rewards){
        assert.equal(0,n_rewards,'there should be zero rewards');
        done();
      })
    });

    it('count should increment after creation', function(done){

      publisher_balance_pre_reward = web3.eth.getBalance(publisher);

      // Question: what are the units of value in these tests?
      instance.postReward(issue_number, expiration_time,{"from":publisher,"value":amount}).then(function(result){
        // console.log('TX result', result);
        // result.tx, result.logs, result.gasUsed,
        publisher_gas_used = result.receipt.gasUsed;
        // gas price!
        // eth: 14290500 000 000 000
        // gas: 142905

        // 1 ether 1e18 wei ( or a billion billion )
        // 1gas = .5TWei or .000 000 05 Eth  .1 microether
        // 1 microether = .1 gas 100 nanoether / GWei = 1 gas

        instance.getNumRewards.call().then(function(n_rewards){
          assert.equal(1,n_rewards,'there should be one reward');
          done();
        })
      })
    });

    it('data should be fetchable by id', function(done) {
      instance.getReward.call(1).then(function(result){
        var _issue_number = parseInt(result[0]),
            reward_amount = parseInt(result[1]),
            create_time = parseInt(result[2]),
            _expiration_time = parseInt(result[3]);
        // well this works, but the format of the amount is weird.
        assert.equal(web3.toWei(1,'ether'), reward_amount, 'reward amount should match');
        assert.equal(issue_number, _issue_number, 'the issue number should match');
        assert(Math.abs(create_time - moment().unix()) < 15,'the create time should fall within 15 seconds');
        assert.equal(expiration_time, _expiration_time, 'the expiration times should be equal');
        // console.log(JSON.stringify([issue_number, reward_amount, create_time, expiration_time]));
        done();
      })
    });

    it('should have a consistent gas price reflected in the publisher balance', function(done){
      // @see : https://github.com/MikeMcl/bignumber.js/
      var publisher_balance_after = web3.eth.getBalance(publisher);
      var cost = publisher_balance_pre_reward.minus(publisher_balance_after).minus(web3.toWei(1,'ether'));
      var gas_price = cost.dividedBy(publisher_gas_used);
      assert.equal(gas_price.dividedBy(1e9).toString(), '100', 'Gas price in gWei should be 100');
      done();
    })

    it('should affect the balance of the contract', function(done){

      instance.getBalance.call().then(function(balance){
        assert.equal(balance, web3.toWei(1,'ether'));
        done();
      })

    })

  });  // end describe the rewards


  describe('the counterParty', function(){

    it('must send the correct total to the counter function.')


  }); // end describe the counterParty



}); // end contract('Market',function(){



//   it("should call a function that depends on a linked library", function() {
//     var meta;
//     var metaCoinBalance;
//     var metaCoinEthBalance;

//     return MetaCoin.deployed().then(function(instance) {
//       meta = instance;
//       return meta.getBalance.call(accounts[0]);
//     }).then(function(outCoinBalance) {
//       metaCoinBalance = outCoinBalance.toNumber();
//       return meta.getBalanceInEth.call(accounts[0]);
//     }).then(function(outCoinBalanceEth) {
//       metaCoinEthBalance = outCoinBalanceEth.toNumber();
//     }).then(function() {
//       assert.equal(metaCoinEthBalance, 2 * metaCoinBalance, "Library function returned unexpected function, linkage may be broken");
//     });
//   });
//   it("should send coin correctly", function() {
//     var meta;

//     // Get initial balances of first and second account.
//     var account_one = accounts[0];
//     var account_two = accounts[1];

//     var account_one_starting_balance;
//     var account_two_starting_balance;
//     var account_one_ending_balance;
//     var account_two_ending_balance;

//     var amount = 10;

//     return MetaCoin.deployed().then(function(instance) {
//       meta = instance;
//       return meta.getBalance.call(account_one);
//     }).then(function(balance) {
//       account_one_starting_balance = balance.toNumber();
//       return meta.getBalance.call(account_two);
//     }).then(function(balance) {
//       account_two_starting_balance = balance.toNumber();
//       return meta.sendCoin(account_two, amount, {from: account_one});
//     }).then(function() {
//       return meta.getBalance.call(account_one);
//     }).then(function(balance) {
//       account_one_ending_balance = balance.toNumber();
//       return meta.getBalance.call(account_two);
//     }).then(function(balance) {
//       account_two_ending_balance = balance.toNumber();

//       assert.equal(account_one_ending_balance, account_one_starting_balance - amount, "Amount wasn't correctly taken from the sender");
//       assert.equal(account_two_ending_balance, account_two_starting_balance + amount, "Amount wasn't correctly sent to the receiver");
//     });
//   });
// });
