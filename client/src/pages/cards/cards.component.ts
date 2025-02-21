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
import {
  MatMenu,
  MatMenuContent,
  MatMenuItem,
  MatMenuTrigger,
} from '@angular/material/menu';
import { AuthService } from '../../services/auth-service/auth.service';
import { ConfirmComponent } from '../../components/confirm/confirm.component';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    SharedMaterialDesignModule,
    MatMenu,
    MatMenuContent,
    MatMenuItem,
    MatMenuTrigger,
  ],
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
  authService = inject(AuthService);
  loggedIn: boolean | null = null;
  protected access: boolean = false;

  ngOnInit(): void {
    this.authService.loggedIn$.subscribe((status) => {
      this.loggedIn = status;
    });
    this.loadCards();
  }

  loadCards() {
    this.stacksService
      .getStack(this.activatedRoute.snapshot.params['stackId'])
      .subscribe({
        next: (stack: IStack) => {
          this.stack = stack;
          this.access = this.stack.creator._id == localStorage.getItem('user');
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
      data: { stackId: this.activatedRoute.snapshot.params['stackId'], card },
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
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: { prompt: 'Are you sure you want to delete this card?' },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (!result) {
        return;
      }

      this.cardsService
        .deleteCard(this.activatedRoute.snapshot.params['stackId'], _id)
        .subscribe({
          next: (deletedCard: ICard) => {
            this.cards = this.cards.filter(
              (card: ICard) => card._id !== deletedCard._id,
            );
          },
          error: (err: Error) => {
            console.error(err.message);
          },
        });
    });
  }

  onGoBack() {
    this.router.navigate(['stacks']);
  }
}
