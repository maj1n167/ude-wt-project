import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SharedMaterialDesignModule } from '../../module/shared-material-design/shared-material-design.module';
import { AuthService } from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-posts-create',
  standalone: true,
  imports: [FormsModule, SharedMaterialDesignModule],
  templateUrl: './posts-create.component.html',
  styleUrls: ['./posts-create.component.css'],
})
export class PostsCreateComponent {
  newPostContent: string = '';
  newPostUsername: string = '';
  newPostCreator: string = ''; // Add newPostCreator field

  constructor(
    private dialogRef: MatDialogRef<PostsCreateComponent>,
    private authService: AuthService,
  ) {
    this.authService.getUser().subscribe((user) => {
      this.newPostUsername = user.username;
      this.newPostCreator = user._id; // Set the creator field
    });
  }

  createPost(): void {
    if (this.newPostContent.trim()) {
      console.log('Creating post with username:', this.newPostUsername); // Debugging statement
      this.dialogRef.close({
        username: this.newPostUsername,
        content: this.newPostContent,
        creator: this.newPostCreator, // Include the creator field
      });
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
