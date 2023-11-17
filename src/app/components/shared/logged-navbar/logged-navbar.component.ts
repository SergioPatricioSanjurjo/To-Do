import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { Iuser } from 'src/app/interfaces/Iuser';


@Component({
  selector: 'app-logged-navbar',
  templateUrl: './logged-navbar.component.html',
  styleUrls: ['./logged-navbar.component.css']
})
export class LoggedNavbarComponent {


  constructor(private userService: UserService, 
              private router: Router
              ){ }

  get getUser():Iuser | undefined{
    return this.userService.currentUser;
  }
  onLogOut(){
    this.userService.logout();
    this.router.navigate(['home'])
  }



}
