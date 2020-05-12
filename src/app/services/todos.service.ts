import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Todo } from '../models/todo'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })

export class TodosService {
  todoCollection: AngularFirestoreCollection<Todo>
  todos: Observable<Todo[]>
  todoDoc: AngularFirestoreDocument<Todo>

  constructor(public afs: AngularFirestore) {
    this.todoCollection = this.afs.collection('todos')
    this.todos = this.todoCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Todo
          data.id = a.payload.doc.id
          return data
        })
      })
    )
  }

  getOneTodo(todo: Todo): Observable<Todo> {
    return this.afs.doc(`todos/${todo.id}`).valueChanges()
  }

  getTodos() {
    return this.todos
  }

  addTodo(todo: Todo) {
    this.todoCollection.add(todo)
  }

  deleteTodo(todo: Todo) {
    this.todoDoc = this.afs.doc(`todos/${todo.id}`)
    this.todoDoc.delete()
  }

  updateTodo(todo: Todo) {
    this.todoDoc = this.afs.doc(`todos/${todo.id}`)
    this.todoDoc.update(todo)
  }
}
