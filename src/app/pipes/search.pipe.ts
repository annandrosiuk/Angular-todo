import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../models/todo';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(tasks: Todo[], request: string = ''): Todo[] {
    if (!request.trim()) {
      return tasks;
    }

    return tasks.filter(
      (item) =>
        item.todoDescription
          .trim()
          .toLowerCase()
          .indexOf(request.trim().toLowerCase()) !== -1
    );
  }
}
