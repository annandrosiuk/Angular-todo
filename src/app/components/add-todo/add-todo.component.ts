import { Component, OnInit } from '@angular/core';
import { TodosService } from '../../services/todos.service'
import { Todo } from 'src/app/models/todo';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {
  form: FormGroup
  minDate: Date;
  current = new Date();
  followingDay = +(new Date(this.current.getTime() + 86400000));
  isAdd: boolean = true

  todo: Todo = {
    author: '',
    completed: false,
    dateOfCreate: Date.now(),
    deadline: this.followingDay,
    todoDescription: ''
  }

  constructor(private todoService: TodosService) {
    this.minDate = new Date();
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', [
        Validators.minLength(2),
        Validators.required
      ]),
      todo: new FormControl('', [
        Validators.required
      ]),
      deadline: new FormControl('', [
        Validators.required
      ]),
    });
  }

  isFieldValid(field: string) {
    return (!this.form.get(field).valid && this.form.get(field).touched);
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = { ...this.form.value };
    }

    if (this.todo.author != '' && this.todo.todoDescription != '') {
      this.todoService.addTodo(this.todo)
    }

    this.form.controls['name'].setValue('')
    this.form.controls['todo'].setValue('')
    this.form.controls['deadline'].setValue('')
    this.form.controls['name'].setErrors(null);
    this.form.controls['todo'].setErrors(null);
    this.form.controls['deadline'].setErrors(null);
  }
}
