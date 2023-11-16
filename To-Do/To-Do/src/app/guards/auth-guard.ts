import { inject } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { Router} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Iuser } from '../interfaces/Iuser';

function checkAuthStatus(): boolean | Observable<boolean>{
    const userService = inject(UserService);
    const  router = inject(Router);
    const user:Iuser | undefined = userService.currentUser

    return userService.checkStatusAutenticacion()
                    .pipe(
                        tap( isAuth => {
                            if(!isAuth) router.navigate(['/login'])
                        })
                    )
}

export const AuthGuard = () => {
    return checkAuthStatus()
}
