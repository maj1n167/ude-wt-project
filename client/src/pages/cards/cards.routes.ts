import { Routes } from '@angular/router';
import { CardsComponent } from './cards.component';

export const cardsRoutes: Routes = [
  { path: 'cards/:stackId', component: CardsComponent },
];
