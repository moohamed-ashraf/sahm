# 📝 Complete Guide: How to Create a Project as a User

## Quick Overview
To create a project, you need:
1. ✅ A registered user account (with role: "company" or "admin")
2. ✅ A company created by that user
3. ✅ Authentication token from login
4. ✅ Company ID to link the project

---

## 🌐 Method 1: Using the Web Interface (Frontend)

### Step 1: Access the Application
Open your browser and go to: **http://localhost:4200**

### Step 2: Register/Login
1. Click **"Register"** (if you don't have an account)
2. Fill in the form:
   - **Name:** Your name
   - **Email:** your@email.com
   - **Password:** Choose a strong password
   - **Role:** Select **"company"** (important!)
3. Click **"Register"**
4. You'll be automatically logged in and receive a token

**OR** if you already have an account:
1. Click **"Login"**
2. Enter your email and password
3. Click **"Login"**

### Step 3: Create a Company
Before creating a project, you need a company:

1. Navigate to **"Company Form"** or **"Create Company"** page
2. Fill in the company details:
   ```
   Company Name: Tech Innovations Inc
   Industry: Technology
   Description: A cutting-edge tech company
   Location: New York, USA
   ```
3. Click **"Submit"** or **"Create Company"**
4. **Important:** Note down your `company_id` (it will be shown in the response)

### Step 4: Create Your Project
1. Navigate to **"Project"** or **"Create Project"** page
2. Fill in the project form:
   ```
   Project Title: AI-Powered Task Manager
   Category: Software Development
   Description: An intelligent app that helps users organize tasks
   Goal Amount: 50000
   Start Date: 2025-12-01
   End Date: 2026-06-01
   Status: active
   Company ID: 1 (use your company_id from Step 3)
   ```
3. Click **"Create Project"**

### Step 5: View Your Project
Your project is now live! Users can:
- View it in the projects list
- See funding progress
- Invest in your project

---

## 🔌 Method 2: Using Postman (API Testing Tool)

### Prerequisites:
- Download and install [Postman](https://www.postman.com/downloads/)
- Make sure backend is running on http://localhost:3000

### Step 1: Register a User

**Request:**
```
Method: POST
URL: http://localhost:3000/api/users
Headers:
  Content-Type: application/json
Body (raw JSON):
{
  "user_name": "John Company",
  "user_email": "john@startup.com",
  "user_role": "company",
  "password": "securepass123"
}
```

**Response:** (Save the token!)
```json
{
  "user_id": 1,
  "user_name": "John Company",
  "user_email": "john@startup.com",
  "user_role": "company",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VyX25hbWUiOiJKb2huIENvbXBhbnkiLCJ1c2VyX2VtYWlsIjoiam9obkBzdGFydHVwLmNvbSIsInVzZXJfcm9sZSI6ImNvbXBhbnkiLCJpYXQiOjE3MDE5ODQxMDB9.abc123..."
}
```

**📋 Copy the `token` - you'll need it for all subsequent requests!**

### Step 2: Create a Company

**Request:**
```
Method: POST
URL: http://localhost:3000/api/companies
Headers:
  Content-Type: application/json
  Authorization: Bearer YOUR_TOKEN_HERE
Body (raw JSON):
{
  "company_name": "Future Tech LLC",
  "industry": "Artificial Intelligence",
  "company_description": "We build AI solutions for businesses",
  "company_location": "Silicon Valley, CA"
}
```

**Response:** (Save the company_id!)
```json
{
  "company_id": 1,
  "company_name": "Future Tech LLC",
  "industry": "Artificial Intelligence",
  "company_description": "We build AI solutions for businesses",
  "company_location": "Silicon Valley, CA",
  "user_id": 1,
  "created_at": "2025-11-29T20:00:00.000Z",
  "updated_at": "2025-11-29T20:00:00.000Z"
}
```

**📋 Copy the `company_id`!**

### Step 3: Create a Project

**Request:**
```
Method: POST
URL: http://localhost:3000/api/projects
Headers:
  Content-Type: application/json
  Authorization: Bearer YOUR_TOKEN_HERE
Body (raw JSON):
{
  "project_title": "Smart Home AI Assistant",
  "project_category": "IoT & AI",
  "project_description": "Building an intelligent home automation system powered by AI. This system will learn user preferences and automate home devices accordingly.",
  "goal_amount": 100000,
  "start_date": "2025-12-15",
  "end_date": "2026-06-15",
  "project_status": "active",
  "company_id": 1
}
```

**Response:**
```json
{
  "project_id": 1,
  "project_title": "Smart Home AI Assistant",
  "project_category": "IoT & AI",
  "project_description": "Building an intelligent home automation system...",
  "goal_amount": 100000.00,
  "raised_amount": 0.00,
  "start_date": "2025-12-15",
  "end_date": "2026-06-15",
  "project_status": "active",
  "company_id": 1,
  "created_at": "2025-11-29T20:05:00.000Z",
  "updated_at": "2025-11-29T20:05:00.000Z"
}
```

**🎉 Success! Your project is created!**

### Step 4: Verify Your Project

**Get all projects:**
```
Method: GET
URL: http://localhost:3000/api/projects
Headers:
  Authorization: Bearer YOUR_TOKEN_HERE
```

**Get your specific project:**
```
Method: GET
URL: http://localhost:3000/api/projects/1
Headers:
  Authorization: Bearer YOUR_TOKEN_HERE
```

---

## 💻 Method 3: Using cURL (Command Line)

### Step 1: Register User
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "user_name": "Sarah Founder",
    "user_email": "sarah@techco.com",
    "user_role": "company",
    "password": "mypassword123"
  }'
```

**Copy the token from response!**

### Step 2: Create Company
```bash
curl -X POST http://localhost:3000/api/companies \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "company_name": "EcoTech Solutions",
    "industry": "Clean Energy",
    "company_description": "Sustainable energy solutions",
    "company_location": "Austin, TX"
  }'
