import { Component, inject, OnInit } from '@angular/core';
import { SharedMaterialDesignModule } from '../../module/shared-material-design/shared-material-design.module';
import { StacksComponent } from '../stacks/stacks.component';
import { AuthService } from '../../services/auth-service/auth.service';
import IUser from '../../models/user';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SharedMaterialDesignModule, StacksComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  authService = inject(AuthService);
  public user: IUser | undefined;

  async ngOnInit() {
    this.authService.getUser().subscribe((data) => {
      this.user = data;
    });
  }
}
