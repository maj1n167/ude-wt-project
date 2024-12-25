// Angular modules
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Custom modules
import { SharedAntDesignModule } from '../../module/shared-ant-design/shared-ant-design.module';

// Interfaces
import ITodo from '../../models/todo';

// Components
import AddTodoComponent from '../../components/add-todo/add-todo.component';
import TodoCardComponent from '../../components/todo-card/todo-card.component';

// Services
import { UserService } from '../../services/user-service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from '../../services/todo-service/todo.service';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SharedAntDesignModule,
    AddTodoComponent,
    TodoCardComponent,
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent implements OnInit {
  todos: Array<ITodo> = [];
  addTodoText: string = '';
  errorMessage: string = '';
  userId: string = '';

  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  modal = inject(NzModalService);
  userService = inject(UserService);
  todoService = inject(TodoService);

  ngOnInit(): void {
    let userId: string | null =
      this.activatedRoute.snapshot.paramMap.get('userId');
    if (userId) {
      this.userId = userId;
      this.todoService.requestUserTodos(userId).subscribe({
        next: (todoList: Array<ITodo>) => {
          this.todos = todoList;
        },
        error: (err: Error) => {
          this.errorMessage = err.message;
        },
      });
    }
  }

  onDeleteTodo(todoId: string): void {
    this.todoService.requestDeleteTodo(this.userId, todoId).subscribe({
      next: (deletedTodo: ITodo) => {
        this.todos = this.todos.filter(
          (todo: ITodo) => todo._id !== deletedTodo._id,
        );
      },
    });
  }

  onDeleteConfirm(todoId: string) {
    this.modal.confirm({
      nzTitle: 'Delete this todo?',
      nzOkText: 'Confirm',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.onDeleteTodo(todoId),
      nzCancelText: 'Cancel',
    });
  }

  onAddTodo(title: string): void {
    this.todoService.requestCreateTodo(this.userId, title).subscribe({
      next: (newTodo: ITodo) => {
        this.todos.push(newTodo);
        this.addTodoText = '';
      },
      error: (err: Error) => {
        this.errorMessage = err.message;
      },
    });
  }

  goBack(): void {
    this.router.navigate(['..']);
  }
}
