import { Routes } from '@angular/router';
import { StacksComponent } from './stacks/stacks.component';
import { CardsComponent } from './cards/cards.component';
import { ForumComponent } from './forum/forum.component';
import { TrainingSessionComponent } from './training-session/training-session.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

export const pagesRoutes: Routes = [
  { path: 'stacks', component: StacksComponent },
  { path: 'cards/:stackId', component: CardsComponent },
  { path: 'forum', component: ForumComponent },
  { path: 'training/:stackId', component: TrainingSessionComponent },
  { path: 'register', component: RegisterComponent }, // Registrierungsseite
  { path: 'login', component: LoginComponent }, // Login-Seite
];
