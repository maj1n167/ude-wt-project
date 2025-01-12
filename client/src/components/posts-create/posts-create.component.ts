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
  newPostUsername: string = 'User'; // Default username, you can change this as needed

  constructor(private dialogRef: MatDialogRef<PostsCreateComponent>) {}

  createPost() {
    const newPost = {
      content: this.newPostContent,
      username: this.newPostUsername,
      date: new Date().toLocaleDateString(),
    };
    this.dialogRef.close(newPost);
  }

  close() {
    this.dialogRef.close();
  }
}
