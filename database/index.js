
const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const _ = require('lodash');
const rp = require('request-promise');
const $ = require('cheerio');

const Nightmare = require('nightmare');
const Promise = require('q').Promise;

const nightmare = Nightmare();



const app = express();
app.use(bodyParser.json({type:'application/json'}));
app.use(bodyParser.urlencoded({extended:true}));



// go to localhost 3003 --> if it doesnt work --> change to any number

var server = app.listen(3003, function(){
    var host = server.address().address
    var port = server.address().port
    console.log("start");
  
  });

// fetch Bridge website
const url_bridge = 'https://www.ezbordercrossing.com/list-of-border-crossings/michigan/ambassador-bridge/current-traffic/';
const url_tunnel ='https://dwtunnel.com/';


// fecth bridge data
var Bdata;
var Tdata;

var DATA_READY;
function fetchTunnel(){
   // Promise.resolve(
        nightmare
        .goto(url_tunnel)
        .cookies.clear()
        .wait(2000)
        .evaluate(function(){
            return Array.from(document.querySelectorAll('td')).map(element => element.innerText);
        })
        .then(data=>{
            Bdata=data;
            Tunnel_ready=tunnelJsonFormat(Bdata);
            //console.log(Bdata);
            fetchBridge();
        })
    //)
}
function fetchBridge(){
    Promise.resolve(
        nightmare
        .goto(url_bridge)
        .cookies.clear()
        .wait(1000)
        .evaluate(function(){
            return Array.from(document.querySelectorAll('td')).map(element => element.innerText);
        })
        .then(data=>{
            Tdata=data;
            //console.log(Tdata)
           
            //console.log(Tdata);
          
            Bridge_ready = bridgeFormat(Tdata);
            DATA_READY=combinedData(Bridge_ready,Tunnel_ready);
            //console.log('hello');
            console.log(DATA_READY);
            
            nightmare.proc.disconnect();
            nightmare.proc.kill();
            nightmare.ended=true;

           // DATA_READY=combinedData(Bridge_ready,Tunnel_ready);
            
        })
    )
}
fetchTunnel();



app.get('/data', function(req,res){

    res.send(Bridge_ready);
})
app.get('/ready', function(req,res){

    res.send(DATA_READY);
})
/*


var Bridge_ready=[ { lane: 'Personal Vehicles',
details:
 { time: 'At 2:00 pm EDT', delay: '20', open_lane: '11 lanes' },
enterCanada: 'No delay' },
{ lane: 'NEXUS',
details: { time: 'At 2:00 pm EDT', delay: '20', open_lane: '1 lane' },
enterCanada: '' },
{ lane: 'Commercial Vehicles',
details:
 { time: 'At 2:00 pm EDT', delay: '10', open_lane: '5 lanes' },
enterCanada: 'No delay' } ];
var Tunnel_ready=[ { direction: 'CAUS',
time: '15',
car: '7 lanes',
truck: '1 lane',
NEXUS: '1 lane' },
{ direction: 'USCA',
time: '15',
car: '5 lanes',
truck: '1 lane',
NEXUS: '2 lanes' } ];


/*  

At Midnight EDT
no delay
2 lane(s) open


/******Combined Data *********/

 function combinedData(B,T)
{   var arr=[]
    var final_res ={};
    /*
        B_CAR_US_CA: '',
        B_CAR_CA_US: '',
        // tunnel car
        T_CAR_US_CA: '',
        T_CAR_CA_US: '',
        // bridge COMERC
        B_COM_US_CA: '',
        B_COM_CA_US: '',
        // tunnel COMERC
        T_COM_US_CA: '',
        T_COM_CA_US: '',
        // bridge NEXUS
        B_NEXUS_US_CA: '',
        B_NEXUS_CA_US: '',
        // tunel NEXUS
        T_NEXUS_US_CA: '',
        T_NEXUS_CA_US: '',

        */

        // bridge part
        final_res.B_time = B[0].details.time;
        final_res.B_CAR_CA_US= B[0].details.delay+' mn/'+B[0].details.open_lane;

        final_res.B_CAR_US_CA= B[0].enterCanada;

        final_res.B_COM_CA_US= B[2].details.delay+' mn/'+B[2].details.open_lane;

        final_res.B_COM_US_CA= (B[2].enterCanada=='')?"N/A":B[2].enterCanada;

        final_res.B_NEXUS_US_CA= (B[1].enterCanada=='')?"N/A":B[2].enterCanada;

        final_res.B_NEXUS_CA_US= B[1].details.delay+' mn/'+B[1].details.open_lane;

        // tunnel part

        final_res.T_CAR_US_CA = T[1].time+' mn/'+T[1].car;
        final_res.T_CAR_CA_US = T[0].time+' mn/'+T[0].car;

        final_res.T_COM_US_CA = T[1].time+' mn/'+T[1].truck;
        final_res.T_COM_CA_US = T[0].time+' mn/'+T[0].truck;

        final_res.T_NEXUS_US_CA = T[1].time+' mn/'+T[1].NEXUS;
        final_res.T_NEXUS_CA_US = T[0].time+' mn/'+T[0].NEXUS;


        final_res.tunnel_CAUS = T[0].time;
        final_res.bridge_CAUS_CAR = B[0].details.delay;
        final_res.bridge_CAUS_COM = B[2].details.delay;
        final_res.bridge_CAUS_NEXUS = B[1].details.delay;
        
        
        final_res.bridge_USCA_COM = B[2].enterCanada;
        final_res.bridge_USCA_CAR = B[0].enterCanada;
        final_res.bridge_USCA_NEXUS = B[1].enterCanada;
        final_res.tunnel_USCA = T[1].time;

        final_res.CarCAUS = whoIsFaster(T[0].time,B[0].details.delay);
        final_res.CarUSCA = whoIsFaster(T[1].time,B[0].enterCanada);

        final_res.COMCAUS = whoIsFaster(T[0].time,B[2].details.delay);
        final_res.COMUSCA = whoIsFaster(T[1].time,B[2].enterCanada);

        final_res.NexusCAUS = whoIsFaster(T[0].time,B[1].details.delay);

        
        
        
        //console.log(final_res);
        arr.push(final_res);


        return arr;

}

