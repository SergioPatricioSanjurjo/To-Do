import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { NewUserComponent } from './components/user/new-user/new-user.component';
import { HttpClientModule } from '@angular/common/http';
import { NewUserPageComponent } from './pages/new-user-page/new-user-page.component';
import { LoginUserComponent } from './components/user/login-user/login-user.component';
import { UserHomePageComponent } from './pages/user-home-page/user-home-page.component';
import { LoggedNavbarComponent } from './components/shared/logged-navbar/logged-navbar.component';
import { NewTodoComponent } from './components/toDo/new-todo/new-todo.component';
import { EditTodoComponent } from './components/toDo/edit-todo/edit-todo.component';
import { ListTodoComponent } from './components/toDo/list-todo/list-todo.component';
import { EditTaskPageComponent } from './pages/edit-task-page/edit-task-page.component';
import { NewTaskPageComponent } from './pages/new-task-page/new-task-page.component';
import { DolarComponent } from './components/exchange/dolar/dolar.component';
import { CurrencyPageComponent } from './pages/currency-page/currency-page.component';
import { CurrencyComponent } from './components/exchange/currency/currency.component';
import { CalendarComponent } from './components/toDo/calendar/calendar.component';
import { CalendarPageComponent } from './pages/calendar-page/calendar-page.component';
import { FullCalendarModule } from '@fullcalendar/angular';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginPageComponent,
    FooterComponent,
    HeaderComponent,
    NavbarComponent,
    HeroComponent,
    NewUserComponent,
    NewUserPageComponent,
    LoginUserComponent,
    UserHomePageComponent,
    LoggedNavbarComponent,
    NewTodoComponent,
    EditTodoComponent,
    ListTodoComponent,
    EditTaskPageComponent,
    NewTaskPageComponent,
    DolarComponent,
    CurrencyPageComponent,
    CurrencyComponent,
    CalendarComponent,
    CalendarPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CanvasJSAngularChartsModule,
    FullCalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
