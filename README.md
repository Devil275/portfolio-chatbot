# Portfolio Chatbot 🤖

AI-powered chatbot for Raj Shekhar's portfolio and LinkedIn profile. Intelligent responses powered by OpenAI GPT-4, with integration for website widgets and LinkedIn Messaging API.

## Features ✨

- **AI-Powered Responses**: Uses OpenAI GPT-4 for intelligent, context-aware answers
- **Portfolio Integration**: Answers questions about projects, skills, and experience
- **LinkedIn Integration**: Responds to messages on LinkedIn profile
- **Website Widget**: Embeddable chatbot for your portfolio website
- **24/7 Availability**: Always responds to inquiries
- **Multi-Platform**: Works across web and LinkedIn

## Tech Stack 🛠️

- **Backend**: Node.js + Express.js
- **AI**: OpenAI GPT-4 API
- **Frontend**: React + Vite
- **Hosting**: Vercel / Render / Railway
- **Integrations**: LinkedIn Messaging API
- **Database**: Optional (Supabase / MongoDB)

## Quick Start 🚀

### Prerequisites
- Node.js 16+
- OpenAI API Key
- LinkedIn Developer Account (for messaging feature)
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Devil275/portfolio-chatbot.git
cd portfolio-chatbot
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Add your credentials:
```
OPENAI_API_KEY=sk-your-key-here
LINKEDIN_CLIENT_ID=your-linkedin-client-id
LINKEDIN_CLIENT_SECRET=your-linkedin-client-secret
PORT=3000
```

5. Start the server:
```bash
npm run dev
```

The chatbot will be available at `http://localhost:3000`

## Deployment 📦

### Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Deploy to Render
1. Push to GitHub
2. Connect repo to Render
3. Add environment variables
4. Deploy

## API Documentation 📚

### Chat Endpoint
```
POST /api/chat
Content-Type: application/json

{
  "message": "What are your skills?",
  "context": "portfolio"
}
```

### Response
```json
{
  "reply": "As a software developer, I specialize in...",
  "confidence": 0.95,
  "sources": ["portfolio", "linkedin"]
}
```

## LinkedIn Integration 🔗

To enable LinkedIn messaging:

1. Create LinkedIn App: https://www.linkedin.com/developers/apps
2. Get Client ID and Secret
3. Add webhook endpoint to LinkedIn
4. Set environment variables
5. Restart the server

## Usage Examples

### Website Widget
Add to your portfolio HTML:
```html
<script src="https://your-domain.com/widget.js"></script>
<div id="chatbot-widget"></div>
```

### Direct API Call
```javascript
const response = await fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: 'Tell me about yourself' })
});
const data = await response.json();
console.log(data.reply);
```

## Project Structure

```
portfolio-chatbot/
├── src/
│   ├── server.js
│   ├── routes/
│   │   ├── chat.js
│   │   ├── linkedin.js
│   │   └── widget.js
│   ├── controllers/
│   │   ├── chatController.js
│   │   └── linkedinController.js
│   ├── services/
│   │   ├── openaiService.js
│   │   ├── linkedinService.js
│   │   └── dataService.js
│   └── config/
│       └── config.js
├── public/
│   ├── widget.html
│   └── widget.css
├── .env.example
├── package.json
└── README.md
```

## Environment Variables

- `OPENAI_API_KEY`: Your OpenAI API key
- `LINKEDIN_CLIENT_ID`: LinkedIn app client ID
- `LINKEDIN_CLIENT_SECRET`: LinkedIn app client secret
- `LINKEDIN_ACCESS_TOKEN`: LinkedIn API access token
- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment (development/production)

## Features in Development 🔄

- [ ] Chat history storage
- [ ] User authentication
- [ ] Analytics dashboard
- [ ] Multi-language support
- [ ] Custom training on portfolio data
- [ ] Webhook integrations
- [ ] Rate limiting
- [ ] Admin panel

## Troubleshooting 🔧

### OpenAI API Error
- Check API key is valid
- Verify account has credits
- Check rate limits

### LinkedIn Integration Not Working
- Verify credentials in .env
- Check LinkedIn app permissions
- Ensure webhook URL is correct

### Widget Not Loading
- Check CORS settings
- Verify widget script URL
- Check browser console for errors

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

## License 📄

MIT License - feel free to use this project

## Support 💬

For issues and questions:
- GitHub Issues: [Create an issue](https://github.com/Devil275/portfolio-chatbot/issues)
- Email: sraj01603@gmail.com
- LinkedIn: [Raj Shekhar](https://www.linkedin.com/in/raj-shekhar-255131300/)

## Author ✍️

**Raj Shekhar**
- Portfolio: https://devil275.github.io/raj-shekhar-portfolio/
- LinkedIn: https://www.linkedin.com/in/raj-shekhar-255131300/
- GitHub: https://github.com/Devil275

---

**Made with ❤️ by Raj Shekhar**
