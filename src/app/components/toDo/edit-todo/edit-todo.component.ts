import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ItoDo } from 'src/app/interfaces/ItoDo';
import { Iuser } from 'src/app/interfaces/Iuser';
import { ToDoService } from 'src/app/services/toDo/to-do.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.css']
})
export class EditTodoComponent implements OnInit{

  task: ItoDo | undefined;

  formulario:FormGroup = this.formBuilder.group({
    //user:['', [Validators.required]],
    priority:['', [Validators.required]],
    activity:['', [Validators.required]],
    info:['', [Validators.required]],
    date:['', [Validators.required]],
    id: 0
  })

  constructor(  private formBuilder: FormBuilder, 
                private toDoService: ToDoService, 
                private route: ActivatedRoute, 
                private router: Router, 
                private userService: UserService
                ) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm(){
    this.route.params.subscribe (async param=>{
      const id = param['id']
      if (id){
        this.toDoService.getToDo(id).subscribe(
          {
            next: (td)=>{
              if(td){
               this.formulario = this.formBuilder.group({
                _id: [id],
                priority: [td.priority],
                activity: [td.task],
                info: [td.details],
                date:[td.date]
                })
              }
            },
            error: (err)=>{
              console.log(err);
            }
          }
        )
      }
    })
  }

  /*get getUser():Iuser | undefined{
    return this.userService.currentUser;
  }*/

  editarTask(){
    if (this.formulario.invalid) return;

    //const currentUserValue = this.userService.currentUser?.user;

    const task: ItoDo = {
      user: this.userService.currentUser?.user,
      priority: this.formulario.controls['priority'].value,
      task: this.formulario.controls['activity'].value,
      details: this.formulario.controls['info'].value,
      date: this.formulario.controls['date'].value
    }
    this.toDoService.putTodo(task, this.formulario.controls['_id'].value).subscribe(
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
