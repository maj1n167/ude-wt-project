import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() frontContent: string = 'Front of the card';
  @Input() backContent: string = 'Back of the card';
  @Output() buttonClicked = new EventEmitter<boolean>();
  isFlipped: boolean = false;

  flipCard() {
    this.isFlipped = !this.isFlipped;
    this.buttonClicked.emit(this.isFlipped);
  }
}
