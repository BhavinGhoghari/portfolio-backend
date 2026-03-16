PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
JWT_SECRET=your_long_random_secret
JWT_EXPIRES_IN=7d
ADMIN_EMAIL=admin@yourportfolio.com
ADMIN_PASSWORD=YourPassword123
FRONTEND_URL=https://your-portfolio.vercel.app

```

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start with nodemon |
| `npm start` | Start for production |
| `node seed.js` | Populate DB with sample data |

---

## API Endpoints

**Base URL:** `http://localhost:5000/api`

### Public
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/profile` | Portfolio profile |
| GET | `/projects` | All projects |
| GET | `/skills` | All skills |
| GET | `/experience` | Experience timeline |
| POST | `/messages` | Submit contact form |

### Admin (Bearer token required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/login` | Login → JWT token |
| GET | `/auth/me` | Current admin |
| PUT | `/auth/change-password` | Update password |
| GET | `/stats` | Dashboard counts |
| PUT | `/profile` | Update profile |
| POST/PUT/DELETE | `/projects/:id` | CRUD projects |
| POST/PUT/DELETE | `/skills/:id` | CRUD skills |
| POST/PUT/DELETE | `/experience/:id` | CRUD experience |
| GET/PUT/DELETE | `/messages/:id` | Manage messages |

---

## Deploy to Render (Free)

1. Push `backend/` to GitHub
2. Render → **New → Web Service** → connect repo
3. Build: `npm install` · Start: `node server.js` · Plan: **Free**
4. Add all env vars from `.env.example`
5. Deploy

> Free tier sleeps after 15 min idle. Use [UptimeRobot](https://uptimerobot.com) to ping `/api/health` every 5 min to keep it awake.

```
