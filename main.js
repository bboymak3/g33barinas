// Chatbot IA para Publicidad Barinas
const chatMessages = document.getElementById('chat-messages');
const chatForm = document.getElementById('chat-input');
const chatToggle = document.getElementById('chat-toggle');
const bot = document.getElementById('chat-bot');

let visible = true;
chatToggle.onclick = () => {
  visible = !visible;
  bot.style.display = visible ? 'flex' : 'none';
  chatToggle.textContent = visible ? '−' : '+';
};

// Mensaje inicial
addMessage('¡Hola! 👋 Soy tu asesor de publicidad. ¿Qué necesitas: pendones, lonas, sellos o DTF?', 'bot');

chatForm.onsubmit = async (e) => {
  e.preventDefault();
  const input = document.getElementById('chat-text');
  const msg = input.value.trim();
  if(!msg) return;

  addMessage(msg, 'user');
  input.value = '';

  const res = await fetch('https://chat.globalpro.pages.dev/chat', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({message: msg})
  }).then(r => r.json()).catch(() => ({reply: 'Error de conexión. Escríbenos al WhatsApp +584167775771'}));

  addMessage(res.reply, 'bot');
};

function addMessage(text, sender) {
  const div = document.createElement('div');
  div.className = sender === 'user' ? 'msg-user' : 'msg-bot';
  div.textContent = text;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Menú móvil gggggggggggggggggg
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const overlay = document.getElementById('overlay');

  function toggleMobileMenu() {
    mobileMenu.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  }

  mobileMenuBtn.addEventListener('click', toggleMobileMenu);
  overlay.addEventListener('click', toggleMobileMenu);

  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', toggleMobileMenu);
  });
});