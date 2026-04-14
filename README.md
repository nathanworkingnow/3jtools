# 3J Full House Tool

Business management platform for 3J Marketing Department.

## Tech Stack

- **Backend**: Django 6, Django REST Framework, JWT auth, PostgreSQL (Neon)
- **Frontend**: React + TypeScript, Vite, Tailwind CSS
- **Integration**: Trello API

## Project Structure

```
3J Full House tool/
├── backend/          # Django API
│   ├── accounts/    # User management
│   ├── leads/      # Lead CRM + Trello sync
│   ├── proofing/    # Proof job management
│   └── dashboard/   # Analytics
└── frontend/       # React app
```

## Setup

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

Create `backend/.env` with:
```
SECRET_KEY=your-secret-key
DATABASE_URL=postgresql://...
TRELLO_API_KEY=your-key
TRELLO_SECRET=your-token
TRELLO_LIST_NEW=list-id
TRELLO_LIST_CONTACTED=list-id
# ...
```

## API Endpoints

- `POST /api/accounts/login/` - Get JWT token
- `GET /api/leads/` - List leads
- `POST /api/leads/` - Create lead
- `POST /api/leads/{id}/sync-trello/` - Sync to Trello
- `GET /api/proofing/jobs/` - List proof jobs
- `GET /api/dashboard/stats/` - Dashboard stats