// The backend URL where your server is running
const apiUrl = "http://localhost:3000/chat";

// Function to append messages to the chat window
function appendMessage(content, sender) {
  const messageList = document.getElementById('messages');
  const li = document.createElement('li');
  li.textContent = content;
  li.classList.add(sender);
  messageList.appendChild(li);
}

// Function to send a message to the backend API
async function sendMessage() {
  const messageInput = document.getElementById('message-input');
  const userMessage = messageInput.value;

  if (!userMessage) return;  // Don't send empty messages

  // Display the user's message in the chat
  appendMessage(userMessage, 'user');

  // Clear the input field
  messageInput.value = '';

  try {
    // Send the message to the backend API
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: userMessage })
    });

    const data = await response.json();
    
    // Display the AI's reply in the chat
    appendMessage(data.reply, 'ai');
  } catch (error) {
    console.error('Error:', error);
    appendMessage("Sorry, there was an error. Please try again.", 'ai');
  }
}
