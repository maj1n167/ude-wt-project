import { Component } from '@angular/core';
import {SharedMaterialDesignModule} from '../../module/shared-material-design/shared-material-design.module';

@Component({
  selector: 'app-stacks-create',
  standalone: true,
  imports: [
    SharedMaterialDesignModule
  ],
  templateUrl: './stacks-create.component.html',
  styleUrl: './stacks-create.component.css'
})
export class StacksCreateComponent {

}
