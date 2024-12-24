import { Component , Input} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() frontContent: string = 'Front of the card';
  @Input() backContent: string = 'Back of the card';
  @Input() isFlipped: boolean =false;

  flipCard() {
    this.isFlipped = !this.isFlipped;
  }
}
