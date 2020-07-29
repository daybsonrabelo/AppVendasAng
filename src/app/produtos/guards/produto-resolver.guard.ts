import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Produto } from './../produto';
import { ProdutosService } from './../produtos.service';

@Injectable({
    providedIn: 'root'
  })
export class ProdutoResolverGuard implements Resolve<Produto> {
    
    constructor(
      private service: ProdutosService
    ) {}
  
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Produto> {
      if (route.params && route.params['id']) {
          return this.service.loadById(route.params['id']);
      }
  
      return of({
        Id: null,
        Descricao: null,
        Grupo: null,
        SubGrupo: null,
        Peso: null,
        ValorUnitario: null,
        Comissao: null,
        Quantidade: null
      });
    }
    
  }