const request = require('request');
const cheerio = require('cheerio');
const express = require('express');
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.json({type:'application/json'}));
app.use(bodyParser.urlencoded({extended: true}));




request('http://codedemos.com/sampleblog',(error,response, html )=>{

if(!error && response.statusCode==200){

    const $ = cheerio.load(html);
    //console.log(html);
}
});

app.get('/users',function(req,res,next){

    res.json([
        {
            "id": "1", "username": 'Eric Lean'
        },
        {
            "id": "2", "username": 'Tom Bradey'
        }
    ]);
});

app.listen(8081, function(){
    console.log('success port');
});


// 29 22 66 57