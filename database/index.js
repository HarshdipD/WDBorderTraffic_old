
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
        .wait(2000)
        .evaluate(function(){
            return Array.from(document.querySelectorAll('td')).map(element => element.innerText);
        })
        .then(data=>{
            Tdata=data;
            //console.log(Tdata)
           
            console.log(Tdata);
          
            var b = _.toArray(bridgeFormat(Tdata));
            console.log('after format bridge data\n'+b);
            


            nightmare.proc.disconnect();
            nightmare.proc.kill();
            nightmare.ended=true;
            
        })
    )
}
fetchTunnel();


/*  

At Midnight EDT
no delay
2 lane(s) open


/******Combined Data *********/


var fs = function combinedData(B,T)
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
    if(B!=null && T!=null){

        // bridge part
        final_res.B_CAR_CA_US= B[0].details.delay+'/'+B[0].details.open_lane+ ' lane(s)';

        final_res.B_CAR_US_CA= B[0].enterCanada;

        final_res.B_COM_CA_US= B[2].details.delay+'/'+B[2].details.open_lane+ ' lane(s)';

        final_res.B_COM_US_CA= (B[2].enterCanada=='')?"No delay":B[2].enterCanada;

        final_res.B_NEXUS_US_CA= (B[1].enterCanada=='')?"No delay":B[2].enterCanada;

        final_res.B_NEXUS_CA_US= B[1].details.delay+'/'+B[1].details.open_lane+ ' lane(s)';

        // tunnel part

        final_res.T_CAR_US_CA = T[1].time+' mn/'+T[1].car+ ' lane(s)';
        final_res.T_CAR_CA_US = T[0].time+' mn/'+T[0].car+ ' lane(s)';

        final_res.T_COM_US_CA = T[1].time+' mn/'+T[1].truck+' lane(s)';
        final_res.T_COM_CA_US = T[0].time+' mn/'+T[0].truck+' lane(s)';

        final_res.T_NEXUS_US_CA = T[1].time+' mn/'+T[1].NEXUS+' lane(s)';
        final_res.T_NEXUS_CA_US = T[0].time+' mn/'+T[0].NEXUS+' lane(s)';

        final_res.tunnel_CAUS = T[0].time;
        final_res.tunnel_USCA = T[1].time;
        
        arr.push(final_res);
        return arr;

    }
    else{
        // if data is not ready wait 2 sec
        setTimeout(fs(B,T),2000);
    }
    return;
   
}





/**************** Additional Functions ***************/

// function getJson ---> take the array of the data from the web , convert to json object
function bridgeFormat(data)
{;
    // global array 
    var Gates = [];
    // initial temp var

    for ( var i =0 ; i< 15 ; i++)
    {   console.log(i);
        var temp =data[i];
        console.log(temp);
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
                var eCanada= data[i].replace(/[\n\r]/g,'');
                //console.log(eCanada+'enter canada');
            // add into object

                gate.enterCanada=eCanada;
                // push to array to start a new object
                Gates.push(gate);
            }
        }
        else
        {  console.log(i);
            i+=2;
        }
    }
           
    
   console.log('this is gates'+Gates);
    
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
    // replace 
    //console.log(details+' ORIGIN STRING');
    //console.log(temp+' arr cut');

    
    // check if lane is close then return no data is added
    if( details.includes('Lanes Closed')){
        //console.log(temp +'\tlane closed');
         return {
    
                
                "time" : temp[0],
                "delay": "",
                "open_lane" : 'Closed'
            
        };

    }
    else
    {

        var delay =(temp[1].match(/no delay/g))? true:false;
        var lane = temp[2].match(/[0-9]/g);
        lane = laneCheck(lane)
        // delay
        if(!delay){
            var time = temp[1].match(/[0-9]/g);
            
            return {
                    "time" : temp[0],
                    "delay": time+'mn',
                    "open_lane" : lane

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
        console.log(USCA);
        console.log(USCA[0]);
 
 
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