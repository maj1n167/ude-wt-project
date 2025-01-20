import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';

const materialDesignComponents = [
  // add Angular Modules here
  MatGridListModule,
  MatDividerModule,
  MatIconModule,
  MatAutocompleteModule,
  MatButtonModule,
  MatDialogModule,
  MatInputModule,
  MatFormFieldModule,
  MatCheckboxModule,
  FormsModule,
];

@NgModule({
  declarations: [],
  imports: materialDesignComponents,
  exports: materialDesignComponents,
})
export class SharedMaterialDesignModule {}
