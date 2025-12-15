# 📄 ZFunds Pages & User Roles - Complete Mapping

**Last Updated:** November 29, 2025

---

## 🎭 User Roles in the System

### 1. **Investor** 👥
Can browse projects and make investments

### 2. **Entrepreneur** 💼
Can create companies and projects

### 3. **Admin** 🔐
Full access to all features

---

## 📊 Complete Page Overview

### **Total Pages: 7**
- 🟢 Public Pages: 2
- 🔒 Protected Pages: 5

---

## 🟢 PUBLIC PAGES (No Login Required)

### 1. **Login Page** (`/login`)
**File:** `pages/login/login.component.ts`

**Purpose:** User authentication

**Endpoints Used:**
- `POST /api/users/login` - Authenticate user

**Features:**
- Email/password login
- JWT token generation
- Redirects to appropriate page based on role

**Accessible By:** Everyone (not logged in)

---

### 2. **Register Page** (`/register`)
**File:** `pages/register/register.component.ts`

**Purpose:** New user registration

**Endpoints Used:**
- `POST /api/users` - Register new user

**Features:**
- User registration form
- Role selection (admin, investor, entrepreneur)
- Automatic login after registration

**Accessible By:** Everyone (not logged in)

---

## 🔒 PROTECTED PAGES (Login Required)

### 3. **Profile Page** (`/profile`)
**File:** `components/profile/profile.component.ts`

**Purpose:** View and manage user profile

**Endpoints Used:**
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `DELETE /api/users/:id` - Delete account
- `GET /api/companies/user/:userId` - Get user's companies (entrepreneur)
- `GET /api/projects/company/:company_id` - Get company projects (entrepreneur)
- `GET /api/investments/user/:userId` - Get user's investments (investor)

**Features:**
- View/edit user information
- Delete account
- **For Entrepreneurs:**
  - View owned companies
  - View company projects
- **For Investors:**
  - View investment history
  - Track invested projects
  - See funding progress

**Accessible By:** 
- ✅ **Admin** - Full profile management
- ✅ **Entrepreneur** - Profile + Companies + Projects
- ✅ **Investor** - Profile + Investment History

---

### 4. **Companies List Page** (`/companies`)
**File:** `components/company-list/company-list.component.ts`

**Purpose:** View companies and create projects

**Endpoints Used:**
- `GET /api/companies` - Get all companies
- `GET /api/projects` - Get all projects
- `GET /api/projects/company/:company_id` - Get projects by company
- `POST /api/projects` - Create new project
- `GET /api/plans` - Get available plans

**Features:**
- View all user's companies
- Toggle to view projects for each company
- **Create Project Form:**
  - Project title, category, description
  - Goal amount, start/end dates
  - Phone number
  - Plan selection
  - Payment processing
- Project status management
- Form validation

**Accessible By:**
- ✅ **Entrepreneur** - Full access (via navbar)
- ✅ **Admin** - Full access (via navbar)
- ⚠️ **Investor** - Not in navbar (but accessible via URL)

**Navbar Shows For:**
- Entrepreneur
- Admin

---

### 5. **Company Form Page** (`/add-company`)
**File:** `components/company-form/company-form.component.ts`

**Purpose:** Create new company

**Endpoints Used:**
- `POST /api/companies` - Create company

**Features:**
- Company registration form
- Fields: name, tax number, commercial register, industry
- Form validation
- Navigate back to company list

**Accessible By:**
- ✅ **Entrepreneur** - Create companies
- ✅ **Admin** - Create companies
- ❌ **Investor** - Should not create companies

**Navbar Shows For:**
- None (must navigate via company list or direct URL)

**Note:** Currently NOT in navbar menu!

---

### 6. **Projects Page** (`/projects`)
**File:** `components/project/project.component.ts`

**Purpose:** Browse projects and make investments

**Endpoints Used:**
- `GET /api/projects` - Get all projects
- `POST /api/investments` - Create investment
- `PATCH /api/projects/:id/raise` - Update project raised amount
- `DELETE /api/projects/:id` - Delete project (admin only)

