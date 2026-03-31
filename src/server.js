import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import OpenAI from 'openai';
import serverless from 'serverless-http';

const app = express();
app.set('trust proxy', true);

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  keyGenerator: (req) => req.ip || 'global',
  standardHeaders: false,
  legacyHeaders: false,
});
app.use(limiter);

// Portfolio data
const portfolioData = {
  name: 'Raj Shekhar',
  title: 'B.Sc. IT Student | Software Developer | AI & Python Enthusiast',
  skills: [
    'Python',
    'JavaScript',
    'React',
    'Node.js',
    'Express',
    'MongoDB',
    'AI/ML',
    'Web Development',
  ],
  experience: [
    {
      title: 'Computer Tutor',
      company: 'Saksham Computer Center',
      duration: '2021 - Present',
      description: 'Teaching programming, web technologies, and computer fundamentals',
    },
  ],
  portfolio_url: 'https://devil275.github.io/raj-shekhar-portfolio/',
  linkedin_url: 'https://www.linkedin.com/in/raj-shekhar-255131300/',
  github_url: 'https://github.com/Devil275',
  email: 'sraj01603@gmail.com',
  location: 'Patna, Bihar, India',
};

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, context = 'general' } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }
    const systemPrompt = `You are Raj Shekhar's professional AI assistant.
Raj's Information:
- Name: ${portfolioData.name}
- Current Role: ${portfolioData.title}
- Skills: ${portfolioData.skills.join(', ')}
- Experience: ${portfolioData.experience.map((exp) => `${exp.title} at ${exp.company} (${exp.duration})`).join('; ')}
- Portfolio: ${portfolioData.portfolio_url}
- LinkedIn: ${portfolioData.linkedin_url}
- Email: ${portfolioData.email}
- Location: ${portfolioData.location}
You should:
1. Answer questions about Raj's professional background, skills, and experience
2. Provide information from the portfolio and LinkedIn profile
3. Be professional and friendly
4. Include relevant links when appropriate
5. If you don't know something, direct them to the portfolio or LinkedIn profile`;
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });
    const reply = response.choices[0].message.content;
    res.json({
      reply,
      confidence: 0.95,
      sources: ['portfolio', 'linkedin'],
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Failed to generate response' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Chatbot is running' });
});

// Portfolio info endpoint
app.get('/api/portfolio', (req, res) => {
  res.json(portfolioData);
});

// LinkedIn webhook (placeholder for future integration)
app.post('/webhook/linkedin', (req, res) => {
  res.json({ status: 'received' });
});

