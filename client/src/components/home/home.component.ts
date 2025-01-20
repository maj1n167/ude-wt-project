import { Component } from '@angular/core';
import { SharedMaterialDesignModule } from '../../module/shared-material-design/shared-material-design.module';
import { AuthService } from '../../services/auth-service/auth.service';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedMaterialDesignModule, DashboardComponent, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  loggedIn = false;

  constructor(private authService: AuthService) {
    this.authService.loggedIn$.subscribe((status) => {
      this.loggedIn = status;
    });
  }
}
