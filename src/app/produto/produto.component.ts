import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProdutoService } from '../Services/produto.service';
import { Produto } from '../models/produto';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ProdutoFilter } from '../models/produto.filter';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent implements OnInit {

  saveData = false;
  produtoForm: any;
  produtoIdMod = null;
  lstProduto = new Array<Produto>();
  tableProduto = new MatTableDataSource<Produto>();
  filter = new ProdutoFilter({});

  constructor(
    private formbuilder: FormBuilder,
    private produtoservice: ProdutoService
  ) { }

  displayedColumns: string[] = [
    'Id',
    'ProdutoNome',
    'ProdutoPreco',
    'Flag'
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit() {
    this.buildForm();
    this.loadProdutos();
  }

  buildForm() {
    this.produtoForm = this.formbuilder.group({
      ProdutoNome: ['', [Validators.required]],
      ProdutoPreco: ['', [Validators.required]],
      FlagAtivo: ['', [Validators.required]],
    });
  }

  pesquisar(): void {
    this.produtoservice.listProdutos().subscribe(data => {
      this.tableProduto = new MatTableDataSource<Produto>(data);
      this.tableProduto.paginator = this.paginator;
      this.tableProduto.sort = this.sort;
    });
  }

  loadProdutos() {
    this.produtoservice.listProdutos().subscribe(data => {
      this.lstProduto = data;
    });
  }

  onFormSubmit() {
    this.saveData = false;
    const produto = this.produtoForm.value;
    this.addProduto(produto);
    this.produtoForm.reset();
  }

  loadProdutoToEdit(produtoId: number) {
    this.produtoservice.lstProdutoId(produtoId).subscribe(produto => {
      this.saveData = false;
      this.produtoIdMod = produto.Id;
      this.produtoForm.controls['ProdutoNome'].setValue(produto.ProdutoNome);
      this.produtoForm.controls['ProdutoPreco'].setValue(produto.ProdutoPreco);
      this.produtoForm.controls['FlagAtivo'].setValue(produto.FlagAtivo);
    });
  }

  addProduto(produto: Produto) {
      this.produtoservice.addProduto(produto).subscribe(
        () => {
        this.saveData = true;
        this.pesquisar();
        this.produtoIdMod = null;
        this.produtoForm.reset();
      }
    );
    }

  modProduto(produto: Produto) {
    this.produtoservice.modProduto(produto).subscribe(
      () => {
        this.saveData = true;
        this.pesquisar();
        this.produtoIdMod = null;
        this.produtoForm.reset();
      }
    );
  }

  delProduto(produtoId: number) {
    this.produtoservice.delProduto(produtoId).subscribe(
      () => {
        this.saveData = true;
        this.pesquisar();
        this.produtoIdMod = null;
        this.produtoForm.reset();
      }
    );
  }

  resetForm() {
    this.produtoForm.reset();
    this.saveData = false;
  }
}
