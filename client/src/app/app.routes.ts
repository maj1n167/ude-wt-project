import { Routes } from '@angular/router';
import { RegisterComponent } from '../components/register/register.component';
import { LoginComponent } from '../components/login/login.component';
import { HomeComponent } from '../components/home/home.component';

export const routes: Routes = [
  { path: 'register', component: RegisterComponent }, // Registrierungsseite
  { path: 'login', component: LoginComponent }, // Login-Seite
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '' },
];
