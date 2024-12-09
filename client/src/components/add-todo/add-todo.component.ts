// Angular modules
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Custom modules
import { SharedAntDesignModule } from '../../module/shared-ant-design/shared-ant-design.module';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [FormsModule, SharedAntDesignModule],
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.css',
})
export default class AddTodoComponent {
  @Input() todoText: string = '';

  @Output() onAddTodo: EventEmitter<string> = new EventEmitter();

  handleAddTodo() {
    this.onAddTodo.emit(this.todoText);
    this.todoText = '';
  }
}
