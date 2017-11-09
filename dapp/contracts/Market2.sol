
// ************************************ //
//
//

struct user {
       uint user_id;
       string name;
}       

struct issue_db {
       uint issuedb_id;
       string url;
}

struct offer {
       address user;
       uint offer_id;
       uint match_params_id;
       uint shares;
       uint percent_required_to_fund;
       uint satoshi_per_share;
       // need to express whether this is a bet on fixed/unfixed, etc.
       enum uint prediction [fixed, unfixed, present, not present];
       // offers are positions if they are part of one and only one contract
       uint position_in_contract_id;  // id of contract that this is a position in or 0 if not a position
}

struct match_params {
       uint match_params_id;       
       uint maturation_date;
       uint issuedb_id; // repo or vuln db 
       uint issue_number; // used for bugfixes only
       array of strings labels[];  // match issue labels or vuln db labels
       enum uint result [fixed, unfixed, present, not present];  // only updated by oracle on maturation
}

struct contract {
       uint contract_id; // the offers list this id to indicate they are part of a contract       
}

// ************************** //
// Data provided directly by users - but handled rails app for now
//

function listUser() {

}

function listMatchParams() {

}

function listOffer() {

}

// ************************** //
// Oracle driven - rails app cannot access
//

function listIssueDb() {
	 // Oracle lists issue db
}

function updateMatchParamResult () {
	 // Oracle updates match params with result on maturation date
}


// ********************** //
// Rails app driven - market matching algos generate this data
//

function listContract() {
	 // when contract is made of offers, add matching offers and establish contract id
}

function updateOffer() {
	 // if offer is sold, update it here
	 // update user/price/etc.
}

function resolveContract() {
	 // we won't have this function here.
	 // the idea was
	 // input is result and a match param id
	 // when outcome is supplied, look at every offer that is 
	 // both part of a contract and contains the match param id
	 // take those match params and decide 

}

