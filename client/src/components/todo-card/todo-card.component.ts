// Angular modules
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

// Custom modules
import { SharedAntDesignModule } from '../../module/shared-ant-design/shared-ant-design.module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [CommonModule, FormsModule, SharedAntDesignModule],
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.css',
})
export default class TodoCardComponent {
  @Input() todoTitle: string = '';
  @Input() todoId: string = '';

  @Output() onDeleteTodo: EventEmitter<string> = new EventEmitter();
}
