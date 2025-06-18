(function() {
  const openBtn = document.getElementById('chat-open');
  const popup = document.getElementById('chat-popup');
  const form = document.getElementById('chat-form');
  const input = document.getElementById('chat-input');
  const messages = document.getElementById('chat-messages');

  openBtn.addEventListener('click', () => {
    popup.classList.toggle('hidden');
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const question = input.value.trim();
    if (!question) return;
    addMessage('Vous', question);
    input.value = '';
    try {
      const r = await fetch('/chat', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({message: question})
      });
      if (!r.ok) throw new Error('HTTP ' + r.status);
      const data = await r.json();
      addMessage('Bot', data.answer);
    } catch(err) {
      addMessage('Bot', 'Erreur lors de la réponse.');
    }
  });

  function addMessage(sender, text) {
    const div = document.createElement('div');
    div.textContent = sender + ': ' + text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }
})();
