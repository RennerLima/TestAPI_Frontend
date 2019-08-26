import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Venda } from '../models/venda';
import { environment } from '../../environments/environment';
import { VendaFilter } from '../models';

@Injectable({
  providedIn: 'root'
})
export class VendaService {
  url = environment.url;
  constructor(private http: HttpClient) { }

  listVenda(): Observable<Venda[]> {
    return this.http.get<Venda[]>
      (this.url + 'Venda');
  }

  listVendaDoDia(filter: VendaFilter): Observable<Venda[]> {
    const params = new HttpParams()
      .set('DataVendaInicial', filter.DataVendaInicial.toJSON())
      .set('DataVendaFinal', filter.DataVendaFinal.toJSON());
    return this.http.get<Venda[]>
      (this.url + 'Venda/VendasDoDia', {params: params});
  }

  addVenda(venda: Venda): Observable<Venda> {
    return this.http.post<Venda>
      (this.url + 'Venda/Inserir', venda);
  }

  lstVendaPorId(vendaId: number): Observable<Venda> {
    return this.http.get<Venda>
      (this.url + 'Venda/VendaPorId/' + vendaId)
  }

  delVenda(vendaId: number): Observable<Venda> {
    return this.http.delete<Venda>
      (this.url + 'Venda/Deletar/' + vendaId)
  }
}
