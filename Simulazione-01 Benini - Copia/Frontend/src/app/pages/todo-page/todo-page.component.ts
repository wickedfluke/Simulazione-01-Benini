
import { Component, OnInit } from '@angular/core';
import { Todo } from '../../entities/todo.entity';
import { TodoService } from '../../services/todo.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.css']
})
export class TodoPageComponent implements OnInit {
  todos: Todo[] = [];
  includeCompleted: boolean = false;
  newTodo: Todo = { title: '', dueDate: '', completed: false };

  constructor(private todoService: TodoService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.todoService.getTodos(this.includeCompleted).subscribe(
      (todos: Todo[]) => {
        this.todos = todos;
      },
      (error) => {
        console.error('Error during todos loading:', error);
      }
    );
  }

  toggleIncludeCompleted(event: any): void {
    this.includeCompleted = event.target.checked;
    this.loadTodos();
  }

openAddTodoModal(content: any): void {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      console.log(`Modal closed with result: ${result}`);
      
    }, (reason) => {
      console.log(`Modal dismissed with reason: ${reason}`);
    });
  }

  onSubmit(): void {
    
    this.todoService.addTodo(this.newTodo).subscribe(
      (todo: Todo) => {
        console.log('New todo added successfully:', todo);
        
        this.modalService.dismissAll(); 
        this.loadTodos(); 
        
        this.newTodo = { title: '', dueDate: '', completed: false };
      },
      (error) => {
        console.error('Error during todo posting:', error);
        
      }
    );
  }
}
