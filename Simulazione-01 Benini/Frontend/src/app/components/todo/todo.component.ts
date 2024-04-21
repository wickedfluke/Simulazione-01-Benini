import { Component, Input } from '@angular/core';
import { Todo } from '../../entities/todo.entity';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  @Input() todo!: Todo;

  constructor(private todoService: TodoService) { }

  toggleCompletion(): void {

    if (!this.todo || !this.todo.id) {
      console.error('Todo ID not defined');
      return;
    }

    if (this.todo.completed) {
      this.markAsNotChecked();
    } else {
      this.markAsChecked();
    }
  }

  private markAsChecked(): void {
    if (!this.todo || !this.todo.id) {
      console.error('Todo ID not defined');
      return;
    }
    this.todoService.markAsChecked(this.todo.id).subscribe(
      (updatedTodo: Todo) => {
        this.todo.completed = true;
      },
      (error) => {
        console.error('Error during the operation:', error);
      }
    );
  }

  private markAsNotChecked(): void {
    if (!this.todo || !this.todo.id) {
      console.error('Todo ID not defined');
      return;
    }
    this.todoService.markAsNotChecked(this.todo.id).subscribe(
      (updatedTodo: Todo) => {
        this.todo.completed = false;
      },
      (error) => {
        console.error('Error during the operation:', error);
      }
    );
  }
}