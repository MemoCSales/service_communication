import WebSocket from 'ws';

const ws = new WebSocket('ws://localhost:3001/ws');

ws.on('open', () => {
  console.log('Connected to WebSocker server');

  // Send joinQueue message
  ws.send(
    JSON.stringify({
      type: 'joinQueue',
      userId: 'test@example.com',
    })
  );
});

ws.on('message', (data) => {
  const message = JSON.parse(data);
  console.log('Received:', message);

  if (message.type === 'queueJoined') {
    console.log('Successfully joined queue!');
    ws.close();
  }
});

ws.on('error', console.error);
