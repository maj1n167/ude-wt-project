import { Component, Inject, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CardsService } from '../../services/cards-service/cards.service';
import { SharedMaterialDesignModule } from '../../module/shared-material-design/shared-material-design.module';

@Component({
  selector: 'app-cards-update',
  standalone: true,
  imports: [SharedMaterialDesignModule],
  templateUrl: './cards-update.component.html',
  styleUrl: './cards-update.component.css',
})
export class CardsUpdateComponent implements OnInit {
  cardsService = inject(CardsService);
  front: string = '';
  back: string = '';

  constructor(
    private dialogRef: MatDialogRef<CardsUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit() {
    this.front = this.data.card.front;
    this.back = this.data.card.back;
  }

  updateCard() {
    this.cardsService
      .updateCard(this.data.stackId, this.data.card._id, this.front, this.back)
      .subscribe({
        next: (card) => {
          this.dialogRef.close(card);
        },
        error: (err: Error) => {
          console.error(err.message);
        },
      });
  }

  close() {
    this.dialogRef.close();
  }
}
