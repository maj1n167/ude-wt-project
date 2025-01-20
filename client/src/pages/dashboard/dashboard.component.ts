import { Component, inject, OnInit } from '@angular/core';
import { SharedMaterialDesignModule } from '../../module/shared-material-design/shared-material-design.module';
import { StacksComponent } from '../stacks/stacks.component';
import { AuthService } from '../../services/auth-service/auth.service';
import IUser from '../../models/user';
import { TrainingSessionService } from '../../services/training-session-service/training-session.service';
import { Router } from '@angular/router';
import { KeyValuePipe, NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    SharedMaterialDesignModule,
    StacksComponent,
    KeyValuePipe,
    NgForOf,
    NgIf,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  router = inject(Router);
  authService = inject(AuthService);
  trainingService = inject(TrainingSessionService);
  public user: IUser | undefined;
  trainings: { [key: string]: { name: string; progress: string } } = {};

  async ngOnInit() {
    this.authService.getUser().subscribe((data) => {
      this.user = data;
    });

    this.trainingService.status().subscribe((data: any) => {
      this.trainings = data;
      console.log(this.trainings);
    });
  }

  onTrain(id: unknown) {
    if (typeof id === 'string') {
      this.router.navigate(['training', id]);
    }
  }

  protected readonly Object = Object;
}
