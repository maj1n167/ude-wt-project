import {Component, Inject, inject, OnInit} from '@angular/core';
import {StacksService} from '../../services/stacks-service/stacks.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-stacks-update',
  standalone: true,
  imports: [],
  templateUrl: './stacks-update.component.html',
  styleUrl: './stacks-update.component.css'
})
export class StacksUpdateComponent implements OnInit {
  stacksService = inject(StacksService)
  stackName: string = "";

  constructor(
    private dialogRef: MatDialogRef<StacksUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.stackName = this.data.stack.stackName;
  }

  updateCard() {
    this.stacksService.updateStack(this.data.stackId, this.stackName).subscribe({
      next: (stack) => {
        this.dialogRef.close(stack);
      },
      error: (err: Error) => {
        console.error(err.message);
      }
    })
  }

}
