import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaskDirective } from './directive/mask.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [MaskDirective],
  exports: [MaskDirective]
})
export class SharedModule {}
