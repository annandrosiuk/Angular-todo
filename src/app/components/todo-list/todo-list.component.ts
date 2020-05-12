import { Component, OnInit } from '@angular/core';
import { TodosService } from '../../services/todos.service'
import { Todo } from 'src/app/models/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  providers: []
})
export class TodoListComponent implements OnInit {
  todos: Todo[]
  editState: boolean = false
  todoToEdit: Todo
  filter: string
  sortVal: string = 'author'
  sortPriorVal: string = 'asc'
  searchText: any = '';
  minDate: Date;


  constructor(private todoService: TodosService) {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos
    })
    this.minDate = new Date();
  }

  ngOnInit(): void {
    this.filter = 'all'
  }

  deleteTodo(event, todo: Todo) {
    this.todoService.deleteTodo(todo)
  }

  editTodo(event, todo: Todo) {
    this.editState = true
    this.todoToEdit = todo
  }

  updateItem(todo: Todo) {
    this.todoService.updateTodo(todo)
    this.clearState()
  }

  clearState() {
    this.editState = false
    this.todoToEdit = null
  }

  doneEdit(todo: Todo) {
    this.todoService.updateTodo(todo)
  }

  checkAll() {
    this.todos.forEach(todo => {
      todo.completed = (<HTMLInputElement>event.target).checked
      this.todoService.updateTodo(todo)
    })
  }

  remaining() {
    return this.todos.filter(todo => !todo.completed).length
  }

  todosFiltered(): Todo[] {
    if (this.filter === 'all') {
      return this.todos
    } else if (this.filter === 'active') {
      return this.todos.filter(todo => !todo.completed)
    } else if (this.filter === 'completed') {
      return this.todos.filter(todo => todo.completed)
    }
    return this.todos
  }

  atLeastOneCompleted(): boolean {
    return this.todos.filter(todo => todo.completed).length > 0;
  }

  allCompleted(): boolean {
    return this.todos.filter(todo => !todo.completed).length == 0;
  }

  sortByCategories(event) {
    this.sortVal = (<HTMLInputElement>event.target).value
  }

  sortByPriority(event) {
    this.sortPriorVal = (<HTMLInputElement>event.target).value
  }
}


