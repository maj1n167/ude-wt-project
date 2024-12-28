import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { TrainingSessionComponent } from '../components/training-session/training-session.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'training', component: TrainingSessionComponent },
  { path: '**', redirectTo: '' },
];
