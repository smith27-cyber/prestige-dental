// Chat.js

// Select DOM elements
const chatInput = document.getElementById('chat-input');
const sendButton = document.getElementById('send-button');
const messagesContainer = document.getElementById('messages');

// Connect to the WebSocket server
const socket = new WebSocket('ws://localhost:5000');

// Event listener for the send button
sendButton.addEventListener('click', () => {
  const messageText = chatInput.value.trim();
  if (messageText) {
    sendMessage(messageText); // Send the message
    socket.send(messageText); // Also send it to the WebSocket server
    chatInput.value = ''; // Clear the input
  }
});

// Function to send a message
function sendMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', 'sent'); // Class for sent messages
  messageElement.textContent = message;

  // Append the message to the messages container
  messagesContainer.appendChild(messageElement);
  messagesContainer.scrollTop = messagesContainer.scrollHeight; // Scroll to bottom
}

// Function to receive a message
function receiveMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', 'received'); // Class for received messages
  messageElement.textContent = message;

  // Append the received message to the messages container
  messagesContainer.appendChild(messageElement);
  messagesContainer.scrollTop = messagesContainer.scrollHeight; // Scroll to bottom
  socket.send(message);
}

// Listen for incoming messages from the WebSocket server
socket.onmessage = function (event) {
  const message = event.data;
  receiveMessage(message); // Handle received messages
};

// Function to display received messages
function receiveMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.textContent = message;

    // Append the received message to the messages container
    messagesContainer.appendChild(messageElement);
}

// Optional: Function to simulate receiving a message
function simulateReceivedMessage(message) {
    setTimeout(() => {
        receiveMessage(message);
    }, 3000);
}

// Example of simulating a received message (for testing)
simulateReceivedMessage('Hello! How can I assist you today?');
// Example of simulating a received message every 5 seconds (for testing)
