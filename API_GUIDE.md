# ZFunds API Guide - How to Create Projects & Make Investments

## 🔐 Authentication First

All requests require authentication (except registration/login). You'll need a JWT token.

### 1. Register a User
```bash
POST http://localhost:3000/api/users

Body (JSON):
{
  "user_name": "John Doe",
  "user_email": "john@example.com",
  "user_role": "investor",  // or "company"
  "password": "password123"
}

Response:
{
  "user_id": 1,
  "user_name": "John Doe",
  "user_email": "john@example.com",
  "user_role": "investor",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 2. Login
```bash
POST http://localhost:3000/api/users/login

Body (JSON):
{
  "user_email": "john@example.com",
  "password": "password123"
}

Response:
{
  "user_id": 1,
  "user_name": "John Doe",
  "user_email": "john@example.com",
  "user_role": "investor",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Important:** Save the `token` - you'll need it for all other requests!

---

## 🏢 How to Create a Project

### Step 1: Create a Company First
Projects must belong to a company.

```bash
POST http://localhost:3000/api/companies

Headers:
  Authorization: Bearer YOUR_TOKEN_HERE

Body (JSON):
{
  "company_name": "Tech Startup Inc",
  "industry": "Technology",
  "company_description": "An innovative tech company",
  "company_location": "New York, USA"
}

Response:
{
  "company_id": 1,
  "company_name": "Tech Startup Inc",
  "industry": "Technology",
  "company_description": "An innovative tech company",
  "company_location": "New York, USA",
  "user_id": 1,
  "created_at": "2025-11-29T..."
}
```

### Step 2: Create a Project for the Company

```bash
POST http://localhost:3000/api/projects

Headers:
  Authorization: Bearer YOUR_TOKEN_HERE

Body (JSON):
{
  "project_title": "AI-Powered App",
  "project_category": "Software Development",
  "project_description": "Building an AI-powered mobile application",
  "goal_amount": 50000,
  "start_date": "2025-12-01",
  "end_date": "2026-06-01",
  "project_status": "active",  // optional: "pending", "active", "completed", "cancelled"
  "company_id": 1  // From Step 1
}

Response:
{
  "project_id": 1,
  "project_title": "AI-Powered App",
  "project_category": "Software Development",
  "project_description": "Building an AI-powered mobile application",
  "goal_amount": 50000,
  "raised_amount": 0,
  "start_date": "2025-12-01",
  "end_date": "2026-06-01",
  "project_status": "active",
  "company_id": 1,
  "created_at": "2025-11-29T..."
}
```

---

## 💰 How to Invest in a Project

### Step 1: View Available Projects

```bash
GET http://localhost:3000/api/projects

Headers:
  Authorization: Bearer YOUR_TOKEN_HERE

Response:
[
  {
    "project_id": 1,
    "project_title": "AI-Powered App",
    "project_category": "Software Development",
    "goal_amount": 50000,
    "raised_amount": 0,
    "project_status": "active",
    "company_id": 1,
    "company_name": "Tech Startup Inc"
  }
]
```

### Step 2: View Specific Project Details

```bash
GET http://localhost:3000/api/projects/1

Headers:
  Authorization: Bearer YOUR_TOKEN_HERE

Response:
{
  "project_id": 1,
  "project_title": "AI-Powered App",
  "project_category": "Software Development",
  "project_description": "Building an AI-powered mobile application",
  "goal_amount": 50000,
  "raised_amount": 0,
  "project_status": "active",
  "company_id": 1,
  "company_name": "Tech Startup Inc",
  "industry": "Technology"
}
```

### Step 3: Make an Investment

```bash
POST http://localhost:3000/api/investments

Headers:
  Authorization: Bearer YOUR_TOKEN_HERE

Body (JSON):
{
  "investment_amount": 5000,
  "company_id": 1,
  "user_id": 1,  // Your user_id from login
  "project_id": 1  // The project you want to invest in
}

Response:
{
  "investment_id": 1,
  "investment_amount": 5000,
  "company_id": 1,
  "user_id": 1,
  "project_id": 1,
  "created_at": "2025-11-29T..."
}
```

### Step 4: Update Project's Raised Amount (Optional)

After making an investment, you can update the project's raised amount:

```bash
PATCH http://localhost:3000/api/projects/1/raise

Headers:
  Authorization: Bearer YOUR_TOKEN_HERE

Body (JSON):
{
  "amount": 5000  // The investment amount
}

Response:
{
  "project_id": 1,
  "project_title": "AI-Powered App",
  "goal_amount": 50000,
  "raised_amount": 5000,  // Updated!
  ...
}
```

---

## 📊 View Your Investments

### Get All Your Investments

```bash
GET http://localhost:3000/api/investments/user/1

Headers:
  Authorization: Bearer YOUR_TOKEN_HERE

Response:
[
  {
    "investment_id": 1,
    "investment_amount": 5000,
    "company_id": 1,
    "company_name": "Tech Startup Inc",
    "project_id": 1,
    "project_title": "AI-Powered App",
    "goal_amount": 50000,
    "raised_amount": 5000,
    "project_status": "active",
    "created_at": "2025-11-29T..."
  }
]
```

---

## 🛠️ Testing with Postman or cURL

### Using Postman:
1. Create a new request
2. Set method (GET, POST, etc.)
3. Enter URL: `http://localhost:3000/api/...`
4. Add Headers: `Authorization: Bearer YOUR_TOKEN`
5. Add Body (for POST/PUT): Select "raw" and "JSON"
6. Send request

### Using cURL:

**Register:**
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "user_name": "John Doe",
    "user_email": "john@example.com",
    "user_role": "investor",
    "password": "password123"
  }'
```

**Create Project:**
```bash
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "project_title": "AI-Powered App",
    "project_category": "Software Development",
    "goal_amount": 50000,
    "company_id": 1
  }'
```

**Make Investment:**
```bash
curl -X POST http://localhost:3000/api/investments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "investment_amount": 5000,
    "company_id": 1,
    "user_id": 1,
    "project_id": 1
  }'
```

---

## 🎯 Quick Start Summary

1. **Register/Login** → Get your token
2. **Create a Company** → Get company_id
3. **Create a Project** → Use company_id, get project_id
4. **Make Investment** → Use company_id, user_id, and project_id
5. **Update Raised Amount** → Update project with investment amount

---

## 📝 Important Notes

- **All amounts** should be positive numbers (min 0.01)
- **Tokens expire** - if you get 401 errors, login again
- **Project status** can be: "pending", "active", "completed", "cancelled"
- **User roles** can be: "investor", "company", "admin"
- The backend is running on `http://localhost:3000`

---

## ❌ Common Errors

| Error | Meaning | Solution |
|-------|---------|----------|
| 401 Unauthorized | Missing or invalid token | Login again and use new token |
| 404 Not Found | Company/Project doesn't exist | Check ID is correct |
| 400 Bad Request | Missing required fields | Check all required fields are provided |
| 403 Forbidden | No permission | Check user role/ownership |

---

**Happy Investing! 🚀**

