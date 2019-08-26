import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../models/produto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  url = environment.url;
  constructor(private http: HttpClient) { }

  listProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>
    (this.url + 'Produto');
  }

  listProdutoAtivo(produto: Produto): Observable<Produto> {
    return this.http.get<Produto>
    (this.url + 'Produto/Fitrar' + produto)
  }

  addProduto(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>
    (this.url + 'Produto/Inserir', produto);
  }

  modProduto(produto: Produto): Observable<Produto> {
    return this.http.put<Produto>
    (this.url + 'Produto/Modificar', produto);
  }

  lstProdutoId(produtoId: number): Observable<Produto> {
    return this.http.get<Produto>
    (this.url + 'Produto/ProdutoPorId/' + produtoId);
  }

  delProduto(produtoId: number): Observable<Produto> {
    return this.http.delete<Produto>
    (this.url + 'Produto/Deletar/' + produtoId)
  }
}
