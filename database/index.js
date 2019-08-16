
const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const _ = require('lodash');
const nightmare = require('nightmare');

const Nightmare = nightmare();
const app = express();
app.use(bodyParser.json({type:'application/json'}));
app.use(bodyParser.urlencoded({extended:true}));
const rp = require('request-promise');
const $ = require('cheerio');


// go to localhost 3003 --> if it doesnt work --> change to any number

var server = app.listen(3003, function(){
    var host = server.address().address
    var port = server.address().port
    console.log("start");
  
  });

// fetch Bridge website
const url = 'https://www.ezbordercrossing.com/list-of-border-crossings/michigan/ambassador-bridge/current-traffic/';
// intialize jsonfile variable
var BridgeData;
rp(url)
    .then(function(html){
        const info = [];
        
        $('td', html).each(function(){
            info.push(($(this).text()));
        });

        // print out the array
        //console.log(info);
        BridgeData= getJson(info);
       
    })
    .catch(function(err){
        console.log('uh-oh');
    });


// fetch data from Tunnel webpae


// intial an empty array
var TunnelData=[];

// fetch data
Nightmare
  .goto('https://dwtunnel.com/')
  .evaluate(()=>{
    
    // using querySelectorAll to get content in "td"
    return Array.from(document.querySelectorAll('td')).map(element => element.innerText);
    } )
  .then(data=>{
    // remove nextline and empty element in array using _ loadash
    _.pull(data,'\n');
    _.pull(data,'');

    
    // call function to get Json format 
    TunnelData = tunnelJsonFormat(data);
    console.log(TunnelData);
})



app.get('/tunnel',function(req,res){
    res.send(TunnelData);
    
});


// send it to localhost:3003/user 
app.get('/bridge', function(req,res){
    
    function sendTo(){
        setTimeout(
        res.send(fs(BridgeData,TunnelData)),
        2000);
        }
    sendTo();
})


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
function getJson(data){

    // global array 
    var Gates = [];
    // initial temp var

    for ( var i =0 ; i< data.length ; i++)
    {
        var temp =data[i];
        //console.log(temp);
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
        }else{
            i+=2;
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
        var time_format = (temp.includes('am'))? "am":"pm";
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
                    "delay": "No delay",
                    "open_lane" : number[2],
            
            };  
    

        }


    }
}


// function turn content to Json format
function tunnelJsonFormat(data){
    
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
 
     // check is less or greater than time
       var lgCA = ((CAUS[0].includes('<'))?'less':'greater');
       
     // remove < or > store all value in Object
       var time1 = removeLG(lgCA,CAUS[0]);
       ca.direction ="CAUS";
       ca.compare =lgCA;
       ca.time = time1;
       ca.car = CAUS[1];
       ca.truck = CAUS[2];
       ca.NEXUS = CAUS[3];
     
     // repeat process for US to CA
       var lgUS = ((USCA[0].includes('<'))?'less':'greater');
 
       var time2 = removeLG(lgUS,USCA[0]);
       us.direction = "USCA";
       us.compare = lgUS;
       us.time =time2;
       us.car = USCA[1];
       us.truck = USCA[2];
       us.NEXUS = USCA[3];
     
     // push them into array
     dataJson.push(ca);
     dataJson.push(us);
     
     // return result
     return dataJson;
 
 }
 // remove < or > depend on sign
 function removeLG(sign,line){
     if(sign=='less')
     {
         return line.replace(/[<A-Z\s]/g,'');
     }
     return line.replace(/[>A-Z\s]/g,'');
 }
/*
// 





*/