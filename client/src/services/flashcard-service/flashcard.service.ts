// src/app/services/flashcard.service.ts

import { Injectable } from '@angular/core';
import { Flashcard} from '../../models/flashcard.model';

@Injectable({
  providedIn: 'root'
})
export class FlashcardService {

  // Mock data array of flashcards
  private flashcards: Flashcard[] = [
    {
      id: 1,
      front: 'What is the capital of France?',
      back: 'Paris'
    },
    {
      id: 2,
      front: 'What is the smallest prime number?',
      back: '2'
    },
    {
      id: 3,
      front: 'Who wrote "Romeo and Juliet"?',
      back: 'William Shakespeare'
    },
    {
      id: 4,
      front: 'What is the chemical symbol for water?',
      back: 'H₂O'
    },
    {
      id: 5,
      front: 'What planet is known as the Red Planet?',
      back: 'Mars'
    },
    {
      id: 6,
      front: 'What is the largest mammal in the world?',
      back: 'Blue Whale'
    },
    {
      id: 7,
      front: 'What language is primarily spoken in Brazil?',
      back: 'Portuguese'
    },
    {
      id: 8,
      front: 'What is the square root of 64?',
      back: '8'
    },
    {
      id: 9,
      front: 'Who painted the Mona Lisa?',
      back: 'Leonardo da Vinci'
    },
    {
      id: 10,
      front: 'What is the hardest natural substance on Earth?',
      back: 'Diamond'
    }
    // Add more flashcards as needed
  ];

  constructor() { }

  // Method to retrieve all flashcards
  getFlashcards(): Flashcard[] {
    return this.flashcards;
  }

  // Method to retrieve a flashcard by ID
  getFlashcardById(id: number): Flashcard | undefined {
    return this.flashcards.find(card => card.id === id);
  }

  // Method to add a new flashcard
  addFlashcard(card: Flashcard): void {
    this.flashcards.push(card);
  }

  // Method to update an existing flashcard
  updateFlashcard(updatedCard: Flashcard): void {
    const index = this.flashcards.findIndex(card => card.id === updatedCard.id);
    if (index !== -1) {
      this.flashcards[index] = updatedCard;
    }
  }

  // Method to delete a flashcard
  deleteFlashcard(id: number): void {
    this.flashcards = this.flashcards.filter(card => card.id !== id);
  }
}