**Features:**
- View all active projects
- Search by name and category
- **For Investors:**
  - View project details
  - Make investments
  - Payment form (card details)
  - Update project raised amount
- **For Admins:**
  - Delete projects
- Project cards show:
  - Title, category, description
  - Goal vs raised amount
  - Progress bar
  - Start/end dates
  - Status

**Accessible By:**
- ✅ **Investor** - Browse and invest (via navbar)
- ✅ **Admin** - View and delete (via navbar)
- ⚠️ **Entrepreneur** - Can view (via URL but not in navbar)

**Navbar Shows For:**
- Investor
- Admin

---

### 7. **Plans Page** (`/plans`)
**File:** `components/plan/plan.component.ts`

**Purpose:** View and manage subscription plans

**Endpoints Used:**
- `GET /api/plans` - Get all plans
- `GET /api/plans/:id` - Get plan by ID
- `POST /api/plans` - Create plan (admin only)
- `PUT /api/plans/:id` - Update plan (admin only)
- `DELETE /api/plans/:id` - Delete plan (admin only)
- `GET /api/companies` - Get user's companies
- `PUT /api/companies/:id` - Update company plan

**Features:**
- View all available plans
- **For Admins:**
  - Create new plans
  - Edit existing plans
  - Delete plans
- **For Entrepreneurs:**
  - Select plan for company
  - Subscribe to plan
  - Payment processing

**Accessible By:**
- ✅ **Admin** - Full management (via navbar)
- ✅ **Entrepreneur** - View and subscribe (via navbar)
- ⚠️ **Investor** - Can view (via URL but not in navbar)

**Navbar Shows For:**
- Admin
- Entrepreneur

---

## 🗺️ Navigation Map by User Role

### **When NOT Logged In:**
```
Navbar Shows:
- Login
- Register
```

### **When Logged in as INVESTOR:**
```
Navbar Shows:
- Projects       → Browse and invest
- Profile        → View investments & profile

Can Access (via URL):
- /companies     → View companies
- /plans         → View plans
- /add-company   → But shouldn't use
```

### **When Logged in as ENTREPRENEUR:**
```
Navbar Shows:
- Plans          → Subscribe to plans
- Companies      → View companies
- Profile        → View companies & projects

Can Access (via URL):
- /projects      → View projects (should be in navbar!)
- /add-company   → Create company (should be in navbar!)
```

### **When Logged in as ADMIN:**
```
Navbar Shows:
- Dashboard      → (Not implemented yet)
- Plans          → Manage plans
- Companies      → View all companies
- Projects       → Manage projects
- Profile        → User profile

Can Access:
- All pages with full permissions
```

---

## 📋 Endpoint Usage by Page

### **Profile Page**
| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/users/profile` | GET | Get profile |
| `/api/users/profile` | PUT | Update profile |
| `/api/users/:id` | DELETE | Delete account |
| `/api/companies/user/:userId` | GET | Get user companies |
| `/api/projects/company/:company_id` | GET | Get company projects |
| `/api/investments/user/:userId` | GET | Get user investments |

### **Companies List Page**
| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/companies` | GET | List companies |
| `/api/projects` | GET | List projects |
| `/api/projects/company/:company_id` | GET | Get company projects |
| `/api/projects` | POST | Create project |
| `/api/plans` | GET | Get plans |

### **Company Form Page**
| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/companies` | POST | Create company |

### **Projects Page**
| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/projects` | GET | List projects |
| `/api/investments` | POST | Create investment |
| `/api/projects/:id/raise` | PATCH | Update raised amount |
| `/api/projects/:id` | DELETE | Delete project (admin) |

