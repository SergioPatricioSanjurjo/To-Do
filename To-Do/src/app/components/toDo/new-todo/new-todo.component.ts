import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ItoDo } from 'src/app/interfaces/ItoDo';
import { ToDoService } from 'src/app/services/toDo/to-do.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.css']
})
export class NewTodoComponent {

  task: ItoDo | undefined;

  formulario:FormGroup = this.formBuilder.group({
    //user:['', [Validators.required]],
    priority:['', [Validators.required]],
    activity:['', [Validators.required]],
    info:['', [Validators.required]],
    id: 0
  })

  constructor(private formBuilder: FormBuilder, private toDoService: ToDoService, private route: ActivatedRoute, private router: Router, private userService: UserService) { }


  agregarTask(){
    if (this.formulario.invalid) return;

    //const currentUserValue = this.userService.currentUser?.user;

    const task: ItoDo = {
      user: this.userService.currentUser?.user,
      priority: this.formulario.controls['priority'].value,
      task: this.formulario.controls['activity'].value,
      details: this.formulario.controls['info'].value,
      id: this.formulario.controls['id'].value
    }
    this.toDoService.postToDo(task).subscribe(
      {
        next: () =>{
          this.router.navigate(['/userHome'])
        },
        error: (err) =>{
          console.log(err);
        }
      }
    )
  }

}
