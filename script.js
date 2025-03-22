async function sendMessage() {
    const input = document.getElementById('user-input');
    const chatBox = document.getElementById('chat-box');
    const message = input.value.trim();

    if (message) {
        chatBox.innerHTML += `<div class="message user-message"><strong>You:</strong> ${message}</div>`;
        try {
            const response = await fetch('http://[2405:201:c055:3878:9228:9eb8:e2eb:cad4]:5000/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: message })
            });
            const data = await response.json();
            chatBox.innerHTML += `<div class="message ai-message"><strong>SyedKhush.AI:</strong> ${data.response}</div>`;
        } catch (error) {
            chatBox.innerHTML += `<div class="message ai-message"><strong>SyedKhush.AI:</strong> Error: ${error.message}</div>`;
        }
        chatBox.scrollTop = chatBox.scrollHeight;
        input.value = '';
    }
}

document.getElementById('user-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') sendMessage();
});
