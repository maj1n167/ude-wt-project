import {Component, Inject, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {SharedMaterialDesignModule} from '../../module/shared-material-design/shared-material-design.module';
import {CardsService} from '../../services/cards-service/cards.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import IStack from '../../models/stack';
import ICard from '../../models/card';


@Component({
  selector: 'app-cards-create',
  standalone: true,
  imports: [
    FormsModule,
    SharedMaterialDesignModule
  ],
  templateUrl: './cards-create.component.html',
  styleUrl: './cards-create.component.css'
})
export class CardsCreateComponent {
  cardsService = inject(CardsService);
  front: string = '';
  back: string = '';
  stackId: string = '';


  constructor(
    private dialogRef: MatDialogRef<CardsCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  createCard() {
    this.cardsService.createCard(this.data.stackId, this.front, this.back).subscribe({
      next: (card: ICard) => {
        this.dialogRef.close(card);
      },
      error: (err: Error) => {
        console.error(err.message);
      }
    })
  }

  close() {
    this.dialogRef.close();
  }
}
