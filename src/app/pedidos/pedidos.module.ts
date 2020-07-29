import { ReactiveFormsModule } from '@angular/forms';
import { PedidosRoutingModule } from './pedidos-routing.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { PedidosListaComponent } from './pedidos-lista/pedidos-lista.component';
import { PedidosFormComponent } from './pedidos-form/pedidos-form.component';


@NgModule({
  declarations: [PedidosListaComponent, PedidosFormComponent],
  imports: [
    CommonModule,
    PedidosRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class PedidosModule { }
