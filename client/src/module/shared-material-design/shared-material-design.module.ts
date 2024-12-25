import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

const materialDesignComponents = [
  // add Angular Modules here
  MatDividerModule,
  MatIconModule,
  MatAutocompleteModule,
  MatButtonModule,
  MatDialogModule,
];

@NgModule({
  declarations: [],
  imports: materialDesignComponents,
  exports: materialDesignComponents,
})
export class SharedMaterialDesignModule {}
