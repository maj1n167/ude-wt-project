import { Component, inject, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForOf, NgIf} from "@angular/common";
import { NzModalService } from 'ng-zorro-antd/modal';

import IStack from '../../models/stack';
import { StacksService } from '../../services/stacks-service/stacks.service';


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
        this.stacksService.getAllStacks().subscribe({
        next: (stackList: Array<IStack>) => {
            this.stacks = stackList;
        },
        error: (err: Error) => {
            console.error(err.message);
        }
        });
    }

    onAddStack() {
        this.stacksService.createStack('New Stack').subscribe({
            next: (stack: IStack) => {
                this.stacks.push(stack);
            },
            error: (err: Error) => {
                console.error(err.message);
            }
        });
    }

    onDeleteStack(_id: string) {
        this.stacksService.deleteStack(_id).subscribe({
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
