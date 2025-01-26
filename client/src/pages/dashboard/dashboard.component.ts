import { Component, inject, OnInit } from '@angular/core';
import { SharedMaterialDesignModule } from '../../module/shared-material-design/shared-material-design.module';
import { StacksComponent } from '../stacks/stacks.component';
import { AuthService } from '../../services/auth-service/auth.service';
import IUser from '../../models/user';
import { TrainingSessionService } from '../../services/training-session-service/training-session.service';
import { Router } from '@angular/router';
import { KeyValuePipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { ConfirmComponent } from '../../components/confirm/confirm.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    SharedMaterialDesignModule,
    StacksComponent,
    KeyValuePipe,
    NgForOf,
    NgIf,
    NgClass,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  router = inject(Router);
  dialog = inject(MatDialog);
  authService = inject(AuthService);
  trainingService = inject(TrainingSessionService);
  public user: IUser | undefined;
  trainings: {
    [key: string]: { name: string; creator: string; progress: string };
  } = {};

  async ngOnInit() {
    this.authService.getUser().subscribe((data) => {
      this.user = data;
    });

    this.updateTrainings();
  }

  updateTrainings() {
    this.trainingService.status().subscribe((data: any) => {
      this.trainings = data;
      console.log(this.trainings);
    });
  }

  onTrain(id: string) {
    this.router.navigate(['training', id]);
  }

  onDelete(id: string) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: { prompt: 'Are you sure you want to delete this training?' },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (!result) {
        return;
      }
      this.trainingService.delete(id).subscribe((data) => {
        console.log(data);
        this.updateTrainings();
      });
    });
  }

  onReset(id: string) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: { prompt: 'Are you sure you want to reset your progress?' },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (!result) {
        return;
      }
      this.trainingService.reset(id).subscribe((data) => {
        console.log(data);
        this.updateTrainings();
      });
    });
  }

  protected readonly Object = Object;
}
