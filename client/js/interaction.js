const ws = new WebSocket('ws://localhost:8080');
        const usernameInput = document.getElementById('username');
        const messagesDiv = document.getElementById('messages');
        const messageInput = document.getElementById('messageInput');
        const sendButton = document.getElementById('sendButton');

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            const newMessage = document.createElement('div');
            newMessage.textContent = `[${message.timestamp}] ${message.username}: ${message.content}`;
            messagesDiv.appendChild(newMessage);
        };

        sendButton.addEventListener('click', () => {
            const chatMessage = {
                username: usernameInput.value || 'Anonymous',
                content: messageInput.value,
                timestamp: new Date().toISOString()
            };
            ws.send(JSON.stringify(chatMessage));
            messageInput.value = '';
        });