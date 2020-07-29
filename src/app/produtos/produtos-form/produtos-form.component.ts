import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { ProdutosService } from './../produtos.service';
import { ModalsService } from './../../shared/modals.service';

@Component({
  selector: 'app-produtos-form',
  templateUrl: './produtos-form.component.html',
  styleUrls: ['./produtos-form.component.css']
})
export class ProdutosFormComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private service: ProdutosService,
    private modal: ModalsService,
    private location: Location
  ) { }

  ngOnInit(): void {
    const produto = this.route.snapshot.data['produto'];

    this.form = this.fb.group({
      id: [produto.Id],
      descricao: [produto.Descricao, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      grupo: [produto.Grupo],
      subGrupo: [produto.SubGrupo],
      peso: [produto.Peso, [Validators.required]],
      valorUnitario: [produto.ValorUnitario, [Validators.required]],
      comissao: [produto.Comissao, [Validators.required]],
      quantidade: [produto.Quantidade, [Validators.required]]
    });
  }

  onSubmit() {
    if(this.form.valid) {
      let msgSuccess = 'Produto criado com sucesso!';
      let msgErro = 'Erro ao criar produto, tente novamente.';

      if (this.form.value.id) {
        msgSuccess = 'Produto atualizado com sucesso!';
        msgErro = 'Erro ao atualizar produto, tente novamente.'
      }

      this.service.save(this.form.value).subscribe(
        success => {
          this.modal.showAlertSuccess(msgSuccess);
          this.location.back();
        },
        error => {
          this.modal.showAlertDanger(msgErro);
        }
      );
    }
  }

  onCancel() {
    this.location.back();
  }

  getCampo(campo: string) {
    return this.form.get(campo);
  }

}
