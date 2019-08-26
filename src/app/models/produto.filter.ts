export class ProdutoFilter {
    Id: number;
    ProdutoNome: string;
    ProdutoPreco: number;
    FlagAtivo: boolean;

    constructor(p: any) {
        this.Id = p.Id !== undefined ? p.Id : null;
        this.ProdutoNome = p.ProdutoNome !== undefined ? p.ProdutoNome : null;
        this.ProdutoPreco = p.ProdutoPreco !== undefined ? p.ProdutoPreco : null;
        this.FlagAtivo = p.FlagAtivo !== undefined ? p.FlagAtivo : null;
    }
}