import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from './services/storage.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [StorageService]
})
export class SharedModule { }
