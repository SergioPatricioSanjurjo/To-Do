import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Iuser } from 'src/app/interfaces/Iuser';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent {

  userForm:FormGroup = this.formsBulider.group({
    user:['',[Validators.required, Validators.minLength(5)]],
    pass:['',[Validators.required, Validators.minLength(5)]],
    id: 0
  })

  constructor(private userService: UserService,
              private formsBulider: FormBuilder    
              ) {}

  saveUser(){
    if(this.userForm.invalid) return;

    const user: Iuser = {
      user: this.userForm.controls['user'].value,
      pass: this.userForm.controls['pass'].value,
      id: 0
    }
    this.userService.postUser(user)
    console.log(user);
  }

}
