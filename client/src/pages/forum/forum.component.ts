import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { PostsCreateComponent } from '../../components/posts-create/posts-create.component';
import { ForumService } from '../../services/forum-service/forum.service';
import { AuthService } from '../../services/auth-service/auth.service';
import { ConfirmComponent } from '../../components/confirm/confirm.component';

interface Post {
  id: string;
  username: string;
  content: string;
  date: string;
  replies: Reply[];
}

interface Reply {
  username: string;
  content: string;
  replies?: Reply[];
}

@Component({
  selector: 'app-forum',
  standalone: true,
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatIconModule,
    PostsCreateComponent,
  ],
})
export class ForumComponent implements OnInit {
  posts: Post[] = [];
  newCommentContent: string = '';
  currentUser: string | null = localStorage.getItem('username'); // Ensure 'username' is stored in localStorage

  constructor(
    private dialog: MatDialog,
    private forumService: ForumService,
  ) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.forumService.getPosts().subscribe((response) => {
      console.log('Fetched posts response:', response); // Debugging statement
      this.posts = Array.isArray(response.data) ? response.data : [];
      console.log('Assigned posts:', this.posts); // Debugging statement
    });
  }

  openCreatePostDialog(): void {
    const dialogRef = this.dialog.open(PostsCreateComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.forumService.createPost(result).subscribe((post) => {
          console.log('Created post:', post); // Debugging statement
          this.posts.push(post);
        });
      }
    });
  }

  onDeletePost(postId: string): void {
    if (!postId) {
      console.error('Post ID is undefined');
      return;
    }

    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: { prompt: 'Are you sure you want to delete this post?' },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (!result) {
        return;
      }

      this.forumService.deletePost(postId).subscribe({
        next: (deletedPost: Post) => {
          this.posts = this.posts.filter(
            (post: Post) => post.id !== deletedPost.id,
          );
        },
        error: (err: Error) => {
          console.error(err.message);
        },
      });
    });
  }

  toggleComments(event: Event) {
    const button = event.target as HTMLElement;
    const threadView = button.parentElement?.querySelector(
      '.thread-view',
    ) as HTMLElement;

    if (threadView) {
      if (threadView.classList.contains('hidden')) {
        threadView.classList.remove('hidden');
        button.textContent = 'Hide';
      } else {
        threadView.classList.add('hidden');
        button.textContent = 'Comments';
      }
    }
  }

  toggleAnswerBox(event: Event, type: string) {
    const button = event.target as HTMLElement;
    let answerBox: HTMLElement | null;

    if (type === 'main-post') {
      // Main post answer box
      answerBox =
        button.closest('.post-item')?.querySelector('.main-post-answer-box') ||
        null;
    } else {
      // Comment answer box
      answerBox =
        button.closest('.reply')?.querySelector('.answer-box') || null;
    }

    if (answerBox && answerBox.classList.contains('hidden')) {
      answerBox.classList.remove('hidden');
      button.textContent = 'Hide Answer Box';
    } else if (answerBox) {
      answerBox.classList.add('hidden');
      button.textContent = 'Answer';
    }
  }

  addNewComment(postId: string, parentReply?: Reply): void {
    if (!this.newCommentContent.trim()) {
      return;
    }

    if (!postId) {
      console.error('Post ID is undefined');
      return;
    }

    const newReply: Reply = {
      username: this.currentUser || 'User', // Replace with actual username
      content: this.newCommentContent,
      replies: [],
    };

    this.forumService.addReply(postId, newReply).subscribe((reply) => {
      const post = this.posts.find((p) => p.id === postId);
      if (post) {
        if (parentReply) {
          parentReply.replies?.push(reply);
        } else {
          post.replies.push(reply);
        }
      }
      this.newCommentContent = '';
    });
  }
}
