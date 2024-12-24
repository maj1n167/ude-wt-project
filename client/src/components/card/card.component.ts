import { Component , Input} from '@angular/core';

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

  isFlipped: boolean = false;

  flipCard() {
    this.isFlipped = !this.isFlipped;
  }
}
