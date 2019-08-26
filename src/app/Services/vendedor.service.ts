import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vendedor } from '../models/vendedor';
import { environment } from '../../environments/environment';
import { VendedorFilter } from '../models/vendedor.filter';

@Injectable({
  providedIn: 'root'
})
export class VendedorService {
  url = environment.url;
  constructor(private http: HttpClient) { }

  listVendedor(filter: VendedorFilter): Observable<Vendedor[]> {
    return this.http.get<Vendedor[]>
    (this.url + 'Vendedor');
  }

  addVendedor(vendedor: Vendedor): Observable<Vendedor> {
    return this.http.post<Vendedor>
    (this.url + 'Vendedor/Inserir', vendedor);
  }

  lstVendedorPorId(vendedorId: number): Observable<Vendedor> {
    return this.http.get<Vendedor>
    (this.url + 'Vendedor/VendedorPorId/' + vendedorId);
  }

  delVendedor(vendedorId: number): Observable<Vendedor> {
    return this.http.delete<Vendedor>
    (this.url + 'Vendedor/Deletar/' + vendedorId);
  }
}