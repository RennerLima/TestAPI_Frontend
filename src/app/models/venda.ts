export class Venda {
    Id: number;
    DataVenda: Date;
    QuantidadeItens: number;
    Id_Vendedor: number;
    Id_Produto: number;
    ValorComissaoVenda: number;
    ValorTotal: number;

    // propriedades estrangeiras
    NomeProduto: string;
    NomeVendedor: string;
}
