import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { PostsCreateComponent } from '../../components/posts-create/posts-create.component';

interface Post {
  id: number;
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
  imports: [CommonModule, FormsModule, MatDialogModule],
})
export class ForumComponent {
  posts: Post[] = [
    {
      id: 1,
      username: 'User1',
      content: 'Does anyone have more flashcards for webtech?',
      date: '12.12.2024',
      replies: [
        {
          username: 'User2',
          content: 'Here, I can give you a share link to my flashcards <link>.',
          replies: [],
        },
        {
          username: 'User3',
          content: 'Thanks!',
          replies: [],
        },
      ],
    },
  ];

  newCommentUsername: string = 'User'; // Default username, you can change this as needed
  newCommentContent: string = '';

  constructor(private dialog: MatDialog) {}

  selectedPost: Post | null = null;

  selectPost(post: Post) {
    this.selectedPost = post;
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

  addNewPost() {
    const dialogRef = this.dialog.open(PostsCreateComponent);
    dialogRef.afterClosed().subscribe((newPost: Post) => {
      if (newPost) {
        newPost.id = this.posts.length + 1;
        newPost.replies = []; // Initialize replies array for new post
        this.posts.push(newPost);
      }
    });
  }

  addNewComment(postId: number, parentReply?: Reply) {
    if (!this.newCommentContent.trim()) {
      // Do not add empty comments
      return;
    }

    const newReply: Reply = {
      username: this.newCommentUsername,
      content: this.newCommentContent,
      replies: [],
    };

    if (parentReply) {
      // Add reply to the parent comment
      parentReply.replies?.push(newReply);
    } else {
      // Add reply to the main post
      const post = this.posts.find((p) => p.id === postId);
      if (post) {
        post.replies.push(newReply);
      }
    }

    // Clear the form fields
    this.newCommentContent = '';
  }
}
