import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ProdutosRoutingModule } from './produtos-routing.module';

import { ProdutosListaComponent } from './produtos-lista/produtos-lista.component';
import { ProdutosFormComponent } from './produtos-form/produtos-form.component';

import { SharedModule } from './../shared/shared.module';

@NgModule({
  declarations: [
    ProdutosListaComponent,
    ProdutosFormComponent
  ],
  imports: [
    CommonModule,
    ProdutosRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ProdutosModule { }
