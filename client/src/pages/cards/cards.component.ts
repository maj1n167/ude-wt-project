// imports
import { Component, inject, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForOf, NgIf} from "@angular/common";

// services
import {StacksService} from '../../services/stacks-service/stacks.service';
import {CardsService} from '../../services/cards-service/cards.service';

// models
import IStack from '../../models/stack';
import ICard from '../../models/card';
import {SharedMaterialDesignModule} from '../../module/shared-material-design/shared-material-design.module';


@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    SharedMaterialDesignModule
  ],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent implements OnInit {
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
      this.cardsService.createCard(this.stack._id, front, back).subscribe({
        next: (card: ICard) => {
          this.cards.push(card);
        },
        error: (err: Error) => {
          console.error(err.message);
        }
      });
    }
  }

  onUpdateCard(cardId: string, front: string, back: string) {
    let card = this.cards.find((card) => card._id === cardId);
    if (card) {
      this.cardsService.updateCard(card._id, front, back).subscribe({
        next: (updatedCard: ICard) => {
          card = updatedCard;
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
