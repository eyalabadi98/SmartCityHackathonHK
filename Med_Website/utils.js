

var seed = "perfect head ghost wagon term book sock surge zebra door adapt picture"
//create new datum instance
var datum
function start(){
    console.log("Start")
    loadAll();
}


async function loadAll(){
    // --> Used to create an identity
    // Datum.createIdentity("smartcityhackHK").then(identity => {
    //     console.log(identity);
    // })
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
    console.log("Item Scanner is " + JSON.stringify(ItemScanner));
    addTable(ItemScanner);
    console.log("Item Scanner is " + JSON.stringify(ItemScanner));
    ItemScanner = JSON.parse(ItemScanner);
    var data = {
        "Country": document.getElementById("input-manufactored").value,
        "Date": document.getElementById("input-date").value,
        "GeoLocation": document.getElementById("input-location").value,
        "Time": document.getElementById("input-time".value),
        "Compamy": document.getElementById("input-company").value,
    }
    console.log("Data is"+ JSON.stringify(ItemScanner))
    
    ItemScanner.push(data)
    // set data
    console.log("Datum"+ datum.version.api)
    let hash = await datum.set(ItemScanner,document.getElementById("input-code").value);
    console.log("Hash is " + hash);
    hashID = hash
    let update =await getItem(document.getElementById("input-code").value);
    console.log("New Updated data is " +update )
    
    // await datum.set(data,document.getElementById("input-code").value).then(async hash => {
    //     console.log("Hash is " + hash);
    //     hashID = hash
    //     await getItem(document.getElementById("input-code").value).then(update => {
    //         console.log("New Updated data is " +update )
    //     })
        
    //     return hash;
    // }).catch(error => {
    //     console.log(error);
    // })

    


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
    data=[{},{}]
    // set data
    console.log("Datum "+ datum)
    await datum.set(data,document.getElementById("input-code").value).then(hash => {
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
    //medicine = {"Country":"Hong Kong","Date":"2018-09-01","GeoLocation":"-21.34343343343, +35.24345343","Time":"04:34:03","Compamy":"USP Hong Kong #434"}
    medicine =[    {
            "Name": "Ibuprofen",
            "Company": "Tylenol",
            "Country": "USA",
            "Origin Scan" : "Chicago",
            "Company": "Pzifer",
            "Time": "04:30:30",
        },
        {
            "Name": "Acetaminophen",
            "Company": "Aleve",
            "Country": "China",
            "Country": "Hong Kong",
            "Origin Scan" : "Kawloon",
            "Company": "Byer",
            "Time": "04:30:30",
        },
        {
            "Name": "Aspartane",
            "Company": "Pzifer",
            "Date": "04/05/2015",
            "Country": "China",
            "Origin Scan" : "Xio",
            "Company": "loka",
            "Time": "03:32:30",
        },

    ]

    //medicine = {"Position":{"Longitude":9.93368,"Latitude":53.55608}}

    var html = '<table style="border: 1px solid #000;">';
    html += '<tr style="border: 1px solid black;">';
    console.log("Medicine : "+ JSON.stringify(medicine))
    for( var j in medicine ) {
        console.log("J is: "+ j)
        html += '<th style="border: 1px solid black">' + j + '</th>';
        }
    html += '</tr>';
    for( var i = 0; i < medicine.length; i++) {
        html += '<tr style="border: 1px solid black">';
        console.log("I is: "+ i)
        for( var j in medicine[i] ) {
            console.log("J is " + medicine[i][j])
            // if (!medicine[i][j]){html += '<td style="padding:20px;"> ' + "-" + '</td>'; continue}
            html += '<td style="padding:20px;"> ' + medicine[i][j] + '</td>';
        }
    }
    html += '</table>';
    document.getElementById('myDynamicTable').innerHTML = html;
     
    // var myTableDiv = document.getElementById("myDynamicTable");
     
    // var table = document.createElement('TABLE');
    // table.border='1';
   
    // var tableBody = document.createElement('TBODY');
    // table.appendChild(tableBody);
    // console.log("Medicine: "+ JSON.stringify(medicine[0]))
    // items = medicine.map(a => a);
    // console.log("Items are: " + items)
    // for (key in items){
    //     console.log("Key is " + key)
    //     var tr = document.createElement('TR');
    //     tableBody.appendChild(tr);
    //     // for (thing in key){
    //     //     console.log("item is " + item)
    //     //     var td = document.createElement('TD');
    //     //     td.width='75';
    //     //     td.appendChild(document.createTextNode("Cell " + item + "," ));
    //     //     tr.appendChild(td);
    //     // }
    // }
    // myTableDiv.appendChild(table);
    // alert("e")

   
}
