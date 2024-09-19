import { Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';


export const HomeRoutes: Routes = [
    { path: 'home',      component: HomeComponent },
    { path: 'register',       component: RegisterComponent },
    { path: 'login',          component: LoginComponent },
];
