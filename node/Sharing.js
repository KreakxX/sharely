import WebSocket, { WebSocketServer } from 'ws';

const websocketServer = new WebSocketServer({port: 8000})

const StreamingSessions = {}
const SessionCodes = {}

// function for generating the SessionCode, so people can share and join Sessions
export function GenerateSessionCode(){
  const not_generated = true;
  while(not_generated){
    const sessionCode =  Math.random().toString(36).substr(2,8)
    if(!SessionCodes.contains(sessionCode)){
      SessionCodes.append(sessionCode);
      not_generated = false;
    }
  }
}

