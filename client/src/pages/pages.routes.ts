import { Routes } from '@angular/router';
import { StacksComponent } from './stacks/stacks.component';
import { CardsComponent } from './cards/cards.component';

export const pagesRoutes: Routes = [
  { path: 'stacks', component: StacksComponent },
  { path: 'cards/:stackId', component: CardsComponent },
];
