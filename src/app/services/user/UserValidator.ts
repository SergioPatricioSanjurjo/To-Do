import { AbstractControl, ValidationErrors, AsyncValidatorFn, AsyncValidator, FormGroup, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, map, catchError, switchMap } from 'rxjs/operators';
import { UserService } from './user.service';

export function usernameAvailabilityValidator(userService: UserService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const username = control.value;

    // Si el campo está vacío, no hay necesidad de verificar
    if (!username) {
      return of(null);
    }

    return of(username).pipe(
      debounceTime(300),
      switchMap((value) =>
        userService.checkUsernameAvailability(value)
          ? of(null)  // El usuario está disponible
          : of({ usernameTaken: true })  // El usuario ya existe
      ),
      catchError(() => of(null))  // Manejar errores, por ejemplo, si la solicitud al servidor falla
    );
  };
}
  
export class UsernameValidator implements AsyncValidator {
    constructor(private userService: UserService) {}
  
    validate(
      control: AbstractControl
    ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
      return usernameAvailabilityValidator(this.userService)(control);
    }
  }

export const usernameAvailabilityValidatorProvider = {
    provide: NG_ASYNC_VALIDATORS,
    useExisting: UsernameValidator,
    multi: true,
};