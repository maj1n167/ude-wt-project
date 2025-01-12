import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedMaterialDesignModule } from '../../module/shared-material-design/shared-material-design.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [FormsModule, SharedMaterialDesignModule],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.css',
})
export class ConfirmComponent implements OnInit {
  prompt: string = '';

  constructor(
    private dialogRef: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit() {
    this.prompt = this.data.prompt;
  }

  confirm() {
    this.dialogRef.close(true);
  }

  close() {
    this.dialogRef.close(false);
  }
}
