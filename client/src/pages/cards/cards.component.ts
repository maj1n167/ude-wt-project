// imports
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForOf, NgIf } from '@angular/common';

// services
import { StacksService } from '../../services/stacks-service/stacks.service';
import { CardsService } from '../../services/cards-service/cards.service';

// models
import ICard from '../../models/card';
import { SharedMaterialDesignModule } from '../../module/shared-material-design/shared-material-design.module';
import { MatDialog } from '@angular/material/dialog';
import { CardsCreateComponent } from '../../components/cards-create/cards-create.component';
import { CardsUpdateComponent } from '../../components/cards-update/cards-update.component';
import IStack from '../../models/stack';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [NgForOf, NgIf, SharedMaterialDesignModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css',
})
export class CardsComponent implements OnInit {
  cards: Array<ICard> = [];
  stack: IStack | null = null;
  router = inject(Router);
  dialog = inject(MatDialog);
  activatedRoute = inject(ActivatedRoute);
  cardsService = inject(CardsService);
  stacksService = inject(StacksService);

  ngOnInit(): void {
    this.loadCards();
  }

  loadCards() {
    this.stacksService
      .getStack(this.activatedRoute.snapshot.params['stackId'])
      .subscribe({
        next: (stack) => {
          this.stack = stack;
        },
        error: (err: Error) => {
          console.error(err.message);
        },
      });

    this.cardsService
      .getCards(this.activatedRoute.snapshot.params['stackId'])
      .subscribe({
        next: (cards: Array<ICard>) => {
          this.cards = cards;
        },
        error: (err: Error) => {
          console.error(err.message);
          this.onGoBack();
        },
      });
  }

  onAddCard() {
    const dialogRef = this.dialog.open(CardsCreateComponent, {
      data: { stackId: this.activatedRoute.snapshot.params['stackId'] },
    });
    dialogRef.afterClosed().subscribe({
      next: (card: ICard) => {
        if (card) {
          this.cards.push(card);
        }
      },
      error: (err: Error) => {
        console.error(err.message);
      },
    });
  }

  onUpdateCard(card: ICard) {
    const dialogRef = this.dialog.open(CardsUpdateComponent, {
      data: { card },
    });

    dialogRef.afterClosed().subscribe({
      next: (card: ICard) => {
        if (card) {
          this.loadCards();
        }
      },
      error: (err: Error) => {
        console.error(err.message);
      },
    });
  }

  onDeleteCard(_id: string) {
    this.cardsService.deleteCard(_id).subscribe({
      next: (deletedCard: ICard) => {
        this.cards = this.cards.filter(
          (card: ICard) => card._id !== deletedCard._id,
        );
      },
      error: (err: Error) => {
        console.error(err.message);
      },
    });
  }

  onGoBack() {
    this.router.navigate(['stacks']);
  }
}
