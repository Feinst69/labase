(function() {
  const openBtn = document.getElementById('chat-open');
  const popup = document.getElementById('chat-popup');
  const form = document.getElementById('chat-form');
  const input = document.getElementById('chat-input');
  const messages = document.getElementById('chat-messages');

  openBtn.addEventListener('click', () => {
    popup.classList.toggle('hidden');
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const question = input.value.trim();
    if (!question) return;
    addMessage('Vous', question);
    const answer = findAnswer(question);
    addMessage('Bot', answer);
    input.value = '';
  });

  function addMessage(sender, text) {
    const div = document.createElement('div');
    div.textContent = sender + ': ' + text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function findAnswer(question) {
    const text = document.body.innerText;
    const sentences = text.split(/(?<=[.!?])\s+/);
    const words = question.toLowerCase().split(/\s+/).filter(w => w.length > 3);
    let bestSentence = '';
    let bestScore = 0;
    sentences.forEach(sentence => {
      const sLower = sentence.toLowerCase();
      let score = 0;
      words.forEach(word => {
        if (sLower.includes(word)) score++;
      });
      if (score > bestScore) {
        bestScore = score;
        bestSentence = sentence;
      }
    });
    if (bestScore === 0) {
      return "Je ne sais pas. Pouvez-vous reformuler ?";
    }
    return bestSentence;
  }
})();
