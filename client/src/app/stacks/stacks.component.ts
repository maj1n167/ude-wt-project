import { Component, inject, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';

import IStack from '../../models/stack';
import { StacksService } from '../stacks.service';
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-stacks',
  standalone: true,
    imports: [
        NgForOf,
        NgIf
    ],
  templateUrl: './stacks.component.html',
  styleUrl: './stacks.component.css'
})
export class StacksComponent implements OnInit {
    stacks: Array<IStack> = [];
    router = inject(Router);
    stacksService = inject(StacksService);
    // activatedRoute = inject(ActivatedRoute);
    // modal = inject(NzModalService);

    ngOnInit(): void {
        this.stacksService.requestAllStacks().subscribe({
        next: (stackList: Array<IStack>) => {
            this.stacks = stackList;
        },
        error: (err: Error) => {
            console.error(err.message);
        }
        });
    }

    onAddStack() {
        this.stacksService.requestCreateStack('New Stack').subscribe({
            next: (stack: IStack) => {
                this.stacks.push(stack);
            },
            error: (err: Error) => {
                console.error(err.message);
            }
        });
    }

    onDeleteStack(_id: string) {
        this.stacksService.requestDeleteStack(_id).subscribe({
            next: (deletedStack: IStack) => {
                this.stacks = this.stacks.filter(
                    (stack: IStack) => stack._id !== deletedStack._id
                );
            },
            error: (err: Error) => {
                console.error(err.message);
            }
        });
    }

  goToCards(_id: string) {
    this.router.navigate(['cards', _id]);
  }
}
