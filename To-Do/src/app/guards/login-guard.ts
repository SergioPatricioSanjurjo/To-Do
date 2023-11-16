import { inject } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { Router} from '@angular/router';
import { Observable, map, tap } from 'rxjs';

function checkAuthStatus(): boolean | Observable<boolean>{
    const userService = inject(UserService);
    const  router = inject(Router);
    return userService.checkStatusAutenticacion()
                    .pipe(
                        tap( isAuth => {
                            if(isAuth){
                                router.navigate(['/private'])
                            }
                        }),
                        map(isAuth => !isAuth)
                    )
}

export const LoginGuard = () => {
    return checkAuthStatus()
}
