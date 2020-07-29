import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { catchError, take, switchMap, tap } from 'rxjs/operators';
import { environment } from './../../../environments/environment';

import { ModalsService } from './../../shared/modals.service';

import { Produto } from './../produto';
import { ProdutosService } from './../produtos.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-produtos-lista',
  templateUrl: './produtos-lista.component.html',
  styleUrls: ['./produtos-lista.component.css']
})
export class ProdutosListaComponent implements OnInit {

  produtos$: Observable<Produto[]>;

  constructor(
    private prodService: ProdutosService,
    private modalService: ModalsService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.onRefresh();
  }

  onRefresh() {
    //console.log('callAPI');
    //this.http.get("https://localhost:44323/api/produtos").subscribe(res => console.log(res));
    this.http.get(`${environment.API}produtos`).subscribe(res => console.log(res));

    this.produtos$ = this.prodService.list()
    .pipe(
      catchError(error => {
        this.handleError();
        return EMPTY;
      })
    );
  }

  handleError() {
    this.modalService.showAlertDanger("Erro ao carregar produtos. Tente novamente.");
  }

  onEdit(id: number) {
    this.router.navigate(['editar', id], { relativeTo: this.route });
  }

  onDelete(produto: Produto) {
    console.log(produto.Id);
    const result$ = this.modalService.showConfirm('Confirmar', 'Tem certeza que deseja deletar?');
    result$.asObservable()
      .pipe(
        take(1),
        switchMap(result => result ? this.prodService.remove(produto.Id) : EMPTY)
      )
      .subscribe(
        success => {
          this.onRefresh();
        },
        error => {
          this.modalService.showAlertDanger("Erro ao remover o curso. Tente novamente.");
        }
      );
  }

}
