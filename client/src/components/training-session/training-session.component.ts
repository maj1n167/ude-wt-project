import { Component } from '@angular/core';
import {CardComponent} from '../card/card.component';

@Component({
  selector: 'app-training-session',
  standalone: true,
  imports: [
    CardComponent
  ],
  templateUrl: './training-session.component.html',
  styleUrl: './training-session.component.css'
})
export class TrainingSessionComponent {

}
