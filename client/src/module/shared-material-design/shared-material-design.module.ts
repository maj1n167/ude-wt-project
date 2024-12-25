import { NgModule } from '@angular/core';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';



const materialDesignComponents = [
  // add Angular Modules here
    MatDividerModule,
    MatIconModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
];


@NgModule({
  declarations: [],
  imports: materialDesignComponents,
  exports: materialDesignComponents,
})
export class SharedMaterialDesignModule {}
