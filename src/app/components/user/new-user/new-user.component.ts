import { Component } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, catchError, debounceTime, map, of } from 'rxjs';
import { Iuser } from 'src/app/interfaces/Iuser';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent {

  userForm:FormGroup = this.formsBulider.group({
    user:['',[Validators.required, Validators.minLength(5)], [this.usernameAvailabilityValidator()]],
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

  private usernameAvailabilityValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const username = control.value;
  
      if (!username) {
        return of(null);
      }
  
      return this.userService.checkUsernameExists(username).pipe(
        debounceTime(300),
        map(usernameExists => (usernameExists ? { usernameTaken: true } : null)),
         catchError(() => of(null))
      );
    };
  }
}