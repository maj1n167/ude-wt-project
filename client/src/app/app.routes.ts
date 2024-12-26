import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from '../pages/user-list/user-list.component';
import { RegisterComponent } from '../components/register/register.component';
import { LoginComponent } from '../components/login/login.component';
import { TodoListComponent } from '../pages/todo-list/todo-list.component';

export const routes: Routes = [
  { path: '', component: UserListComponent }, // Startseite
  { path: 'register', component: RegisterComponent }, // Registrierungsseite
  { path: 'login', component: LoginComponent }, // Login-Seite
  { path: 'users/:userId', component: TodoListComponent }, // Route für Benutzer und Todos
  { path: '**', redirectTo: '' }, // Fallback auf Startseite für unbekannte Routen
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
