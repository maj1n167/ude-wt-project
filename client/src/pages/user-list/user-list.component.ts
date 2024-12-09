import { FormsModule } from '@angular/forms';
// Angular modules
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Custom modules
import { SharedAntDesignModule } from '../../module/shared-ant-design/shared-ant-design.module';

// Interfaces
import IUser from '../../models/user';

// Services
import { UserService } from '../../services/user-service/user.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [FormsModule, CommonModule, SharedAntDesignModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit {
  users: Array<IUser> = [];
  name: string = '';

  userService = inject(UserService);
  message = inject(NzMessageService);
  modal = inject(NzModalService);
  router = inject(Router);

  ngOnInit(): void {
    this.userService.requestAllUsers().subscribe({
      next: (userList: Array<IUser>) => {
        this.users = userList;
      },
      error: (err: Error) => {
        console.error(err.message);
      },
    });
  }

  onCreateUser() {
    this.userService.requestCreateUser(this.name).subscribe({
      next: (newUser: IUser) => {
        this.users.push(newUser);
        this.name = '';
      },
      error: (err: Error) => {
        console.error(err.message);
      },
    });
  }

  onDeleteUser(userId: string) {
    this.userService.requestDeleteUser(userId).subscribe({
      next: (deletedUser: IUser) => {
        this.users = this.users.filter((user) => user._id !== deletedUser._id);
      },
      error: (err: Error) => {
        console.error(err.message);
      },
    });
  }

  onDeleteConfirm(userId: string) {
    this.modal.confirm({
      nzTitle: 'Delete this user?',
      nzOkText: 'Confirm',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.onDeleteUser(userId),
      nzCancelText: 'Cancel',
    });
  }

  onNavigateToUserTodo(routerName: string) {
    this.router.navigate([routerName]);
  }
}
