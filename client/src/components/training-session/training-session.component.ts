import {Component, OnInit, ViewChild} from '@angular/core';
import {CardComponent} from '../card/card.component';
import {Flashcard} from '../../models/flashcard.model';
import {FlashcardService} from '../../services/flashcard-service/flashcard.service';
import {delay} from 'rxjs';

@Component({
  selector: 'app-training-session',
  standalone: true,
  imports: [
    CardComponent
  ],
  templateUrl: './training-session.component.html',
  styleUrl: './training-session.component.css'
})
export class TrainingSessionComponent implements OnInit{

  flashcards: Flashcard[] = [];
  frontcard: string = ""
  backcard: string = ""
  counter : number = 0
  current: number = 1
  desklength: number = 0


  @ViewChild(CardComponent) cardComponent!: CardComponent;

    constructor(private flashcardservice: FlashcardService) {
  }

// rating if rated go to next Card and place rate into DB object

  ngOnInit(): void {
    this.flashcards= this.flashcardservice.getFlashcards();
    this.desklength = this.flashcards.length
    this.frontcard = this.flashcards[0].front
    this.backcard = this.flashcards[0].back
  }


  rating(type:number) {
    switch (type) {
      case 1:
        //todo
        break;
      case 2:
        //todo
        break;
      case 3:
        //todo
        break
    }
    if(this.counter < this.desklength-1){
      this.counter++
      this.current++
      this.cardComponent.flipCard()
      this.frontcard = this.flashcards[this.counter].front
      this.backcard = this.flashcards[this.counter].back
    } else {
      console.log("training ended")
    }
  }
}
