import { Component, inject } from '@angular/core';
import { SharedMaterialDesignModule } from '../../module/shared-material-design/shared-material-design.module';
import { FormsModule } from '@angular/forms';
import { StacksService } from '../../services/stacks-service/stacks.service';
import IStack from '../../models/stack';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-stacks-create',
  standalone: true,
  imports: [FormsModule, SharedMaterialDesignModule],
  templateUrl: './stacks-create.component.html',
  styleUrl: './stacks-create.component.css',
})
export class StacksCreateComponent {
  stacksService = inject(StacksService);
  stackName: string = '';
  published: boolean = false;

  constructor(private dialogRef: MatDialogRef<StacksCreateComponent>) {}

  createStack() {
    this.stacksService.createStack(this.stackName, this.published).subscribe({
      next: (stack: IStack) => {
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
