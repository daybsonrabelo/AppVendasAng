import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ModalsService } from './../../shared/modals.service';

import { PedidosService } from './../pedidos.service';
import { PedidoCapa } from '../model/pedido-capa';

@Component({
  selector: 'app-pedidos-lista',
  templateUrl: './pedidos-lista.component.html',
  styleUrls: ['./pedidos-lista.component.css']
})
export class PedidosListaComponent implements OnInit {

  pedidos$: Observable<PedidoCapa[]>;

  constructor(
    private pedService: PedidosService,
    private modalService: ModalsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.onRefresh();
  }

  onRefresh() {
    this.pedidos$ = this.pedService.list()
    .pipe(
      catchError(error => {
        this.handleError();
        return EMPTY;
      })
    );
  }

  handleError() {
    this.modalService.showAlertDanger("Erro ao carregar pedidos. Tente novamente.");
  }

  onEdit(id: number) {
    this.router.navigate(['editar', id], { relativeTo: this.route });
  }

}
