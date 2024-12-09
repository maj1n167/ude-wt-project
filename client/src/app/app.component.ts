// Angular modules
import { Component } from '@angular/core';

// Custom modules
import { SharedAntDesignModule } from '../module/shared-ant-design/shared-ant-design.module';

// Components
import { NavigationBarComponent } from '../components/navigation-bar/navigation-bar.component';
import { FooterComponent } from '../components/footer/footer.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    SharedAntDesignModule,
    NavigationBarComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
