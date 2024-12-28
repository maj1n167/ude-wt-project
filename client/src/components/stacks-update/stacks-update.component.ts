import { Component, Inject, inject, OnInit } from '@angular/core';
import { StacksService } from '../../services/stacks-service/stacks.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { SharedMaterialDesignModule } from '../../module/shared-material-design/shared-material-design.module';

@Component({
  selector: 'app-stacks-update',
  standalone: true,
  imports: [FormsModule, SharedMaterialDesignModule],
  templateUrl: './stacks-update.component.html',
  styleUrl: './stacks-update.component.css',
})
export class StacksUpdateComponent implements OnInit {
  stacksService = inject(StacksService);
  stackName: string = '';

  constructor(
    private dialogRef: MatDialogRef<StacksUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit() {
    this.stackName = this.data.stack.name;
  }

  updateStack() {
    this.stacksService
      .updateStack(this.data.stack._id, this.stackName)
      .subscribe({
        next: (stack) => {
          this.dialogRef.close(stack);
        },
        error: (err: Error) => {
          console.error(err.message);
        },
      });
  }

  close() {
    this.dialogRef.close();
  }
}
