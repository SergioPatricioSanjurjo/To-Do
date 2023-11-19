import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { Iuser } from 'src/app/interfaces/Iuser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  title: string = '...';
  private logUser?: Iuser;

  constructor(private userService:UserService) {}

  ngOnInit(): void {
    this.showTitle()
  }

  showTitle() {
    const token = localStorage.getItem('token')
    if (token) {
      this.userService.getOneUser(+token).subscribe(
        user => {
          this.title = user.user;
        }
      )
    }
    if (!token) {
      this.title = '.X.'
    }
  }



}
