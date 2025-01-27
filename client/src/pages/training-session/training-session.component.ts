import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { TrainingSessionService } from '../../services/training-session-service/training-session.service';
import { ActivatedRoute, Router } from '@angular/router';
import ICard from '../../models/card';
import { SharedMaterialDesignModule } from '../../module/shared-material-design/shared-material-design.module';
import { StacksService } from '../../services/stacks-service/stacks.service';
import { ConfirmComponent } from '../../components/confirm/confirm.component';
import IStack from '../../models/stack';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-training-session',
  standalone: true,
  imports: [CardComponent, SharedMaterialDesignModule],
  templateUrl: './training-session.component.html',
  styleUrl: './training-session.component.css',
})
export class TrainingSessionComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  dialog = inject(MatDialog);
  @ViewChild(CardComponent) cardComponent!: CardComponent;
  private results: { [key: string]: number } = {};
  cards: ICard[] = [];
  protected counter: number = 0;
  front: string = '';
  back: string = '';
  flipped: boolean = true;
  flippedOnce: boolean = false;
  title: string = '';
  creator: string = '';

  constructor(
    private trainingSessionService: TrainingSessionService,
    private stacksService: StacksService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.stacksService
      .getStack(this.activatedRoute.snapshot.params['stackId'])
      .subscribe((stack) => {
        this.title = stack.name;
        this.creator = stack.creator.username;
      });

    this.trainingSessionService
      .start(this.activatedRoute.snapshot.params['stackId'])
      .subscribe((cards: ICard[]) => {
        this.cards = cards;
        this.front = this.cards[this.counter].front;
        this.back = this.cards[this.counter].back;
      });
  }

  onChildButtonClick(flippedChild: boolean) {
    this.flipped = !flippedChild;
    if (!this.flippedOnce) {
      this.flippedOnce = true;
    }
  }

  rating(type: number) {
    if (this.cardComponent.isFlipped) {
      this.cardComponent.flipCard();
    }

    this.flippedOnce = false;

    this.results[this.cards[this.counter]._id] = type;

    if (this.counter < this.cards.length - 1) {
      this.counter++;
      this.front = this.cards[this.counter].front;
      this.back = this.cards[this.counter].back;
    } else {
      this.endTraining();
    }
  }

  abortTraining() {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        prompt:
          'Are you sure you want to stop training? Your current state will be evaluated.',
      },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (!result) {
        return;
      }
      this.endTraining();
    });
  }

  endTraining() {
    this.trainingSessionService.finish(this.results).subscribe(() => {
      this.router.navigate(['']);
    });
  }
}
