var Market = artifacts.require("./Market.sol");

// assert from chai

contract('Market', function(accounts) {
  var owner = accounts[1];
  var nonowner = accounts[2];
  var instance;

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


  });


  // it("should not allow anyone else to change the repo url", function(done) {
  //   var instance;
  //   Market.new({"from":owner})
  //   .then(function(_instance){
  //     instance = _instance;
  //     return instance.setRepoUrl('mvscorg/xdmarket',{"from":accounts[0]});
  //   }).then(function(tx){
  //     assert.notEmpty(tx);
  //     assert(false,'the transaction should have failed');
  //     done();
  //   }).catch(function(e){
  //     done();
  //   });
  // }); // it



});

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
