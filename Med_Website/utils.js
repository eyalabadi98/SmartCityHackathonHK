

var seed = "perfect head ghost wagon term book sock surge zebra door adapt picture"
//create new datum instance
var datum
function start(){
    console.log("Start")
    loadAll();
}


async function loadAll(){
    console.log("Loaded")
    datum = new Datum();
    var identity =new Datum().Identity();
    await identity.recover(seed,"smartcityhk", 6)
    await datum.initialize({identity:JSON.stringify(identity.keystore)});
    await datum.identity.storePassword("smartcityhk");
    var deposit;
}

async function depositMoney(datum){
    datum = new Datum();
    var identity =new Datum().Identity();
    await identity.recover(seed,"smartcityhk", 6)
    await datum.initialize({identity:JSON.stringify(identity.keystore)});
    await datum.identity.storePassword("smartcityhk");
    datum.deposit("1").then( response => {
            console.log("Deposit: " + JSON.stringify(response))
          })
}

async function getBalance() {
    Datum.getBalance(datum.identity.address).then(balance => {
        if (balance == 0) {
            throw new Error("No Balance in network. Use the faucet service for free DAT");
        }
        console.log("Balance:  "+ balance)
        alert("Balance "+ balance)
    
    })
}

async function setDataScanning(){
    var hashID
    console.log("Input-code: "+ document.getElementById("input-code").value)
    var ItemScanner = await getItem(document.getElementById("input-code").value)
    console.log("Item Scanner is " + ItemScanner);
    console.log("Item Before is " + JSON.stringify(ItemScanner));
    ItemScanner = JSON.parse(ItemScanner);
    
    console.log("Item Scanner After is " + JSON.stringify(ItemScanner));
    var data = {
        "Country": document.getElementById("input-manufactored").value,
        "Date": document.getElementById("input-date").value,
        "GeoLocation": document.getElementById("input-location").value,
        "Time": document.getElementById("input-time".value),
        "Compamy": document.getElementById("input-company").value,
    }
    data = "Country: " +  document.getElementById("input-manufactored").value + "," + "Date: " + document.getElementById("input-date").value + " " + "GeoLocation: " + document.getElementById("input-location").value + " " + 
    console.log("Data is"+ JSON.stringify(ItemScanner))
    
    ItemScanner[0][Math.random()] = (data)
    setTimeout(async function(){
        console.log("Setting: " + ItemScanner)
        let hash = await datum.set(JSON.stringify(ItemScanner),document.getElementById("input-code").value);

        console.log("Hash is " + hash);
        hashID = hash
        let update =await getItem(document.getElementById("input-code").value);
        console.log("New Updated data is " +update )    
    },2000);
    addTable(ItemScanner);

}

async function setDataManufacturing(data){
    var hashID
    var data = []
    data.push({
        "Name": document.getElementById("drug-name").value,
        "Company": document.getElementById("input-company").value,
        "DateOfManufacturing": document.getElementById("input-manufactored").value,
        "Time": document.getElementById("input-time").value,
        "Country": document.getElementById("input-country").value,
        "Date": document.getElementById("input-date").value,
    });

    // set data
    console.log("Datum "+ datum)
    await datum.set(JSON.stringify(data),document.getElementById("input-code").value).then(hash => {
        console.log(hash);
        alert("Hash: " + hash)
        hashID = hash
        return hash;
    }).catch(error => {
        console.log(error);
    })
}

async function getItem(hash) {
    console.log("Hash coming in is " + hash)
    let results = await datum.getWithKey(hash)
    console.log("Return GetItem")
    return results;
}

async function getAllItems(item) {
    var itemHash = "0x9bac51aed325dc7bcbbac70bf070be6d02c0ba916ba031b91863db42545c3385"
    datum.getWithKey("Medicines")
    .then(result => {
        //returns the original data
        console.log("Data inside of BC: " + JSON.stringify(result));
    })
    .catch(error => {
        console.log(error);
    });

}

//Blockchain Ledger

function addTable(medicine) {

    var html = '<table style="border: 1px solid #000;">';
    html += '<tr style="border: 1px solid black;">';
    console.log("Medicine : "+ JSON.stringify(medicine))
    for( var j in medicine[0] ) {
        console.log("J is: "+ j)
        html += '<th style="border: 1px solid black">' + j + '</th>';
        }
    html += '</tr>';
    for( var i = 0; i < 1; i++) {
        html += '<tr style="border: 1px solid black"> ';
        console.log("I is: "+ i)
        for( var j in medicine[i] ) {
            console.log("J only: "+j)
            html += '<td style="padding:20px;"> ' + medicine[i][j] + '</td>';
        }
    }
    html += '</table>';
    document.getElementById('myDynamicTable').innerHTML = html;

   
}
