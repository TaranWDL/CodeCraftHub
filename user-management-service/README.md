# User Management Service (Fixed & Commented)

A minimal, working Express + Mongoose API with registration, login (JWT), and a protected profile route. 
All files include clear comments to help you reason through each step in a lab environment.

## Quick Start
1. Copy `.env.example` to `.env` and set values:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/userdb
JWT_SECRET=change-this
```
2. Install deps:
```
npm install
```
3. Run:
```
npm start
```
4. Test:
```
curl -v http://localhost:5000/health
curl -v -X POST http://localhost:5000/api/users/register -H "Content-Type: application/json" -d '{"username":"alice","email":"alice@example.com","password":"mypassword"}'
curl -v -X POST http://localhost:5000/api/users/login -H "Content-Type: application/json" -d '{"email":"alice@example.com","password":"mypassword"}'
```

## Routes
- `POST /api/users/register` — create user
- `POST /api/users/login` — returns JWT
- `GET /api/users/profile` — requires `Authorization: Bearer <token>`
