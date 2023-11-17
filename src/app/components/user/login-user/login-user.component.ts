import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent {

  constructor(private formsBuilder: FormBuilder,
              private router: Router,
              private userService: UserService
              ){}

  userForm:FormGroup = this.formsBuilder.group({
      user:['',Validators.required],
      pass:['',Validators.required],
  })

  userLogIn() {
    if(this.userForm.invalid) return;

    this.userService.logInCheck(
                        this.userForm.controls['user'].value,
                        this.userForm.controls['pass'].value
                      )
  }

  showPassword: boolean = false;

  toggleVisibility(){
    this.showPassword = !this.showPassword
  }
}
