import { Component, OnInit, ViewChild } from '@angular/core';
import { VendaService } from '../Services/venda.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatSort } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { Venda } from '../models/venda';
import { VendaFilter } from '../models';


@Component({
  selector: 'app-vendas-do-dia',
  templateUrl: './vendas-do-dia.component.html',
  styleUrls: ['./vendas-do-dia.component.scss']
})
export class VendasDoDiaComponent implements OnInit {

  lstVendaDoDia = new MatTableDataSource<Venda>();
  filter = new VendaFilter({});
  vendasDoDiaForm: any;

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

  constructor(
    private vendaservice: VendaService,
    private formbuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.buildForm();
    this.filterDefault();
  }

  buildForm() {
    this.vendasDoDiaForm = this.formbuilder.group({
      Id: ['', [Validators.required]],
      DataVenda: ['', [Validators.required]],
      QuantidadeItens: ['', [Validators.required]],
      NomeVendedor: ['', [Validators.required]],
      NomeProduto: ['', [Validators.required]],
      DataVendaInicial: ['', [Validators.required]],
      DataVendaFinal: ['', [Validators.required]]
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

  pesquisar(): void {
    this.vendaservice.listVendaDoDia(this.filter).subscribe(data => {
      this.lstVendaDoDia = new MatTableDataSource<Venda>(data);
      this.lstVendaDoDia.paginator = this.paginator;
      this.lstVendaDoDia.sort = this.sort;
    });
  }

}