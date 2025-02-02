document.getElementById('send-button').addEventListener('click', async () => {
  const message = document.getElementById('user-message').value;

  if (!message) {
    alert('Please enter a message!');
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    document.getElementById('chat').innerHTML += `<p><strong>You:</strong> ${message}</p>`;
    document.getElementById('chat').innerHTML += `<p><strong>AI:</strong> ${data.reply}</p>`;
  } catch (error) {
    console.error('Error:', error);
  }
});
