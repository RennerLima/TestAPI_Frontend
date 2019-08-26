export class VendedorFilter {
    Id: number;
    Nome: string;
    Comissao: number;
    FlagAtivo: boolean;

    constructor(p: any) {
        this.Id = p.Id !== undefined ? p.Id : null;
        this.Nome = p.Nome !== undefined ? p.Nome : null;
        this.Comissao = p.Comissao !== undefined ? p.Comissao : null;
        this.FlagAtivo = p.FlagAtivo !== undefined ? p.FlagAtivo : null;
    }

}
