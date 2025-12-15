import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from './services/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CompanyListComponent } from './components/company-list/company-list.component';
import { CompanyFormComponent } from './components/company-form/company-form.component';
import { PlanComponent } from './components/plan/plan.component';
import { ProjectComponent } from './components/project/project.component';
import { ProfileComponent } from './components/profile/profile.component';
import { InvestmentComponent } from './components/investment/investment.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },

    // Public routes
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    
    // Protected routes - require authentication
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'companies', component: CompanyListComponent, canActivate: [AuthGuard] },
    { path: 'add-company', component: CompanyFormComponent, canActivate: [AuthGuard] },
    { path: 'plans', component: PlanComponent, canActivate: [AuthGuard] },
    { path: 'projects', component: ProjectComponent, canActivate: [AuthGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'investments', component: InvestmentComponent, canActivate: [AuthGuard] },
];
