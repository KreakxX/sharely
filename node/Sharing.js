// import WebSocket, { WebSocketServer } from 'ws';
// const websocketServer = new WebSocketServer({port: 8000})

let StreamingSessions = {}
let SessionCodes = []

// function for generating the SessionCode, so people can share and join Sessions
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

