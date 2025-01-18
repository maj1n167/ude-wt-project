import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForOf, NgIf } from '@angular/common';

import IStack from '../../models/stack';
import { AuthService } from '../../services/auth-service/auth.service';
import { StacksService } from '../../services/stacks-service/stacks.service';
import { SharedMaterialDesignModule } from '../../module/shared-material-design/shared-material-design.module';
import { MatDialog } from '@angular/material/dialog';
import { StacksCreateComponent } from '../../components/stacks-create/stacks-create.component';
import { StacksUpdateComponent } from '../../components/stacks-update/stacks-update.component';
import {
  MatMenu,
  MatMenuContent,
  MatMenuItem,
  MatMenuTrigger,
} from '@angular/material/menu';
import { ConfirmComponent } from '../../components/confirm/confirm.component';

@Component({
  selector: 'app-stacks',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    SharedMaterialDesignModule,
    MatMenuItem,
    MatMenu,
    MatMenuTrigger,
    MatMenuContent,
  ],
  templateUrl: './stacks.component.html',
  styleUrl: './stacks.component.css',
})
export class StacksComponent implements OnInit {
  stacks: Array<IStack> = [];
  router = inject(Router);
  stacksService = inject(StacksService);
  dialog = inject(MatDialog);
  loggedIn: boolean | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.loggedIn$.subscribe((status) => {
      this.loggedIn = status;
    });
    this.loadStacks();
  }

  loadStacks() {
    this.stacksService.getAllStacks().subscribe({
      next: (stackList: Array<IStack>) => {
        this.stacks = stackList;
      },
      error: (err: Error) => {
        console.error(err.message);
      },
    });
  }

  onAddStack() {
    const dialogRef = this.dialog.open(StacksCreateComponent);
    dialogRef.afterClosed().subscribe({
      next: (stack: IStack) => {
        if (stack) {
          this.stacks.push(stack);
        }
      },
      error: (err: Error) => {
        console.error(err.message);
      },
    });
  }

  onUpdateStack(_id: string) {
    const stack = this.stacks.find((s: IStack) => s._id === _id);
    const dialogRef = this.dialog.open(StacksUpdateComponent, {
      data: { stack },
    });

    dialogRef.afterClosed().subscribe({
      next: (stack: IStack) => {
        if (stack) {
          this.loadStacks();
        }
      },
      error: (err: Error) => {
        console.error(err.message);
      },
    });
  }

  onDeleteStack(_id: string) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: { prompt: 'Are you sure you want to delete this stack?' },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (!result) {
        return;
      }

      this.stacksService.deleteStack(_id).subscribe({
        next: (deletedStack: IStack) => {
          this.stacks = this.stacks.filter(
            (stack: IStack) => stack._id !== deletedStack._id,
          );
        },
        error: (err: Error) => {
          console.error(err.message);
        },
      });
    });
  }

  goToCards(_id: string) {
    this.router.navigate(['cards', _id]);
  }

  access(stack: IStack) {
    return stack.creator == localStorage.getItem('user');
  }
}
