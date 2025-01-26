import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PostsCreateComponent } from '../../components/posts-create/posts-create.component';
import { ForumService } from '../../services/forum-service/forum.service';
import { AuthService } from '../../services/auth-service/auth.service';
import { ConfirmComponent } from '../../components/confirm/confirm.component';
import { ISPost, ISReply } from '../../models/post.model';

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
    MatInputModule,
    MatButtonModule,
    PostsCreateComponent,
  ],
})
export class ForumComponent implements OnInit {
  posts: Array<ISPost> = [];
  filteredPosts: Array<ISPost> = [];
  newCommentContent: string = '';
  searchQuery: string = '';
  currentUser: string | null = null; // Initialize as null
  currentUserUsername: string | null = null; // Add currentUserUsername field
  loggedIn: boolean | null = null;

  constructor(
    private dialog: MatDialog,
    private forumService: ForumService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.checkAuthentication();
    if (this.loggedIn) {
      this.loadPosts();
    }
  }

  checkAuthentication(): void {
    // Check if the user is already logged in (e.g., from localStorage)
    const token = localStorage.getItem('authToken');
    if (token) {
      this.loggedIn = true;
      this.authService.getUser().subscribe((user) => {
        this.currentUser = user._id; // Use user._id for creator
        this.currentUserUsername = user.username; // Use user.username for username
      });
    } else {
      this.loggedIn = false;
      this.router.navigate(['/login']);
    }
  }

  loadPosts(): void {
    this.forumService.getPosts().subscribe({
      next: (PostList: Array<ISPost>) => {
        this.posts = PostList.sort(
          (a, b) =>
            new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime(),
        );
        this.filteredPosts = this.posts; // Initialize filteredPosts with all posts
      },
      error: (err: Error) => {
        console.error(err.message);
      },
    });
  }

  searchPosts(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredPosts = this.posts;
    } else {
      this.filteredPosts = this.posts.filter((post) =>
        post.content.toLowerCase().includes(this.searchQuery.toLowerCase()),
      );
    }
  }

  openCreatePostDialog(): void {
    const dialogRef = this.dialog.open(PostsCreateComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.forumService.createPost(result).subscribe((response) => {
          const post = response.data; // Extract the post data from the response
          console.log('Created post:', post); // Debugging statement
          this.posts.unshift(post); // Add the new post to the beginning of the list
          this.filteredPosts = this.posts; // Update filteredPosts
          this.newCommentContent = ''; // Clear the new comment content
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
        next: () => {
          this.posts = this.posts.filter((post: ISPost) => post._id !== postId);
          this.filteredPosts = this.posts; // Update filteredPosts
        },
        error: (err: Error) => {
          console.error(err.message);
        },
      });
    });
  }

  onDeleteComment(postId: string, replyId: string | undefined): void {
    if (!replyId) {
      console.error('Reply ID is undefined');
      return;
    }

    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: { prompt: 'Are you sure you want to delete this comment?' },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (!result) {
        return;
      }

      this.forumService.deleteReply(postId, replyId).subscribe({
        next: () => {
          const post = this.posts.find((p) => p._id === postId);
          if (post) {
            this.removeReply(post.replies, replyId);
            this.filteredPosts = this.posts; // Update filteredPosts
          }
        },
        error: (err: Error) => {
          console.error(err.message);
        },
      });
    });
  }

  removeReply(replies: ISReply[], replyId: string): boolean {
    const index = replies.findIndex((reply) => reply._id === replyId);
    if (index !== -1) {
      replies.splice(index, 1);
      return true;
    }

    for (const reply of replies) {
      if (this.removeReply(reply.replies, replyId)) {
        return true;
      }
    }

    return false;
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

  toggleAnswerBox(
    event: Event,
    type: string,
    postId: string,
    replyId?: string,
  ) {
    const button = event.target as HTMLElement;
    let answerBox: HTMLElement | null;
    let threadView: HTMLElement | null = null;

    if (type === 'main-post') {
      // Main post answer box
      answerBox =
        button.closest('.post-item')?.querySelector('.main-post-answer-box') ||
        null;
      // Ensure comments are displayed
      threadView =
        button.closest('.post-item')?.querySelector('.thread-view') || null;
    } else {
      // Comment answer box
      answerBox = document.getElementById(`answer-box-${replyId}`);
    }

    if (answerBox && answerBox.classList.contains('hidden')) {
      answerBox.classList.remove('hidden');
      button.textContent = 'Hide Answer Box';
    } else if (answerBox) {
      answerBox.classList.add('hidden');
      button.textContent = 'Answer';
    }

    if (threadView && threadView.classList.contains('hidden')) {
      threadView.classList.remove('hidden');
    }
  }

  addNewComment(postId: string, parentReply?: ISReply): void {
    if (!this.newCommentContent.trim()) {
      // Do not add empty comments
      return;
    }

    const newReply: ISReply = {
      username: this.currentUserUsername || 'User', // Use the actual username
      content: this.newCommentContent,
      replies: [],
      creator: this.currentUser || 'User', // Ensure creator is set
    };

    this.forumService
      .addReply(postId, newReply, parentReply?._id)
      .subscribe((response) => {
        const reply = response.data; // Extract the reply data from the response
        const post = this.posts.find((p) => p._id === postId);
        if (post) {
          if (parentReply) {
            parentReply.replies = parentReply.replies || [];
            parentReply.replies.push(reply);
          } else {
            post.replies = post.replies || [];
            post.replies.push(reply);
          }
        }
        this.newCommentContent = '';
        this.filteredPosts = this.posts; // Update filteredPosts
        console.log('Added reply:', reply); // Debugging statement
      });
  }
}
