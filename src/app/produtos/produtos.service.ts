import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment';

import { CrudService } from './../shared/crud.service';

import { Produto } from './produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService extends CrudService<Produto> {

  constructor(
    protected http: HttpClient
  ) {
    super(http, `${environment.API}produtos`);
   }

}
