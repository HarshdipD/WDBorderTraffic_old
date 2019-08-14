
const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json({type:'application/json'}));
app.use(bodyParser.urlencoded({extended:true}));
const rp = require('request-promise');
const $ = require('cheerio');


// go to localhost 8000 --> if it doesnt work --> change to any number

var server = app.listen(3001, function(){
    var host = server.address().address
    var port = server.address().port
    console.log("start");
  
  });

/*

Webscraping start here 

*/

const url = 'https://www.ezbordercrossing.com/list-of-border-crossings/michigan/ambassador-bridge/current-traffic/';

rp(url)
    .then(function(html){
        const info = [];
        
        $('td', html).each(function(){
            info.push(($(this).text()));
        });

        // print out the array
        console.log(info);
        jsonData= getJson(info);
       
    })
    .catch(function(err){
        console.log('uh-oh');
    });




// intialize jsonfile variable
var jsonData;
// send it to localhost:8000/user 
app.get('/user', function(req,res){

    res.send(jsonData);
})





// function getJson ---> take the array of the data from the web , convert to json object
function getJson(data){

    // global array 
    var Gates = [];
    // initial temp var

    for ( var i =0 ; i< data.length ; i++)
    {
        console.log('INDEX: '+i+" Start***"+data[i]+' ***END\n');
        if(i%3==0){
            // get lane name
            var gate={
                "lane": "",
                "details": "",

            };
            gate.lane= data[i];
        }
        else if(i>0 && (i-1)%3==0){

            // get details to more details by calling the the function 
            var details =  detailsString(data[i]);
            gate.details = details;
        }else if(i>0 && (i+1)%3==0)
        {
           
            // get enter canada status
            var eCanada= data[i].replace(/[\n\r]/g,'');
            //console.log(eCanada+'enter canada');
           // add into object

            gate.enterCanada=eCanada;
            // push to array to start a new object
            Gates.push(gate);
        }
       
       
    }
    
   // console.log(Gates);
    
    return Gates;

}

function detailsString(details){
    // change string to lower case
    var temp = details.toLowerCase();
    // replace \n 
    temp = temp.replace(/[\n\r]/g,'');
    temp = temp.replace(/edt/g,' ');

    
    // check if lane is close then return no data is added
    if( temp.includes('lanes closed')){
        //console.log(temp +'\tlane closed');
        return {
    
                "Status" : "Closed",
                "time" : "",
                "delay": "",
                "open_lane" : ''
            
        };
    }
    else
    {
        // get all digit in the string
        var number = temp.match(/[0-9]+/g);
        // find time format am or pm
        var time_format = (temp.match('am'))? "am":"pm";
        // check if there is delay 
        var delay =(temp.match(/no delay/g))? true:false;

        // delay
        if(!delay){

            return  {
               
                    "status" : "Open",
                    "time" : number[0]+':'+number[1]+time_format,
                    "delay": number[2]+'mn',
                    "open_lane" : number[3],

            };

        }else // no deplay
        {
            return {
            
                    "status" : "Open",
                    "time" : number[0]+':'+number[1]+time_format,
                    "delay": "No Delay",
                    "open_lane" : number[2],
            
            };  
    

        }/*
        console.log(delay);
        console.log(time_format);
        console.log(number);*/


    }
}

/*

The model that we try to get
function makeJson(data){
    return [
        {
            "lane" : "Personal Vehicles",
            "details" : {
                "open" : "Open",
                "time" : "9:00 pm",
                "delay": "true",
                "open_lane" : 3
            },
            "Enter-Canada": "15mn"
        },
        {
            "lane" : "NEXUS",
            "details" : {
                "open" : "Closed",
                "time" : "",
                "delay": "",
                "open_lane" : ""
            },
            "Enter-Canda": "15mn"
        },
        {
            "lane" : "Personal Vehicles",
            "details" : {
                "open" : true,
                "time" : "9:00 pm",
                "delay": true,
                "open_lane" : 3
            },
            "Enter-Canda": "15mn"
        },
        {
            "lane" : "Personal Vehicles",
            "details" : {
                "open" : true,
                "time" : "9:00 pm",
                "delay": true,
                "open_lane" : 3
            },
            "Enter-Canda": "15mn"
        },
        {
            "lane" : "Personal Vehicles",
            "details" : {
                "open" : true,
                "time" : "9:00 pm",
                "delay": true,
                "open_lane" : 3
            },
            "Enter-Canda": "15mn"
        }

    ]
}*/