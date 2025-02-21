import { Component, inject } from '@angular/core';
import { SharedMaterialDesignModule } from '../../module/shared-material-design/shared-material-design.module';
import { StacksService } from '../../services/stacks-service/stacks.service';
import IStack from '../../models/stack';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-stacks-create',
  standalone: true,
  imports: [SharedMaterialDesignModule],
  templateUrl: './stacks-create.component.html',
  styleUrl: './stacks-create.component.css',
})
export class StacksCreateComponent {
  stacksService = inject(StacksService);
  stackName: string = '';
  description: string = '';
  published: boolean = false;

  constructor(private dialogRef: MatDialogRef<StacksCreateComponent>) {}

  createStack() {
    this.stacksService
      .createStack(this.stackName, this.description, this.published)
      .subscribe({
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
