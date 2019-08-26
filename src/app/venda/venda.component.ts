import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { VendaService } from '../Services/venda.service';
import { Venda } from '../models/venda';
import { MatTableDataSource } from '@angular/material';
import { VendaFilter } from '../models';
import { MatPaginator, MatSort } from '@angular/material';
import { Vendedor } from '../models/vendedor';
import { Produto } from '../models/produto';
import { VendedorService } from '../Services/vendedor.service';
import { ProdutoService } from '../Services/produto.service';
import { VendedorFilter } from '../models/vendedor.filter';
import { ProdutoFilter } from '../models/produto.filter';

@Component({
  selector: 'app-venda',
  templateUrl: './venda.component.html',
  styleUrls: ['./venda.component.scss']
})
export class VendaComponent implements OnInit {

  saveData = false;
  vendaForm: any;
  vendaIdMod = null;
  tableVenda = new MatTableDataSource<Venda>();
  filter = new VendaFilter({});
  filterVendedor = new VendedorFilter({});
  filterProduto = new ProdutoFilter({});
  lstVenda: Array<Venda>;
  lstVendedor: Array<Vendedor>;
  lstProduto: Array<Produto>;

  constructor(
    private formbuilder: FormBuilder,
    private vendaservice: VendaService,
    private vendedorservice: VendedorService,
    private produtoservice: ProdutoService,
  ) { }

  displayedColumns: string[] = [
    'Id',
    'DataVenda',
    'QuantidadeItens',
    'NomeProduto',
    'NomeVendedor',
    'ValorComissaoVenda',
    'ValorTotal'
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit() {
    this.buildForm();
    this.filterDefault();
    this.loadProduto();
    this.loadVendedor();
  }

  buildForm() {
    this.vendaForm = this.formbuilder.group({
      DataVenda: ['', [Validators.required]],
      QuantidadeItens: ['', [Validators.required]],
      Id_Vendedor: ['', [Validators.required]],
      Id_Produto: ['', [Validators.required]],
      DataVendaInicial: ['', [Validators.required]],
      DataVendaFinal: ['', [Validators.required]]
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.tableVenda.filter = filterValue;
  }

  pesquisar(): void {
    this.vendaservice.listVendaDoDia(this.filter).subscribe(data => {
      this.tableVenda = new MatTableDataSource<Venda>(data);
      this.tableVenda.paginator = this.paginator;
      this.tableVenda.sort = this.sort;
    });
  }

  loadProduto() {
    this.produtoservice.listProdutos().subscribe(data => {
      this.lstProduto = data;
    });
  }

  loadVendedor() {
    this.vendedorservice.listVendedor(this.filterVendedor).subscribe(data => {
      this.lstVendedor = data;
    });
  }

  loadVenda() {
    this.vendaservice.listVenda().subscribe(data => {
      this.lstVenda = data;
    });
  }

  filterDefault() {
    this.filter.DataVendaInicial = null;
    this.filter.DataVendaFinal = null;
    const today = new Date();
    today.setUTCHours(23,59,59,999);
    this.filter.DataVendaFinal = today;
    const monthAgo = new Date();
    monthAgo.setUTCHours(0,0,0,0);
    monthAgo.setMonth(today.getMonth() - 1);
    this.filter.DataVendaInicial = monthAgo;
  }

  onFormSubmit() {
    this.saveData = false;
    const venda = this.vendaForm.value;
    this.loadVenda();
    this.addVenda(venda);
    this.vendaForm.reset();
  }

  addVenda(venda: Venda) {
    this.vendaservice.addVenda(venda).subscribe(
      () => {
        this.saveData = true;
        this.loadVenda();
        this.vendaIdMod = null;
        this.vendaForm.reset();
      }
    )
  }

  delVenda(vendaId: number) {
    this.vendaservice.delVenda(vendaId).subscribe(
      () => {
        this.saveData = true;
        this.loadVenda();
        this.vendaIdMod = null;
        this.vendaForm.reset();
      }
    )
  }

  resetForm() {
    this.vendaForm.reset();
    this.saveData = null;
  }
}
