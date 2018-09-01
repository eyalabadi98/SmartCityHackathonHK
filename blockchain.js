const Datum = require('datum-sdk');

console.log("Starting Call")
start();
console.log("End")



async function start(){
// --> Used to create an identity
// Datum.createIdentity("smartcityhackHK").then(identity => {
//     console.log(identity);
// })

var seed = "perfect head ghost wagon term book sock surge zebra door adapt picture"
//create new datum instance
datum = new Datum();

// var identity = Datum.createIdentity();
var identity =new Datum().Identity();

await identity.recover(seed,"smartcityhk", 6)
// .then(wallet => {

//     console.log("Recover done")
//     //init with keystore and array of publicKeys that have access, e.g. Developer
//     datum.initialize({
//         identity: JSON.stringify(identity.keystore),
//     });
// }). catch(error => {
//     console.log(error);
// });
await datum.initialize({identity:JSON.stringify(identity.keystore)});


// // Get Balance
// Datum.getBalance(datum.identity.address).then(balance => {
//     if (balance == 0) {
//         throw new Error("No Balance in network. Use the faucet service for free DAT");
//     }
//     console.log("Balance:  "+ balance)

// })


//sample data to store
var data = {
    "Position": {
        "Longitude": 9.93368,
        "Latitude": 53.55608
    }
}





//set password for keystore during session, otherwise you have to pass it everytime


datum.identity.storePassword("smartcityhk");
var deposit;

// //Deposit money
// await datum.deposit("1").then( response => {
//     console.log("Deposit: " + JSON.stringify(response))
//   })



var hashID
//set data
await datum.set(data).then(hash => {
    console.log(hash);
    hashID = hash
}).catch(error => {
    console.log(error);
})



//retrieve data with given ide
await datum.get(hashID)
.then(result => {
    //returns the original data
    console.log("Data inside of BC: " + result);
})
.catch(error => {
    console.log(error);
});







}