```

**Copy the company_id from response!**

### Step 3: Create Project
```bash
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "project_title": "Solar Panel Innovation",
    "project_category": "Renewable Energy",
    "project_description": "Developing next-gen solar panels with 40% efficiency",
    "goal_amount": 200000,
    "start_date": "2026-01-01",
    "end_date": "2026-12-31",
    "project_status": "active",
    "company_id": 1
  }'
```

---

## 📋 Required Fields Explained

### For User Registration:
| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `user_name` | String | Your full name | "John Doe" |
| `user_email` | String | Valid email address | "john@example.com" |
| `user_role` | String | Must be "company" to create projects | "company" |
| `password` | String | Minimum 6 characters | "securepass123" |

### For Company Creation:
| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `company_name` | String | Yes | Name of your company | "Tech Innovations Inc" |
| `industry` | String | No | Business industry | "Technology" |
| `company_description` | Text | No | Company description | "Building the future" |
| `company_location` | String | No | Location | "New York, USA" |

### For Project Creation:
| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `project_title` | String | Yes | Project name | "AI Mobile App" |
| `project_category` | String | Yes | Project category | "Software Development" |
| `project_description` | Text | No | Detailed description | "Building an AI app..." |
| `goal_amount` | Number | Yes | Funding goal (min 0.01) | 50000 |
| `start_date` | Date | No | Project start date | "2025-12-01" |
| `end_date` | Date | No | Project end date | "2026-06-01" |
| `project_status` | String | No | Status | "active", "pending", "completed", "cancelled" |
| `company_id` | Number | Yes | Your company ID | 1 |

---

## ✅ Validation Rules

### Project Requirements:
- ✅ `project_title` - Cannot be empty
- ✅ `project_category` - Cannot be empty
- ✅ `goal_amount` - Must be at least 0.01
- ✅ `company_id` - Must be a valid existing company
- ✅ User must be logged in (valid token required)
- ✅ Company must belong to the logged-in user

---

## 🔍 After Creating a Project

### View Your Project:
```bash
GET http://localhost:3000/api/projects/1
Headers: Authorization: Bearer YOUR_TOKEN
```

### Update Your Project:
```bash
PUT http://localhost:3000/api/projects/1
Headers: Authorization: Bearer YOUR_TOKEN
Body: {
  "project_title": "Updated Title",
  "goal_amount": 75000
}
```

### View All Company's Projects:
```bash
GET http://localhost:3000/api/projects/company/1
Headers: Authorization: Bearer YOUR_TOKEN
```

### Wait for Investments:
- Investors can now see your project
- They can invest using: `POST /api/investments`
- Your `raised_amount` will update automatically

---

## 🎯 Complete Example Flow

Here's a real-world example:

```javascript
// 1. Register
{
  "user_name": "Alice Johnson",
  "user_email": "alice@greentech.io",
  "user_role": "company",
  "password": "alice2024"
}
// → Save token: "eyJhbGc..."

