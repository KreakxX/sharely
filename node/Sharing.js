
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
        leave_session(ws,message);
        break;
      case 'send_message':
        sendMessage(ws,message);
        break;
      case 'upload_image':
        upload_image(ws,message);
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

function leave_session(ws,data){
  const sessionCode = data.sessionCode;

  // if no Session with the Code than stop
  if(!sessionCode || !sessions[sessionCode]){
    return;
  }

 // remove the client from the session
 sessions[sessionCode].clients = sessions[sessionCode].clients.filter((client) => client.username !== ws.username)
}

function sendMessage(ws,data){
  const sessionCode = data.sessionCode;

  // if no Session with the Code than stop
  if(!sessionCode || !sessions[sessionCode]){
    return;
  }

  // Create Chat Message Object
  const chatMessage = {
    type: 'chat_message',
    username: ws.username,
    message: data.message,
    timeStamp: new Date().toISOString()
  };

  // append to the old Messages
  sessions[sessionCode].messages.push(chatMessage)

  // send the new Message to all the Clients
  broadCastToSession(sessionCode,chatMessage,ws);

}


function upload_image(ws,data){
  const sessionCode = data.sessionCode;

  // if no Session with the Code than stop
  if(!sessionCode || !sessions[sessionCode]){
    return;
  }

  // Create Chat Message Object
  const chatMessage = {
    type: 'chat_message',
    username: ws.username,
    message: data.message,
    image: data.image,
    timeStamp: new Date().toISOString()
  };

  // append to the old Messages
  sessions[sessionCode].messages.push(chatMessage)

  // send the new Message to all the Clients
  broadCastToSession(sessionCode,chatMessage,ws);
}


function broadCastToSession(sessionCode, message, excludeClient = null) {
  if (!sessions[sessionCode]) return;

  sessions[sessionCode].clients.forEach(client => {
    if (client !== excludeClient && client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
}

