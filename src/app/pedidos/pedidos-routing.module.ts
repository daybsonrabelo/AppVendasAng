import { PedidosListaComponent } from './pedidos-lista/pedidos-lista.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PedidosFormComponent } from './pedidos-form/pedidos-form.component';


const routes: Routes = [
    { path: '', component: PedidosListaComponent },
    { 
      path: 'novo', 
      component: PedidosFormComponent
    }
    // { 
    //   path: 'editar/:id', 
    //   component: ProdutosFormComponent, 
    //   resolve: {
    //     produto: ProdutoResolverGuard
    //   }
    // }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class PedidosRoutingModule { }
  