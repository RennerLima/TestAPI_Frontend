import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { 
  MatButtonModule, MatMenuModule, MatDatepickerModule, MatNativeDateModule,
  MatInputModule, MatTooltipModule, MatToolbarModule, MatCardModule,
  MatFormFieldModule, MatIconModule, MatSelectModule, MatFormFieldControl,
  MatSidenavModule,
  MatPaginatorModule,
  MAT_DATE_LOCALE,
 } from '@angular/material';
import { MatRadioModule } from '@angular/material/radio';
import { DemoMaterialModule } from './models/material-module';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VendaComponent } from './venda/venda.component';
import { ProdutoComponent } from './produto/produto.component';
import { VendedorComponent } from './vendedor/vendedor.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { VendasDoDiaComponent } from './vendas-do-dia/vendas-do-dia.component';
import { ProdutoService } from './Services/produto.service';
import { VendaService } from './Services/venda.service';
import { VendedorService } from './Services/vendedor.service';


@NgModule({
  declarations: [
    AppComponent,
    VendaComponent,
    ProdutoComponent,
    VendedorComponent,
    TopBarComponent,
    VendasDoDiaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatMenuModule,
    MatRadioModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatTooltipModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    DemoMaterialModule,
    AppRoutingModule,
    MatSelectModule,
    MatIconModule,
    MatSidenavModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  providers: [ProdutoService, VendaService, VendedorService, HttpClientModule, {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
