const express = require('express')
const app = express()


const expressWS=require('express-ws')(app);

const PORT = process.env.PORT || 7777;


app.ws('/chat',function(ws,req){
    ws.on('message',function(msg){
        broadcast(msg)
    })
})

function broadcast(data){
    expressWS.getWss().clients.forEach((client)=>{
        if(client.readyState===1){
            client.send(data)
        }
    })
}