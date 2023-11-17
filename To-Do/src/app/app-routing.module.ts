import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NewUserPageComponent } from './pages/new-user-page/new-user-page.component';
import { UserHomePageComponent } from './pages/user-home-page/user-home-page.component';
import { LoginGuard } from './guards/login-guard';
import { AuthGuard } from './guards/auth-guard';
import { CurrencyPageComponent } from './pages/currency-page/currency-page.component';

const routes: Routes = [
  {path:'home', component:HomePageComponent},
  {path:'newUser', component:NewUserPageComponent},
  {path:'currency', component:CurrencyPageComponent},
  {path:'login', component:LoginPageComponent, canActivate:[LoginGuard]},
  {path:'userHome', component:UserHomePageComponent, canActivate:[AuthGuard]},
  {path:'**', redirectTo:'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