// 2. Create Company
{
  "company_name": "GreenTech Solutions",
  "industry": "Environmental Technology",
  "company_description": "Fighting climate change with technology",
  "company_location": "Seattle, WA"
}
// → Save company_id: 5

// 3. Create Project
{
  "project_title": "Ocean Cleanup Robot",
  "project_category": "Environmental",
  "project_description": "Autonomous robots that clean ocean plastic",
  "goal_amount": 150000,
  "start_date": "2026-01-01",
  "end_date": "2026-12-31",
  "project_status": "active",
  "company_id": 5
}
// → Project created! project_id: 10
```

---

## ❌ Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| 401 Unauthorized | Missing or invalid token | Login again to get new token |
| 400 Bad Request | Missing required fields | Check all required fields are filled |
| 404 Company not found | Invalid company_id | Verify company exists and ID is correct |
| 403 Forbidden | User role is not "company" | Register with role: "company" |
| 500 Server Error | Database/server issue | Check backend logs |

---

## 🎓 Pro Tips

1. **Save Your Token:** Store it securely - you need it for all authenticated requests
2. **One Company, Many Projects:** Create one company, then multiple projects under it
3. **Active Status:** Set projects to "active" so investors can see them
4. **Realistic Goals:** Set achievable funding goals
5. **Clear Descriptions:** Write detailed descriptions to attract investors
6. **Date Format:** Use YYYY-MM-DD format for dates
7. **Test First:** Use Postman to test before integrating with frontend

---

## 📱 Mobile/Frontend Integration

If you're building a mobile or web app, here's how to integrate:

```typescript
// Angular Example
import { ProjectService } from './services/project.service';

createProject() {
  const projectData = {
    project_title: this.projectForm.value.title,
    project_category: this.projectForm.value.category,
    project_description: this.projectForm.value.description,
    goal_amount: this.projectForm.value.goalAmount,
    start_date: this.projectForm.value.startDate,
    end_date: this.projectForm.value.endDate,
    project_status: 'active',
    company_id: this.companyId
  };

  this.projectService.createProject(projectData).subscribe({
    next: (response) => {
      console.log('Project created:', response);
      // Navigate to project page or show success message
    },
    error: (error) => {
      console.error('Error creating project:', error);
      // Show error message to user
    }
  });
}
```

---

## 🔗 Related Guides

- **API Documentation:** See `API_GUIDE.md` for all endpoints
- **Database Schema:** See `database_schema.sql` for data structure
- **Project Status:** See `PROJECT_STATUS.md` for overall system status

---

## 🆘 Need Help?

- Backend running? Check: http://localhost:3000/api/health
- Frontend running? Check: http://localhost:4200
- Database connected? Check backend terminal logs
- Token valid? Try logging in again

---

**🎉 You're all set! Go create amazing projects!** 🚀

