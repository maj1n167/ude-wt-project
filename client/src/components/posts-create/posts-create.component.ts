import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SharedMaterialDesignModule } from '../../module/shared-material-design/shared-material-design.module';

@Component({
  selector: 'app-posts-create',
  standalone: true,
  imports: [FormsModule, SharedMaterialDesignModule],
  templateUrl: './posts-create.component.html',
  styleUrls: ['./posts-create.component.css'],
})
export class PostsCreateComponent {
  newPostContent: string = '';
  newPostUsername: string = localStorage.getItem('username') || 'FAKE'; // Ensure 'username' is stored in localStorage

  constructor(private dialogRef: MatDialogRef<PostsCreateComponent>) {}

  createPost(): void {
    if (this.newPostContent.trim()) {
      console.log('Creating post with username:', this.newPostUsername); // Debugging statement
      this.dialogRef.close({
        username: this.newPostUsername,
        content: this.newPostContent,
      });
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
