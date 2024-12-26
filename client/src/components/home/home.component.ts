import { Component } from '@angular/core';
import { SharedMaterialDesignModule } from '../../module/shared-material-design/shared-material-design.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedMaterialDesignModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
