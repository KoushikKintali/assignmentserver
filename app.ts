import express = require('express');
import fs from 'fs'
import bodyparser=require('body-parser')
import { data } from './data';
var cors = require('cors');


const app:express.Application=express();

app.use(cors())
app.use(bodyparser.json())

app.get('/channels',(req,res)=>{
    
    fs.readFile('./json.json',(err,data:any)=>{
        
        if(err){
            res.send('There is Some Error in Reading File')
        }
        else{
            let arr:any=(JSON.parse(data))
            //res.send(JSON.stringify(obj))
            console.log("Array is ",arr)
            //let obj={data:arr}
            //console.log("Obj is ",obj)
           return res.send(JSON.stringify({channels:arr.channels}))
        }
    })
})

app.get('/messages/?:channels',(req,res)=>{
    console.log(req.params.channels)
    fs.readFile('./json.json',(err,data:any)=>{
        if(err){
            res.send('There is Some Error in Reading File')
        }
        else{

            if(req.params.channels==="Channel1"){
                
                let arr:any=(JSON.parse(data))
                console.log("Array is ",arr)
               res.send(JSON.stringify({channels:arr.Channel1}))
            }
            else if(req.params.channels==="Channel2"){
                let arr:any=(JSON.parse(data))
                console.log("Array is ",arr)
               res.send(JSON.stringify({channels:arr.Channel2}))
            }
            else if(req.params.channels==="Channel3"){
                let arr:any=(JSON.parse(data))
                console.log("Array is ",arr)
               res.send(JSON.stringify({channels:arr.Channel3}))
            }

          
        }
    })
       
})

app.post('/?:channels',(req,res)=>{
//let dataObj={}

// let dataObj={
//     "channels":["Channel 1","Channel 2","Channel 3"],
// "Channel1":["Sample1","Sample2"],
// "Channel2":["Sample3"],
// "Channel3":["Sample4"]
// }

let dataObj= JSON.parse(fs.readFileSync('./json.json').toString());
   
          
console.log("Data Obj is",JSON.stringify(dataObj));



    console.log(req.params.channels)
    fs.writeFile('./json.json',req.body,(err)=>{
        if(err) {
            return console.log(err);
        }
        console.log("File saved successfully!");
    })
    
    
    console.log(data.Channel1)

    if(req.params.channels==="Channel1"){
                    console.log(req.body);
                    if(dataObj && dataObj['Channel1']){
                        dataObj.Channel1.push(req.body.data);
                    }
                    
                   
                    //res.send(JSON.stringify({data:data.Channel1}))
                    fs.writeFile('./json.json',JSON.stringify(dataObj),(err)=>{
                        if(err) {
                            return console.log(err);
                        }
                        console.log("File saved successfully!");
                        res.send("File Saved Successfully") 
                    })
                }
                else if(req.params.channels==="Channel2"){
                    if(dataObj && dataObj['Channel2']){
                        dataObj.Channel2.push(req.body.data);
                    }
                    fs.writeFile('./json.json',JSON.stringify(dataObj),(err)=>{
                        if(err) {
                            return console.log(err);
                        }
                        console.log("File saved successfully!");
                        res.send("File Saved Successfully") 
                    })
                }
                else if(req.params.channels==="Channel3"){
                    if(dataObj && dataObj['Channel3']){
                        dataObj.Channel3.push(req.body.data);
                    }
                    fs.writeFile('./json.json',JSON.stringify({dataObj}),(err)=>{
                        if(err) {
                            return console.log(err);
                        }
                        console.log("File saved successfully!");
                        res.send("File Saved Successfully") 
                    })
                }

       
})



app.listen(3000,function(){
    console.log('Server Started at PORT 3000');
});

