import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NewUserPageComponent } from './pages/new-user-page/new-user-page.component';
import { UserHomePageComponent } from './pages/user-home-page/user-home-page.component';
import { LoginGuard } from './guards/login-guard';
import { AuthGuard } from './guards/auth-guard';
import { EditTodoComponent } from './components/toDo/edit-todo/edit-todo.component';
import { NewTaskPageComponent } from './pages/new-task-page/new-task-page.component';
import { CurrencyPageComponent } from './pages/currency-page/currency-page.component';

const routes: Routes = [
  {path:'home', component:HomePageComponent, canActivate:[LoginGuard]},
  {path:'newUser', component:NewUserPageComponent, canActivate:[LoginGuard]},
  {path:'login', component:LoginPageComponent, canActivate:[LoginGuard]},
  {path:'userHome', component:UserHomePageComponent, canActivate:[AuthGuard]},
  {path:'newTask', component:NewTaskPageComponent, canActivate:[AuthGuard]},
  {path:'editTask/:id', component:EditTodoComponent, canActivate:[AuthGuard]},
  {path:'currency', component:CurrencyPageComponent, canActivate:[AuthGuard]},
  {path:'**', redirectTo:'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
