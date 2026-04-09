const http = require('http');

const sessionId = "test-session-456";

const initData = JSON.stringify({
  jsonrpc: "2.0",
  method: "initialize",
  params: {
    protocolVersion: "2024-11-05",
    capabilities: {},
    clientInfo: { name: "test", version: "1.0.0" }
  },
  id: 1
});

const toolsData = JSON.stringify({
  jsonrpc: "2.0",
  method: "tools/list",
  id: 2
});

async function testMcp() {
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/mcp',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'mcp-session-id': sessionId,
      'Accept': 'application/json, text/event-stream'
    }
  };

  const req1 = http.request({ ...options, path: '/mcp?sessionId=' + sessionId }, (res) => {
    let body = '';
    res.on('data', (chunk) => body += chunk);
    res.on('end', () => {
      console.log('=== Initialize ===');
      console.log('Status:', res.statusCode);
      console.log('Response:', body.substring(0, 500));
      
      setTimeout(() => {
        const req2 = http.request({ ...options, path: '/mcp?sessionId=' + sessionId }, (res2) => {
          let body2 = '';
          res2.on('data', (chunk) => body2 += chunk);
          res2.on('end', () => {
            console.log('\n=== Tools List ===');
            console.log('Status:', res2.statusCode);
            console.log('Response:', body2);
          });
        });
        req2.on('error', console.error);
        req2.write(toolsData);
        req2.end();
      }, 500);
    });
  });
  
  req1.on('error', console.error);
  req1.write(initData);
  req1.end();
}

testMcp();