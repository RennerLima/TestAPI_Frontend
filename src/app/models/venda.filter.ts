export class VendaFilter {

    IdVendedor: number;
    DataVendaInicial: Date;
    DataVendaFinal: Date;


    constructor(p: any) {
        this.IdVendedor = p.IdVendedor !== undefined ? p.IdVendedor : null;
        this.DataVendaInicial = p.DataVendaInicial !== undefined ? p.DataVendaInicial : null;
        this.DataVendaFinal = p.DataVendaFinal !== undefined ? p.DataVendaFinal : null;
    }
}