function whoIsFaster(tunnel,bridge){

    if(tunnel=="No delay" && bridge=="No delay")
    {
        return 'No wait time for Tunnel and Bridge';
    }else if (tunnel=="No delay" && bridge!="No delay" || bridge=="Closed")
    {
        return 'Tunnel is Faster';
    }
    else if (tunnel!="No delay" && bridge=="No delay" || tunnel=="Closed")
    {
        return 'Bridge is Faster';
    }else
    {
        var t = _.toInteger(tunnel);
        var b = _.toInteger(bridge);
        var ab = Math.abs(t-b);
        if(t<b)
        {
            return 'Tunnel is '+ab+' mn Faster than Bridge';
        }
        else if (t>b)
        {
            return 'Bridge is '+ab+' mn Faster than Tunnel';
        }
        else{
            return 'Same Wait Time'+ t +' mn';
        }
    }
}





/**************** Additional Functions ***************/

// function getJson ---> take the array of the data from the web , convert to json object
function bridgeFormat(data)
{;
    // global array 
    var Gates = [];
    // initial temp var

    for ( var i =0 ; i< 15 ; i++)
    {   
        var temp =data[i];
        //console.log(data.length);
        if(temp!="FAST"&& temp!="Ready Lane")
        {
            if((i%3==0)){
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
                var eCanada= data[i];
    
                //console.log(eCanada+'enter canada');
                // add into object
                    gate.enterCanada=eCanada;
                // push to array to start a new object
                Gates.push(gate);
            }
        }
        else
        {  
            i+=2;
        }
    }
           
    
   //console.log('this is gates'+Gates);
    
    return Gates;

}





/*
 
console.log('helllllllloooo');

var temp = detailsString('At 3:00 am EDT\nno delay\n2 lane(s) open');
console.log(temp);
console.log('helllllllloooo');
*/

function detailsString(details){

    
    // change string to lower case
    var temp = details.split('\n');
   //console.log(temp+'split array of delailts => 3 arrays');
    //console.log(temp[0]);
    //console.log(temp[1]);
    //console.log(temp[2]);
    // replace 
    //console.log(details+' ORIGIN STRING');
    //console.log(temp+' arr cut');

    
    // check if lane is close then return no data is added
    if( details.includes('Lanes Closed')){
        //console.log(temp +'\tlane closed');
         return {
    
                
                "time" : temp[0],
                "delay": "Closed",
                "open_lane" : 'Closed'
            
        };

    }
    else
    {

        var delay =(temp[1].match(/no delay/g))? true:false;
        var lane = temp[2].match(/[0-9]+/g);
       lane = laneCheck(lane)
        //console.log('before'+temp[2]+'after match'+lane)
        // delay
        if(!delay){
            var time = temp[1].replace(/[a-zA-Z\s]/g,'');
          //  console.log(time+'delay time mn');
            //console.log(time[1]);
            
            return {
                    "time" : temp[0],
                    "delay": time,
                    "open_lane" : lane,

            };

        

        }else // no deplay
        {
           return {
            
            
                    "time" : temp[0],
                    "delay": "No delay",
                    "open_lane" : lane,
            
            };  
           

        }


    }

}


// function turn content to Json format done
function tunnelJsonFormat(data){

    _.pull(data,'\n','');
    // initial 2 empty arrays
    var CAUS  =[];
    var USCA     =[];
    var mid = data.length/2;
 
     // store each element into the new array
     for ( var i = 0 ; i < mid;i++)
     {
         var temp1 = data[i];
         var temp2 = data[mid+i]
         CAUS[i]=temp1;
         USCA[i]=temp2;
 
     }
 
     
     // our temp Json array
       var dataJson = [];
     // our Json objets
       var ca ={};
       var us = {};
 
     
       
     // remove < or > store all value in Object
       var time1 = removeLG(CAUS[0]);
       ca.direction ="CAUS";
       ca.time = time1;
       ca.car = laneCheck(CAUS[1]);
       ca.truck = laneCheck(CAUS[2]);
       ca.NEXUS = laneCheck(CAUS[3]);
     
     // repeat process for US to CA
 
       var time2 = removeLG(USCA[0]);
       us.direction = "USCA";
       us.time =time2;
       us.car = laneCheck(USCA[1]);
       us.truck = laneCheck(USCA[2]);
       us.NEXUS = laneCheck(USCA[3]);
     
     // push them into array
     dataJson.push(ca);
     dataJson.push(us);
   
    

    return dataJson;
 
 }
 // remove < or > depend on sign
 function removeLG(line){
         return line.replace(/[<>A-Z\s]/g,'');
 }

// check if lane is closed , 0 ,1 or +

function laneCheck(lane){
    if(lane=='0')
    {
        return 'Closed';
    }
    else if ( lane=='1')
    {
        return '1 lane';
    }
    return lane+' lanes';
}