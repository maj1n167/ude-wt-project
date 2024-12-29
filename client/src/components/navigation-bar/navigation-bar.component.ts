// Angular modules
import { Component, inject } from '@angular/core';

// Custom modules
import { SharedAntDesignModule } from '../../module/shared-ant-design/shared-ant-design.module';
import { Router, RouterLink } from '@angular/router';
import { SharedMaterialDesignModule } from '../../module/shared-material-design/shared-material-design.module';
import { MatHeaderRow } from '@angular/material/table';
import { MatMenu, MatMenuItem } from '@angular/material/menu';
import { MatTabLabel, MatTabLink, MatTabNav } from '@angular/material/tabs';
import { NzMenuDirective, NzMenuItemComponent } from 'ng-zorro-antd/menu';
import { NzTypographyComponent } from 'ng-zorro-antd/typography';

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
  ],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css',
})
export class NavigationBarComponent {
  router = inject(Router);

  goStacks() {
    this.router.navigate(['/stacks']);
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
