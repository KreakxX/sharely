
let SessionCodes = []


export function GenerateSessionCode(){
  let not_generated = true;
  while(not_generated){
    const sessionCode =  Math.random().toString(36).substr(2,8)
    if(!SessionCodes.includes(sessionCode)){
      SessionCodes.push(sessionCode);
      not_generated = false;
      return sessionCode;
    }
  }
}



import WebSocket, { WebSocketServer } from 'ws';
const wss = new WebSocketServer({ port: 8080 });

const sessions = {}

// when a client (ws) joins the websocketServer
wss.on("connection",(ws)=>{
  // a Message handler listening for differnet messages to handle what function to use 
  ws.on("message",(data)=>{
    const message = JSON.parse(data.toString());
    switch (message.type){
      case 'create_session':
        create_session(ws,message);
        break;
      case 'join_session':
        join_session(ws,message);
        break;
      case 'leave_session':
        break;
      case 'send_message':
        break;
      case 'delete_message':
        break;
      case 'upload_image':
        break;
    }
  })
})

function create_session(ws, data){

  // General Session Information
  const sessionCode = data.session_code;
  const username = data.username

  // create new Session
  sessions[sessionCode] = {
    code: sessionCode,
    clients: [ws],
    messages: [],
  }
  
  // and update Client Settings
  ws.sessionCode = sessionCode;
  ws.username = username;
}

function join_session(ws,data){
  const sessionCode = data.sessionCode;

  // if no Session with the Code than stop
  if(!sessionCode || !sessions[sessionCode]){
    return;
  }
  // update Client and Session 
  ws.username = data.username;
  ws.sessionCode = data.sessionCode;
  sessions[sessionCode].clients.push(ws);

  // give the old Messages to the new client
  ws.send(JSON.stringify({
    type: 'session_joined',
    messages: sessions[sessionCode].messages
  }))
}

