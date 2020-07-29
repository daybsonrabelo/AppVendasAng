import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProdutoResolverGuard } from './guards/produto-resolver.guard';
import { ProdutosListaComponent } from './produtos-lista/produtos-lista.component';
import { ProdutosFormComponent } from './produtos-form/produtos-form.component';


const routes: Routes = [
    { path: '', component: ProdutosListaComponent },
    { 
      path: 'novo', 
      component: ProdutosFormComponent, 
      resolve: {
        produto: ProdutoResolverGuard
      }
    },
    { 
      path: 'editar/:id', 
      component: ProdutosFormComponent, 
      resolve: {
        produto: ProdutoResolverGuard
      }
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ProdutosRoutingModule { }
  