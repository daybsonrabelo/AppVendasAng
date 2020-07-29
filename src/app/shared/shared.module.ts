import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ErrorMsgComponent } from './error-msg/error-msg.component';
import { CurrencyFormatPipe } from './pipes/currency-format.pipe';


@NgModule({
  declarations: [
    AlertModalComponent, 
    ConfirmModalComponent, 
    ErrorMsgComponent, 
    CurrencyFormatPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AlertModalComponent, 
    ConfirmModalComponent,
    ErrorMsgComponent,
    CurrencyFormatPipe
  ]
})
export class SharedModule { }
