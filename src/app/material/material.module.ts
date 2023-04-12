import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports:[
    MatSlideToggleModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatListModule
  ]
})
export class MaterialModule { }