### **Plans Page**
| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/plans` | GET | List plans |
| `/api/plans/:id` | GET | Get plan details |
| `/api/plans` | POST | Create plan (admin) |
| `/api/plans/:id` | PUT | Update plan (admin) |
| `/api/plans/:id` | DELETE | Delete plan (admin) |
| `/api/companies` | GET | Get companies |
| `/api/companies/:id` | PUT | Update company plan |

---

## 🎯 Role-Based Feature Matrix

| Feature | Investor | Entrepreneur | Admin |
|---------|----------|--------------|-------|
| **Authentication** |
| Register | ✅ | ✅ | ✅ |
| Login | ✅ | ✅ | ✅ |
| View Profile | ✅ | ✅ | ✅ |
| Update Profile | ✅ | ✅ | ✅ |
| Delete Account | ✅ | ✅ | ✅ |
| **Companies** |
| View All Companies | ⚠️ URL Only | ✅ Navbar | ✅ Navbar |
| Create Company | ❌ | ✅ | ✅ |
| Update Company | ❌ | ✅ Own | ✅ All |
| Delete Company | ❌ | ✅ Own | ✅ All |
| **Projects** |
| View All Projects | ✅ Navbar | ⚠️ URL Only | ✅ Navbar |
| Create Project | ❌ | ✅ | ✅ |
| Update Project | ❌ | ✅ Own | ✅ All |
| Delete Project | ❌ | ❌ | ✅ |
| **Investments** |
| Make Investment | ✅ | ❌ | ✅ |
| View Own Investments | ✅ | ❌ | ✅ All |
| View Investment History | ✅ | ❌ | ✅ |
| **Plans** |
| View Plans | ⚠️ URL Only | ✅ Navbar | ✅ Navbar |
| Subscribe to Plan | ❌ | ✅ | ✅ |
| Create Plan | ❌ | ❌ | ✅ |
| Update Plan | ❌ | ❌ | ✅ |
| Delete Plan | ❌ | ❌ | ✅ |
| **Payments** |
| Process Payment (Investment) | ✅ | ❌ | ✅ |
| Process Payment (Plan) | ❌ | ✅ | ✅ |
| View Payment History | ✅ Own | ✅ Own | ✅ All |

**Legend:**
- ✅ Full Access (shows in navbar or full feature)
- ⚠️ Limited Access (can access via URL but not in navbar)
- ❌ No Access

---

## 🚨 Missing from Navbar (But Exist)

### **For Entrepreneur:**
- ❌ `/add-company` - Should be accessible!
- ❌ `/projects` - Should be able to view their projects!

### **For Investor:**
- Everything needed is in navbar ✅

### **For Admin:**
- ❌ `/dashboard` - Route exists in navbar but component not created

---

## 🛠️ Recommended Improvements

### 1. **Add to Entrepreneur Navbar:**
```html
<li><a routerLink="/add-company">Create Company</a></li>
<li><a routerLink="/projects">Projects</a></li>
```

### 2. **Create Dashboard Page for Admin:**
```
- Total users, companies, projects
- Recent investments
- Revenue statistics
- User activity
```

### 3. **Add Route Guards:**
```typescript
{ 
  path: 'add-company', 
  component: CompanyFormComponent,
  canActivate: [AuthGuard],
  data: { roles: ['entrepreneur', 'admin'] }
}
```

### 4. **Create Missing Pages:**
- Investment History Page
- Payment History Page
- Company Details Page
- Project Details Page

---

## 📊 Current vs Ideal State

### **Current State:**
- ✅ 7 pages implemented
- ✅ All major CRUD operations work
- ⚠️ Some pages not in navbar
- ⚠️ No dashboard for admin
- ⚠️ No dedicated history pages

### **Ideal State:**
- ✅ All pages in appropriate navbars
- ✅ Dashboard for admin
- ✅ Dedicated history pages
- ✅ Route guards for role-based access
- ✅ Better user experience

---

## 🎯 Summary

**YES! You have pages for all major user roles:**

### **Investor:**
- ✅ Can browse projects
- ✅ Can invest in projects
- ✅ Can view investment history
- ✅ Has profile page

### **Entrepreneur:**
- ✅ Can create companies
- ✅ Can create projects
- ✅ Can subscribe to plans
- ✅ Can view owned companies/projects
- ⚠️ Some features not in navbar

### **Admin:**
- ✅ Can manage plans
- ✅ Can delete projects
- ✅ Can view everything
- ⚠️ Dashboard not created yet

**All core functionality is implemented and working! 🎉**

---

**Need to access a page?**
- Check the navbar for your role
- Or go directly via URL (e.g., http://localhost:4200/add-company)

