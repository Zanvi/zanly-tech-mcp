const http = require('http');

const sessionId = "test-session-123";
const postData = JSON.stringify({
  jsonrpc: "2.0",
  method: "initialize",
  params: {
    protocolVersion: "2024-11-05",
    capabilities: {},
    clientInfo: { name: "test", version: "1.0.0" }
  },
  id: 1
});

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/mcp',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData),
    'mcp-session-id': sessionId,
    'Accept': 'application/json, text/event-stream'
  }
};

const req = http.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Session ID:', res.headers['mcp-session-id'] || 'none');
    console.log('Response:', body);
  });
});

req.on('error', console.error);
req.write(postData);
req.end();