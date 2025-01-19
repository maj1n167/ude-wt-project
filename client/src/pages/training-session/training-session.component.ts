import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { TrainingSessionService } from '../../services/training-session-service/training-session.service';
import { ActivatedRoute, Router } from '@angular/router';
import ICard from '../../models/card';
import { SharedMaterialDesignModule } from '../../module/shared-material-design/shared-material-design.module';

@Component({
  selector: 'app-training-session',
  standalone: true,
  imports: [CardComponent, SharedMaterialDesignModule],
  templateUrl: './training-session.component.html',
  styleUrl: './training-session.component.css',
})
export class TrainingSessionComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  @ViewChild(CardComponent) cardComponent!: CardComponent;
  private results: { [key: string]: number } = {};
  cards: ICard[] = [];
  protected counter: number = 0;
  front: string = '';
  back: string = '';
  flipped: boolean = true;

  constructor(
    private trainingSessionService: TrainingSessionService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.trainingSessionService
      .start(this.activatedRoute.snapshot.params['stackId'])
      .subscribe((cards: ICard[]) => {
        console.log(cards);
        this.cards = cards;
        this.front = this.cards[this.counter].front;
        this.back = this.cards[this.counter].back;
      });
  }

  onChildButtonClick(flippedChild: boolean) {
    this.flipped = !flippedChild;
  }

  rating(type: number) {
    if (this.cardComponent.isFlipped) {
      this.cardComponent.flipCard();
    }

    this.results[this.cards[this.counter]._id] = type;

    if (this.counter < this.cards.length - 1) {
      this.counter++;
      this.front = this.cards[this.counter].front;
      this.back = this.cards[this.counter].back;
    } else {
      console.log('training ended');
      this.endTraining();
    }
  }
  endTraining() {
    this.trainingSessionService.finish(this.results);
    this.router.navigate(['']);
  }
}
