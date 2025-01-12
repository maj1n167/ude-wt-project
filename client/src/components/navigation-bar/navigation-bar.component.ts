// Angular modules
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { NgIf } from '@angular/common';
import { filter } from 'rxjs/operators';

// Custom modules
import { SharedAntDesignModule } from '../../module/shared-ant-design/shared-ant-design.module';
import { SharedMaterialDesignModule } from '../../module/shared-material-design/shared-material-design.module';
import { MatHeaderRow } from '@angular/material/table';
import { MatMenu, MatMenuItem } from '@angular/material/menu';
import { MatTabLabel, MatTabLink, MatTabNav } from '@angular/material/tabs';
import { NzMenuDirective, NzMenuItemComponent } from 'ng-zorro-antd/menu';
import { NzTypographyComponent } from 'ng-zorro-antd/typography';
import { AuthService } from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [
    SharedAntDesignModule,
    SharedMaterialDesignModule,
    MatHeaderRow,
    MatMenu,
    MatMenuItem,
    MatTabNav,
    MatTabLabel,
    MatTabLink,
    NzMenuDirective,
    NzMenuItemComponent,
    RouterLink,
    NzTypographyComponent,
    NgIf,
  ],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css',
})
export class NavigationBarComponent implements OnInit {
  router = inject(Router);
  loggedIn = false;
  activeRoute: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.loggedIn$.subscribe((status) => {
      this.loggedIn = status;
    });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const urlSegments = event.urlAfterRedirects.split('/').filter(Boolean); // Split and remove empty strings
        this.activeRoute = urlSegments[0] || ''; // Get the first segment
        console.log('active Route:', this.activeRoute);
      });
  }

  goStacks() {
    this.router.navigate(['/stacks']);
  }

  goHome() {
    this.router.navigate(['/']);
  }

  logout() {
    this.authService.logout();
    this.goHome();
  }
}
