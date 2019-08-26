import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { VendedorService } from '../Services/vendedor.service';
import { Vendedor } from '../models/vendedor';
import { VendedorFilter } from '../models/vendedor.filter';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-vendedor',
  templateUrl: './vendedor.component.html',
  styleUrls: ['./vendedor.component.scss']
})
export class VendedorComponent implements OnInit {

  saveData = false;
  vendedorForm: any;
  vendedorIdMod = null;
  lstVendedor: Array<Vendedor>;
  filter = new VendedorFilter({});
  tableVendedor = new MatTableDataSource<Vendedor>();

  constructor(
    private formbuilder: FormBuilder,
    private vendedorservice: VendedorService
  ) { }

  displayedColumns: string[] = [
    'Id',
    'Nome',
    'Comissao',
    'Flag',
    'Action'
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit() {
    this.buildForm();
    this.loadVendedores();
  }

  buildForm() {
    this.vendedorForm = this.formbuilder.group({
      Nome: ['', [Validators.required]],
      Comissao: ['', [Validators.required]],
      FlagAtivo: ['', [Validators.required]],
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.tableVendedor.filter = filterValue;
  }

  pesquisar(): void {
    this.vendedorservice.listVendedor(this.filter).subscribe(data => {
      this.tableVendedor = new MatTableDataSource<Vendedor>(data);
      this.tableVendedor.paginator = this.paginator;
      this.tableVendedor.sort = this.sort;
    });
  }

  loadVendedores() {
    this.vendedorservice.listVendedor(this.filter).subscribe(data => {
      this.lstVendedor = data;
    });
  }

  onFormSubmit() {
    this.saveData = false;
    const vendedor = this.vendedorForm.value;
    this.addVendedor(vendedor);
    this.vendedorForm.reset();
  }

  addVendedor(vendedor: Vendedor) {
    this.vendedorservice.addVendedor(vendedor).subscribe(
      () => {
        this.saveData = true;
        this.loadVendedores();
        this.vendedorIdMod = null;
        this.vendedorForm.reset();
      }
    )
  }

  delVendedor(vendedorId: number) {
    this.vendedorservice.delVendedor(vendedorId).subscribe(
      () => {
        this.saveData = true;
        this.loadVendedores();
        this.vendedorIdMod = null;
        this.vendedorForm.reset();
      }
    )
  }

  resetForm() {
    this.vendedorForm.reset();
    this.saveData = null;
  }
}
