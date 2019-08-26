import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProdutoComponent } from './produto/produto.component';
import { VendaComponent } from './venda/venda.component';
import { VendedorComponent } from './vendedor/vendedor.component';
import { VendasDoDiaComponent } from './vendas-do-dia/vendas-do-dia.component';

const routes: Routes = [
  { path: 'Produto', component: ProdutoComponent},
  { path: 'Vendedor', component: VendedorComponent},
  { path: 'Venda', component: VendaComponent },
  { path: 'VendasDoDia', component: VendasDoDiaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
