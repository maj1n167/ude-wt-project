// imports
import { Component, inject, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForOf, NgIf} from "@angular/common";
import {Observable} from 'rxjs';

// services
import {StacksService} from '../stacks.service';
import {CardsService} from '../cards.service';

// models
import IStack from '../../models/stack';
import ICard from '../../models/card';


@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent {
  stack: IStack | null = null;
  cards: Array<ICard> = [];
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  stacksService = inject(StacksService);
  cardsService = inject(CardsService);

  ngOnInit(): void {
    this.stacksService.getStack(this.activatedRoute.snapshot.params['stackId']).subscribe({
      next: (stack: IStack) => {
        this.stack = stack;
      },
      error: (err: Error) => {
        this.onGoBack();
      }
    });

    this.cardsService.getCards(this.activatedRoute.snapshot.params['stackId']).subscribe({
      next: (cards: Array<ICard>) => {
        this.cards = cards;
      },
      error: (err: Error) => {
        console.error(err.message);
      }
    });
  }
  onAddCard() {
  //onAddCard(front: string, back: string) {
    if (this.stack !== null) {
      const front = 'Front';
      const back = 'Back';
      this.cardsService.createCard(this.stack.name, front, back).subscribe({
        next: (card: ICard) => {
          this.cards.push(card);
        },
        error: (err: Error) => {
          console.error(err.message);
        }
      });
    }
  }

  onDeleteCard(_id: string) {
    this.cardsService.deleteCard(_id).subscribe({
      next: (deletedCard: ICard) => {
        this.cards = this.cards.filter(
          (card: ICard) => card._id !== deletedCard._id
        );
      },
      error: (err: Error) => {
        console.error(err.message);
      }
    });
  }

  onGoBack() {
    this.router.navigate(['stacks']);
  }

}
