// server.js
const express = require('express');
const http = require('http');
const { Server } = require("socket.io"); // Import the Server class from socket.io

const app = express();
const server = http.createServer(app); // Create an HTTP server using Express
const io = new Server(server); // Initialize Socket.IO, passing it the HTTP server

const PORT = process.env.PORT || 3001; // Changed port to 3001

// Keep track of connected users (socket.id -> username)
const users = {};

// --- ASYNC/PROMISE Demonstration ---
/**
 * Simulates fetching a welcome message asynchronously.
 * Returns a Promise that resolves with the message after a delay.
 * DEMONSTRATES: Returning a Promise, using setTimeout for async simulation.
 */
function fetchWelcomeMessage() {
    console.log('⏳ Simulating fetching welcome message...');
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const welcomeMsg = "Welcome to the Simple WebSocket Chat!";
            console.log('✅ Welcome message fetched.');
            resolve(welcomeMsg);
        }, 1500);
    });
}

// Serve the index.html file when someone visits the root URL
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// --- Socket.IO Logic ---
io.on('connection', async (socket) => {
  console.log('✅ A user connected:', socket.id);

  socket.on('set username', async (username) => {
    users[socket.id] = username;
    console.log(`👤 User ${socket.id} set username to: ${username}`);

    socket.broadcast.emit('system message', `${username} has joined the chat!`);

    try {
        const welcomeMessage = await fetchWelcomeMessage();
        socket.emit('system message', welcomeMessage);
    } catch (error) {
        console.error("Error fetching welcome message:", error);
        socket.emit('system message', "Sorry, couldn't fetch the welcome message.");
    }
  });

  socket.on('disconnect', () => {
    const username = users[socket.id];
    if (username) {
      console.log(`❌ User ${username} (${socket.id}) disconnected`);
      socket.broadcast.emit('system message', `${username} has left the chat.`);
      delete users[socket.id];
    } else {
        console.log(`❌ User ${socket.id} (no username set) disconnected`);
    }
  });

  socket.on('chat message', (msg) => {
    const username = users[socket.id];
    if (username) {
      console.log(`💬 Message from ${username} (${socket.id}): ${msg}`);
      io.emit('chat message', { user: username, msg: msg });
    } else {
      console.log(`💬 Message from anonymous user (${socket.id}): ${msg}`);
      socket.emit('system message', "Please set a username before sending messages.");
    }
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