// Widget script endpoint
app.get('/widget.js', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript');
  res.send(`(function() { if (window.__portfolioChatbotLoaded) return; window.__portfolioChatbotLoaded = true; const WIDGET_API_URL = '${process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : 'http://localhost:3000'}'; const container = document.createElement('div'); container.id = 'portfolio-chatbot-container'; container.innerHTML = \\`<style>#portfolio-chatbot-container { position: fixed; bottom: 24px; right: 24px; z-index: 9999; font-family: 'Plus Jakarta Sans', sans-serif; } #portfolio-chatbot-btn { width: 56px; height: 56px; border-radius: 50%; background: linear-gradient(135deg, #6366f1, #a855f7); border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4); transition: transform 0.3s, box-shadow 0.3s; position: relative; } #portfolio-chatbot-btn:hover { transform: scale(1.1); box-shadow: 0 6px 30px rgba(99, 102, 241, 0.6); } #portfolio-chatbot-btn svg { width: 24px; height: 24px; fill: white; } #portfolio-chatbot-btn .close-icon { display: none; } #portfolio-chatbot-btn.open .chat-icon { display: none; } #portfolio-chatbot-btn.open .close-icon { display: block; } #portfolio-chatbot-window { display: none; position: absolute; bottom: 70px; right: 0; width: 340px; max-height: 500px; background: #0f172a; border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.4); flex-direction: column; } #portfolio-chatbot-window.open { display: flex; } #portfolio-chatbot-header { padding: 16px; background: linear-gradient(135deg, #6366f1, #a855f7); color: white; display: flex; align-items: center; gap: 10px; } #portfolio-chatbot-header .avatar { width: 36px; height: 36px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; color: #6366f1; } #portfolio-chatbot-header .info h4 { margin: 0; font-size: 14px; font-weight: 700; } #portfolio-chatbot-header .info p { margin: 0; font-size: 11px; opacity: 0.9; } #portfolio-chatbot-messages { flex: 1; padding: 16px; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; background: #050505; min-height: 300px; } #portfolio-chatbot-messages::-webkit-scrollbar { width: 6px; } #portfolio-chatbot-messages::-webkit-scrollbar-thumb { background: #334155; border-radius: 3px; } .pc-message { max-width: 85%; padding: 10px 14px; border-radius: 12px; font-size: 13px; line-height: 1.5; animation: pcFadeIn 0.3s ease; } @keyframes pcFadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } } .pc-message.user { background: linear-gradient(135deg, #6366f1, #a855f7); color: white; align-self: flex-end; border-bottom-right-radius: 4px; } .pc-message.bot { background: rgba(255,255,255,0.05); color: #e2e8f0; align-self: flex-start; border-bottom-left-radius: 4px; } .pc-message a { color: #60a5fa; text-decoration: none; } .pc-message a:hover { text-decoration: underline; } #portfolio-chatbot-input-area { display: flex; padding: 12px; gap: 8px; background: #0f172a; border-top: 1px solid rgba(255,255,255,0.08); } #portfolio-chatbot-input { flex: 1; padding: 10px 14px; border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; background: rgba(255,255,255,0.03); color: #e2e8f0; font-size: 13px; outline: none; } #portfolio-chatbot-input:focus { border-color: #6366f1; } #portfolio-chatbot-send { padding: 10px 16px; background: linear-gradient(135deg, #6366f1, #a855f7); border: none; border-radius: 10px; color: white; font-weight: 600; font-size: 13px; cursor: pointer; transition: opacity 0.2s; } #portfolio-chatbot-send:hover { opacity: 0.9; } #portfolio-chatbot-send:disabled { opacity: 0.5; cursor: not-allowed; } .pc-typing { display: flex; gap: 4px; padding: 10px 14px; background: rgba(255,255,255,0.05); border-radius: 12px; width: fit-content; align-self: flex-start; } .pc-typing span { width: 6px; height: 6px; background: #6366f1; border-radius: 50%; animation: pcTyping 1.4s infinite ease-in-out; } .pc-typing span:nth-child(2) { animation-delay: 0.2s; } .pc-typing span:nth-child(3) { animation-delay: 0.4s; } @keyframes pcTyping { 0%, 100% { transform: scale(0.6); opacity: 0.5; } 50% { transform: scale(1); opacity: 1; } } </style><button id=\"portfolio-chatbot-btn\" aria-label=\"Open chat\"><svg class=\"chat-icon\" viewBox=\"0 0 24 24\"><path d=\"M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z\"/></svg><svg class=\"close-icon\" viewBox=\"0 0 24 24\"><path d=\"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\"/></svg></button><div id=\"portfolio-chatbot-window\"><div id=\"portfolio-chatbot-header\"><div class=\"avatar\">R</div><div class=\"info\"><h4>Ask Raj Shekhar's AI</h4><p>Chat about my portfolio & experience</p></div></div><div id=\"portfolio-chatbot-messages\"><div class=\"pc-message bot\">Hi! I'm Raj Shekhar's AI assistant. Ask me about my skills, experience, projects, or anything else!</div></div><div id=\"portfolio-chatbot-input-area\"><input type=\"text\" id=\"portfolio-chatbot-input\" placeholder=\"Type a message...\"/><button id=\"portfolio-chatbot-send\">Send</button></div></div>\`; document.body.appendChild(container); const btn = document.getElementById('portfolio-chatbot-btn'); const win = document.getElementById('portfolio-chatbot-window'); const messagesEl = document.getElementById('portfolio-chatbot-messages'); const input = document.getElementById('portfolio-chatbot-input'); const sendBtn = document.getElementById('portfolio-chatbot-send'); btn.addEventListener('click', () => { btn.classList.toggle('open'); win.classList.toggle('open'); if (win.classList.contains('open')) { setTimeout(() => input.focus(), 300); } }); async function sendMessage() { const text = input.value.trim(); if (!text) return; const userMsg = document.createElement('div'); userMsg.className = 'pc-message user'; userMsg.textContent = text; messagesEl.appendChild(userMsg); messagesEl.scrollTop = messagesEl.scrollHeight; input.value = ''; sendBtn.disabled = true; const typing = document.createElement('div'); typing.className = 'pc-typing'; typing.innerHTML = '<span></span><span></span><span></span>'; typing.id = 'pc-typing'; messagesEl.appendChild(typing); messagesEl.scrollTop = messagesEl.scrollHeight; try { const res = await fetch(WIDGET_API_URL + '/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: text, context: 'portfolio' }) }); const data = await res.json(); typing.remove(); const botMsg = document.createElement('div'); botMsg.className = 'pc-message bot'; botMsg.innerHTML = data.reply || 'Sorry, I could not process that.'; messagesEl.appendChild(botMsg); messagesEl.scrollTop = messagesEl.scrollHeight; } catch (err) { typing.remove(); const errMsg = document.createElement('div'); errMsg.className = 'pc-message bot'; errMsg.textContent = 'Sorry, I am having trouble connecting. Please try again.'; messagesEl.appendChild(errMsg); messagesEl.scrollTop = messagesEl.scrollHeight; } sendBtn.disabled = false; input.focus(); } sendBtn.addEventListener('click', sendMessage); input.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); }); })();`);
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

export default serverless(app);
