import { CorreioResultado } from './model/correio-resultado';
import { take, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { PedidoCapa } from './model/pedido-capa';
import { CrudService } from './../shared/crud.service';

import { environment } from './../../environments/environment';

export enum TipoEntregaCorreios {
  PAC = '04510',
  SEDEX = '04014'
}

@Injectable({
  providedIn: 'root'
})
export class PedidosService extends CrudService<PedidoCapa> {

  constructor(
    protected http: HttpClient
  ) {
    super(http, `${environment.API}pedidocapas`);
  }

  getFrete(tipoEntrega: TipoEntregaCorreios, cepOrigem: string, cepDestino: string, peso: number, comprimento: number, altura: number, largura: number) {
    let params = new HttpParams();
    params = params.append('tipoEntrega', tipoEntrega);
    params = params.append('cepOrigem', cepOrigem);
    params = params.append('cepDestino', cepDestino);
    params = params.append('peso', peso.toString());
    params = params.append('comprimento', comprimento.toString());
    params = params.append('altura', altura.toString());
    params = params.append('largura', largura.toString());
    
    const url = `${environment.API}correios`;
    return this.http.get<CorreioResultado>(url, { params: params });
    
  }
}
