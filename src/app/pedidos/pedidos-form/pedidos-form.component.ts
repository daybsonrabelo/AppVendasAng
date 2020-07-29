import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { switchMap, filter } from 'rxjs/operators';

import { CorreioResultado } from './../model/correio-resultado';
import { PedidoLinha } from './../model/pedido-linha';
import { PedidosService, TipoEntregaCorreios } from './../pedidos.service';
import { Produto } from './../../produtos/produto';
import { ProdutosService } from './../../produtos/produtos.service';

import { ModalsService } from './../../shared/modals.service';

@Component({
  selector: 'app-pedidos-form',
  templateUrl: './pedidos-form.component.html',
  styleUrls: ['./pedidos-form.component.css']
})
export class PedidosFormComponent implements OnInit {

  form: FormGroup;
  correioResultado: CorreioResultado;
  produtos: Produto[];
  produtoSelecionado: string = "";
  pedidoLinhas: PedidoLinha[] = [];
  quantidadeProdutos = 0;
  totalProdutos = 0;
  comissaoProdutos = 0;
  pesoProdutos = 0;
  fretePAC = '';
  freteSedex = '';
  contLinha = 0;

  constructor(
    private fb: FormBuilder,
    private prodService: ProdutosService,
    private modalService: ModalsService,
    private pedService: PedidosService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.prodService.list()
      .subscribe(p => {
        this.produtos = p
      });

    this.form = this.fb.group({
      id: [null],
      cliente: [null],
      cepOrigem: ['69895000'],
      cepDestino: [null],
      idProduto: [null, [Validators.required]],
      quantidade: [null, [Validators.required]],
      valorUnitario: [null, [Validators.required]],
      comissao: [null, [Validators.required]],
      peso: [null, [Validators.required]]
    });

    this.getCampo('idProduto').valueChanges
      .pipe(
        // tap(prod => console.log('Prod Selecionado: ', prod)),
        filter(prod => prod !== null),
        // tap(prod => console.log('Prod Selecionado: ', prod)),
        switchMap((prodId: number) => this.prodService.loadById(prodId)),
        //tap(console.log)
      )
      .subscribe(
        produto => produto ? this.populaProdutos(produto) : {}
      );
  }

  populaProdutos(produto: Produto) {
    //console.log(produto);
    this.form.patchValue({
      quantidade: produto.Quantidade,
      valorUnitario: produto.ValorUnitario.toString().replace('.', ','),
      comissao: produto.Comissao,
      peso: produto.Peso
    });
  }

  resetForm() {
    this.form.patchValue({
      idProduto: null,
      quantidade: null,
      valorUnitario: null,
      comissao: null,
      peso: null
    });
  }

  getCampo(campo: string) {
    return this.form.get(campo);
  }

  onInsert() {
    if(!this.form.valid) {
      this.modalService.showAlertDanger('Preencha o formulário de produto');
      return;
    }

    let tempProd = {} as PedidoLinha;
    let vlrTotal = +this.getCampo('valorUnitario').value.toString().replace(',', '.') * +this.getCampo('quantidade').value;
    let comTotal = +this.getCampo('comissao').value * +this.getCampo('quantidade').value;
    let pesoTotal = +this.getCampo('peso').value * +this.getCampo('quantidade').value;
    
    this.contLinha += 1;//simula um Id incremental para o pedido;

    tempProd.Id = this.contLinha;
    tempProd.IdCapa = 0;
    tempProd.IdProduto = +this.getCampo('idProduto').value;//o sinal de '+' é para fazer o casting de string para number
    tempProd.Quantidade = +this.getCampo('quantidade').value;
    tempProd.ValorUnitario = vlrTotal;
    tempProd.Comissao = comTotal;
    tempProd.Peso = pesoTotal;
    tempProd.Descricao = this.produtoSelecionado;

    this.pedidoLinhas.push(tempProd);

    this.calculaTotais();

    this.resetForm();
  }

  calculaTotais() {
    this.quantidadeProdutos = this.pedidoLinhas.map(item => item.Quantidade).reduce((prev, next) => prev + next);
    this.totalProdutos = this.pedidoLinhas.map(item => item.ValorUnitario).reduce((prev, next) => prev + next);
    this.comissaoProdutos = this.pedidoLinhas.map(item => item.Comissao).reduce((prev, next) => prev + next);
    this.pesoProdutos = Math.ceil(this.pedidoLinhas.map(item => item.Peso).reduce((prev, next) => prev + next) / 1000);
  }

  onChange(evento) {
    this.produtoSelecionado = evento.options[evento.options.selectedIndex].text;
  }

  onCalcularFrete() {
    let cepOrigem = this.getCampo('cepOrigem').value;
    let cepDestino = this.getCampo('cepDestino').value;
    let peso = this.pesoProdutos;

    if (!cepDestino) {
      this.modalService.showAlertDanger('Informa o CEP de destino!');
      return;
    }

    this.pedService.getFrete(TipoEntregaCorreios.PAC, cepOrigem, cepDestino, peso, 30, 30, 30).subscribe(
      data => {
        this.correioResultado = data;
        this.fretePAC = this.correioResultado.valorField;
      } 
    );
    
    this.pedService.getFrete(TipoEntregaCorreios.SEDEX, cepOrigem, cepDestino, peso, 30, 30, 30).subscribe(
      data => {
        this.correioResultado = data;
        this.freteSedex = this.correioResultado.valorField;
      } 
    );
  }

  onDelete(id: number) {
    for (let i = 0; i < this.pedidoLinhas.length; i++) {
      const element = this.pedidoLinhas[i];
      if (element.Id === id) {
        this.pedidoLinhas.splice(i, 1);
      }
    }
    this.calculaTotais();
  }

}
