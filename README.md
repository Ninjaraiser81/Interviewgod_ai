# InterviewGod.ai 🤖

AI-powered recruitment platform built with Python Flask.

## Features
- Landing page & Auth (Sign up / Log in)
- HR Dashboard with stats
- Hiring Groups management
- Candidate tracking & management
- AI Interview / Assessment / Phone Screening rounds
- Proctoring settings
- Detailed candidate reports with psychometric analysis
- Minutes store (buy more test time)
- Demo booking with calendar
- Candidate portal (KYC → checks → live interview)

## Setup & Run

### 1. Install dependencies
```bash
pip install -r requirements.txt
```

### 2. Run the app
```bash
python app.py
```

### 3. Open in browser
```
http://localhost:5000
```

## Pages
| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/signup` | Sign up |
| `/login` | Log in |
| `/dashboard` | HR Dashboard |
| `/groups` | Hiring Groups |
| `/candidates` | Candidate Management |
| `/reports` | Candidate Report |
| `/store` | Buy Minutes |
| `/demo` | Book a Demo |
| `/candidate-portal` | Candidate Interview Portal |

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/groups` | Create hiring group |
| POST | `/api/candidates` | Add candidate |
| DELETE | `/api/candidates/<id>` | Remove candidate |
| POST | `/api/book-demo` | Book demo slot |
| POST | `/api/buy-minutes` | Purchase minutes |
| POST | `/api/extract-skills` | AI skill extraction from JD |
