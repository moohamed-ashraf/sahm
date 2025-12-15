# 📡 ZFunds API Endpoints - Complete List

**Base URL:** `http://localhost:3000/api`

**Legend:**
- 🟢 Public (No authentication required)
- 🔒 Private (Authentication token required)
- 🔐 Admin (Admin role required)

---

## 🧑 USER ENDPOINTS (`/api/users`)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/users` | 🟢 Public | Register a new user |
| POST | `/api/users/login` | 🟢 Public | Login and get JWT token |
| GET | `/api/users/profile` | 🔒 Private | Get current user profile |
| PUT | `/api/users/profile` | 🔒 Private | Update current user profile |
| GET | `/api/users` | 🔐 Admin | Get all users |
| DELETE | `/api/users/:id` | 🔒 Private | Delete a user |

### Details:

#### 1. Register User
```
POST /api/users

Body:
{
  "user_name": "John Doe",
  "user_email": "john@example.com",
  "user_role": "investor" | "entrepreneur" | "admin",
  "password": "password123"
}

Response: 201
{
  "user_id": 1,
  "user_name": "John Doe",
  "user_email": "john@example.com",
  "user_role": "investor",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### 2. Login
```
POST /api/users/login

Body:
{
  "user_email": "john@example.com",
  "password": "password123"
}

