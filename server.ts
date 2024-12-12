import WebSocket, { WebSocketServer } from 'ws';

interface ChatMessage {
    username: string;
    content: string;
    timestamp: string;
}

const PORT = 8080;
const wss = new WebSocketServer({ port: PORT });

console.log(`WebSocket server is running on ws://localhost:${PORT}`);

wss.on('connection', (ws) => {
    console.log('New client connected!');

    ws.on('message', (message) => {
        try {
            const chatMessage: ChatMessage = JSON.parse(message.toString());
            console.log(`[${chatMessage.timestamp}] ${chatMessage.username}: ${chatMessage.content}`);

            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(chatMessage));
                }
            });
        } catch (error) {
            console.error('Error parsing message:', error);
        }
    });

    ws.on('close', () => {
        console.log('Client disconnected!');
    });
});
