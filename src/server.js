import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import OpenAI from 'openai';
import serverless from 'serverless-http';

const app = express();

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
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
    // System prompt with portfolio context
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
  // Handle LinkedIn webhook events
  res.json({ status: 'received' });
});

// Widget script endpoint
app.get('/widget.js', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript');
  res.send(`
(function() {
  const widget = document.createElement('div');
  widget.id = 'portfolio-chatbot';
  widget.innerHTML = '<p>Chatbot Widget Loading...</p>';
  document.body.appendChild(widget);
})();
  `);
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

// Export as serverless handler for Vercel
export default serverless(app);