Response: 200
{
  "user_id": 1,
  "user_name": "John Doe",
  "user_email": "john@example.com",
  "user_role": "investor",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### 3. Get User Profile
```
GET /api/users/profile

Headers:
  Authorization: Bearer YOUR_TOKEN

Response: 200
{
  "user_id": 1,
  "user_name": "John Doe",
  "user_email": "john@example.com",
  "user_role": "investor"
}
```

#### 4. Update User Profile
```
PUT /api/users/profile

Headers:
  Authorization: Bearer YOUR_TOKEN

Body:
{
  "user_name": "John Updated",
  "user_email": "john.new@example.com",
  "user_role": "entrepreneur",
  "password": "newpassword123"
}

Response: 200
{
  "user_id": 1,
  "user_name": "John Updated",
  "user_email": "john.new@example.com",
  "user_role": "entrepreneur"
}
```

#### 5. Get All Users (Admin Only)
```
GET /api/users

Headers:
  Authorization: Bearer ADMIN_TOKEN

Response: 200
[
  {
    "user_id": 1,
    "user_name": "John Doe",
    "user_email": "john@example.com",
    "user_role": "investor"
  },
  ...
]
```

#### 6. Delete User
```
DELETE /api/users/:id

Headers:
  Authorization: Bearer YOUR_TOKEN

Response: 200
{
  "message": "User removed"
}
```

---

## 🏢 COMPANY ENDPOINTS (`/api/companies`)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/companies` | 🔒 Private | Create a new company |
| GET | `/api/companies` | 🔒 Private | Get all companies |
| GET | `/api/companies/:id` | 🔒 Private | Get company by ID |
| PUT | `/api/companies/:id` | 🔒 Private | Update company |
| DELETE | `/api/companies/:id` | 🔒 Private | Delete company |
| GET | `/api/companies/user/:userId` | 🔒 Private | Get companies by user ID |
| GET | `/api/companies/plan/:planId` | 🔒 Private | Get companies by plan ID |

### Details:

#### 1. Create Company
```
POST /api/companies

Headers:
  Authorization: Bearer YOUR_TOKEN

Body:
{
  "company_name": "Tech Startup Inc",
  "tax_number": "123456789",
  "commercial_register": "CR-987654",
  "industry": "Technology",
  "company_description": "Innovative tech solutions",
  "company_location": "New York, USA"
}

Response: 201
{
  "company_id": 1,
  "company_name": "Tech Startup Inc",
  "tax_number": "123456789",
  "commercial_register": "CR-987654",
  "industry": "Technology",
  "company_description": "Innovative tech solutions",
  "company_location": "New York, USA",
  "user_id": 1,
  "created_at": "2025-11-29T..."
}
```

#### 2. Get All Companies
```
GET /api/companies

Headers:
  Authorization: Bearer YOUR_TOKEN

Response: 200
[
  {
    "company_id": 1,
    "company_name": "Tech Startup Inc",
    "industry": "Technology",
    ...
  },
  ...
]
```

#### 3. Get Company by ID
```
GET /api/companies/1

Headers:
  Authorization: Bearer YOUR_TOKEN

Response: 200
{
  "company_id": 1,
  "company_name": "Tech Startup Inc",
  ...
}
```

#### 4. Update Company
```
PUT /api/companies/1

Headers:
  Authorization: Bearer YOUR_TOKEN

Body:
{
  "company_name": "Updated Company Name",
  "industry": "AI Technology"
}

Response: 200
{
  "company_id": 1,
  "company_name": "Updated Company Name",
  ...
}
```

#### 5. Delete Company
```
DELETE /api/companies/1

Headers:
  Authorization: Bearer YOUR_TOKEN

Response: 200
{
  "message": "Company removed"
}
```

#### 6. Get Companies by User ID
```
GET /api/companies/user/1

Headers:
  Authorization: Bearer YOUR_TOKEN

Response: 200
[
  {
    "company_id": 1,
    "company_name": "Tech Startup Inc",
    "user_id": 1
  }
]
```

---

## 📊 PROJECT ENDPOINTS (`/api/projects`)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/projects` | 🔒 Private | Create a new project |
| GET | `/api/projects` | 🔒 Private | Get all projects |
| GET | `/api/projects/:id` | 🔒 Private | Get project by ID |
| PUT | `/api/projects/:id` | 🔒 Private | Update project |
| DELETE | `/api/projects/:id` | 🔒 Private | Delete project |
| GET | `/api/projects/company/:company_id` | 🔒 Private | Get projects by company ID |
| PATCH | `/api/projects/:id/raise` | 🔒 Private | Update project raised amount |

### Details:

#### 1. Create Project
```
POST /api/projects

Headers:
  Authorization: Bearer YOUR_TOKEN

Body:
{
  "project_title": "AI Mobile App",
  "project_category": "Software Development",
  "project_description": "Building an AI-powered app",
  "goal_amount": 50000,
  "start_date": "2025-12-01",
  "end_date": "2026-06-01",
  "project_status": "active",
  "company_id": 1
}

Response: 201
{
  "project_id": 1,
  "project_title": "AI Mobile App",
  "project_category": "Software Development",
  "project_description": "Building an AI-powered app",
  "goal_amount": 50000.00,
  "raised_amount": 0.00,
  "start_date": "2025-12-01",
  "end_date": "2026-06-01",
  "project_status": "active",
  "company_id": 1,
  "created_at": "2025-11-29T..."
}
```

#### 2. Get All Projects
```
GET /api/projects

Headers:
  Authorization: Bearer YOUR_TOKEN

Response: 200
[
  {
    "project_id": 1,
    "project_title": "AI Mobile App",
    "goal_amount": 50000.00,
    "raised_amount": 5000.00,
    "project_status": "active",
    "company_name": "Tech Startup Inc"
  },
  ...
]
```

#### 3. Get Project by ID
```
GET /api/projects/1

Headers:
  Authorization: Bearer YOUR_TOKEN

Response: 200
{
  "project_id": 1,
  "project_title": "AI Mobile App",
  "project_category": "Software Development",
  "goal_amount": 50000.00,
  "raised_amount": 5000.00,
  "company_name": "Tech Startup Inc",
  "industry": "Technology"
}
```

#### 4. Update Project
```
PUT /api/projects/1

Headers:
  Authorization: Bearer YOUR_TOKEN

Body:
{
  "project_title": "Updated Project Name",
  "goal_amount": 75000,
  "project_status": "completed"
}

Response: 200
{
  "project_id": 1,
  "project_title": "Updated Project Name",
  ...
}
```

#### 5. Delete Project
```
DELETE /api/projects/1

Headers:
  Authorization: Bearer YOUR_TOKEN

Response: 200
{
  "message": "Project removed"
}
```

#### 6. Get Projects by Company ID
```
GET /api/projects/company/1

Headers:
  Authorization: Bearer YOUR_TOKEN

Response: 200
[
  {
    "project_id": 1,
    "project_title": "AI Mobile App",
    "company_id": 1,
    "company_name": "Tech Startup Inc"
  }
]
```

#### 7. Update Project Raised Amount
```
PATCH /api/projects/1/raise

Headers:
  Authorization: Bearer YOUR_TOKEN

Body:
{
  "amount": 5000
}

Response: 200
{
  "project_id": 1,
  "raised_amount": 5000.00
}
```

---

## 💰 INVESTMENT ENDPOINTS (`/api/investments`)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/investments` | 🔒 Private | Create a new investment |
| GET | `/api/investments` | 🔒 Private | Get all investments |
| GET | `/api/investments/:id` | 🔒 Private | Get investment by ID |
| GET | `/api/investments/user/:userId` | 🔒 Private | Get investments by user ID |
| GET | `/api/investments/company/:companyId` | 🔒 Private | Get investments by company ID |

### Details:

#### 1. Create Investment
```
POST /api/investments

Headers:
  Authorization: Bearer YOUR_TOKEN

Body:
{
  "investment_amount": 5000,
  "company_id": 1,
  "user_id": 1,
  "project_id": 1
}

Response: 201
{
  "investment_id": 1,
  "investment_amount": 5000.00,
  "company_id": 1,
  "user_id": 1,
  "project_id": 1,
  "investment_date": "2025-11-29T...",
  "created_at": "2025-11-29T..."
}
```

#### 2. Get All Investments
```
GET /api/investments

Headers:
  Authorization: Bearer YOUR_TOKEN

Response: 200
[
  {
    "investment_id": 1,
    "investment_amount": 5000.00,
    "company_id": 1,
    "company_name": "Tech Startup Inc"
  },
  ...
]
```

#### 3. Get Investment by ID
```
GET /api/investments/1

Headers:
  Authorization: Bearer YOUR_TOKEN

Response: 200
{
  "investment_id": 1,
  "investment_amount": 5000.00,
  "company_id": 1,
  "company_name": "Tech Startup Inc",
  "user_id": 1
}
```

#### 4. Get Investments by User ID
```
GET /api/investments/user/1

Headers:
  Authorization: Bearer YOUR_TOKEN

Response: 200
[
  {
    "investment_id": 1,
    "investment_amount": 5000.00,
    "company_name": "Tech Startup Inc",
    "project_title": "AI Mobile App",
    "goal_amount": 50000.00,
    "raised_amount": 5000.00,
    "project_status": "active"
  }
]
```

#### 5. Get Investments by Company ID
```
GET /api/investments/company/1

Headers:
  Authorization: Bearer YOUR_TOKEN

Response: 200
[
  {
    "investment_id": 1,
    "investment_amount": 5000.00,
    "company_id": 1,
    "company_name": "Tech Startup Inc"
  }
]
```

---

## 💳 PAYMENT ENDPOINTS (`/api/payments`)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/payments` | 🔒 Private | Create a new payment |
| GET | `/api/payments` | 🔒 Private | Get all payments |
| GET | `/api/payments/:id` | 🔒 Private | Get payment by ID |
| PUT | `/api/payments/:id` | 🔐 Admin | Update payment status |
| GET | `/api/payments/user/:userId` | 🔒 Private | Get payments by user ID |

### Details:

#### 1. Create Payment
```
POST /api/payments

Headers:
  Authorization: Bearer YOUR_TOKEN

Body:
{
  "payment_amount": 5000,
  "payment_method": "credit_card",
  "payment_status": "pending",
  "investment_id": 1
}

Response: 201
{
  "payment_id": 1,
  "payment_amount": 5000.00,
  "payment_method": "credit_card",
  "payment_status": "pending",
  "user_id": 1,
  "investment_id": 1,
  "payment_date": "2025-11-29T...",
  "created_at": "2025-11-29T..."
}
```

#### 2. Get All Payments
```
GET /api/payments

Headers:
  Authorization: Bearer YOUR_TOKEN

Response: 200
[
  {
    "payment_id": 1,
    "payment_amount": 5000.00,
    "payment_status": "pending",
    "user_id": 1
  }
]
```

#### 3. Get Payment by ID
```
GET /api/payments/1

Headers:
  Authorization: Bearer YOUR_TOKEN

Response: 200
{
  "payment_id": 1,
  "payment_amount": 5000.00,
  "payment_method": "credit_card",
  "payment_status": "pending",
  "user_id": 1,
  "investment_id": 1
}
```

#### 4. Update Payment Status (Admin Only)
```
PUT /api/payments/1

Headers:
  Authorization: Bearer ADMIN_TOKEN

Body:
{
  "payment_status": "completed"
}

Response: 200
{
  "payment_id": 1,
  "payment_status": "completed"
}
```

#### 5. Get Payments by User ID
```
GET /api/payments/user/1

Headers:
  Authorization: Bearer YOUR_TOKEN

Response: 200
[
  {
    "payment_id": 1,
    "payment_amount": 5000.00,
    "payment_status": "completed",
    "user_id": 1
  }
]
```

---

## 📋 PLAN ENDPOINTS (`/api/plans`)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/plans` | 🔐 Admin | Create a new plan |
| GET | `/api/plans` | 🟢 Public | Get all plans |
| GET | `/api/plans/:id` | 🟢 Public | Get plan by ID |
| PUT | `/api/plans/:id` | 🔐 Admin | Update plan |
| DELETE | `/api/plans/:id` | 🔐 Admin | Delete plan |

### Details:

#### 1. Create Plan (Admin Only)
```
POST /api/plans

Headers:
  Authorization: Bearer ADMIN_TOKEN

Body:
{
  "plan_name": "Premium Plan",
  "plan_description": "Full access to all features",
  "plan_price": 99.99,
  "plan_duration": 30,
  "plan_features": "Feature 1, Feature 2, Feature 3"
}

Response: 201
{
  "plan_id": 1,
  "plan_name": "Premium Plan",
  "plan_description": "Full access to all features",
  "plan_price": 99.99,
  "plan_duration": 30,
  "plan_features": "Feature 1, Feature 2, Feature 3",
  "is_active": "yes",
  "created_at": "2025-11-29T..."
}
```

#### 2. Get All Plans
```
GET /api/plans

Response: 200
[
  {
    "plan_id": 1,
    "plan_name": "Premium Plan",
    "plan_description": "Full access to all features",
    "plan_price": 99.99,
    "plan_duration": 30,
    "is_active": "yes"
  }
]
```

#### 3. Get Plan by ID
```
GET /api/plans/1

Response: 200
{
  "plan_id": 1,
  "plan_name": "Premium Plan",
  "plan_description": "Full access to all features",
  "plan_price": 99.99
}
```

#### 4. Update Plan (Admin Only)
```
PUT /api/plans/1

Headers:
  Authorization: Bearer ADMIN_TOKEN

Body:
{
  "plan_name": "Updated Premium Plan",
  "plan_price": 89.99
}

Response: 200
{
  "plan_id": 1,
  "plan_name": "Updated Premium Plan",
  "plan_price": 89.99
}
```

#### 5. Delete Plan (Admin Only)
```
DELETE /api/plans/1

Headers:
  Authorization: Bearer ADMIN_TOKEN

Response: 200
{
  "message": "Plan removed"
}
```

---

## 🏥 HEALTH CHECK

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/health` | 🟢 Public | Check API status |

```
GET /api/health

Response: 200
{
  "status": "ok",
  "message": "ZFunds API is running"
}
```

---

## 📊 Summary Statistics

### Total Endpoints: **38**

**By Access Level:**
- 🟢 Public: 5 endpoints
- 🔒 Private: 25 endpoints
- 🔐 Admin Only: 8 endpoints

**By Resource:**
- Users: 6 endpoints
- Companies: 7 endpoints
- Projects: 7 endpoints
- Investments: 5 endpoints
- Payments: 5 endpoints
- Plans: 5 endpoints
- Health: 1 endpoint
- Test: 2 endpoints

---

## 🔑 Authentication

All protected endpoints require JWT token in the Authorization header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Get your token from:
- `/api/users` (Register)
- `/api/users/login` (Login)

Store the token in:
- `localStorage.setItem('userToken', token)`

---

## 📝 Response Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (validation error) |
| 401 | Unauthorized (invalid/missing token) |
| 403 | Forbidden (insufficient permissions) |
| 404 | Not Found |
| 500 | Server Error |

---

## 🎯 Common Workflows

### Workflow 1: Register & Create Project
```
1. POST /api/users (Register as entrepreneur)
2. POST /api/companies (Create company)
3. POST /api/projects (Create project)
```

### Workflow 2: Browse & Invest
```
1. POST /api/users/login (Login as investor)
2. GET /api/projects (Browse projects)
3. POST /api/investments (Make investment)
4. POST /api/payments (Process payment)
5. PATCH /api/projects/:id/raise (Update raised amount)
```

### Workflow 3: Track Investments
```
1. POST /api/users/login (Login)
2. GET /api/investments/user/:userId (Get your investments)
3. GET /api/payments/user/:userId (Get your payments)
```

---

**Last Updated:** November 29, 2025
**API Version:** 1.0
**Base URL:** http://localhost:3000/api

