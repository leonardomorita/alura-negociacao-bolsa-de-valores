export class Negociacao {
    constructor(
        private _data: Date,
        public readonly quantidade: number,
        public readonly valor: number
    ) {}

    get data(): Date {
        return new Date(this._data.getTime());
    }

    get volume(): number {
        return this.quantidade * this.valor;
    }

    public static criarInstancia(
        dataString: string,
        quantidadeString: string,
        valorString: string
    ): Negociacao {
        // Formatar a data
        const expressaoRegular = /-/g; // Expressão regular que busca por todos os '-'
        const data = new Date(dataString.replace(expressaoRegular, ',')); // Exemplo do formato que tem que passar pro Date: '2024,02,25'

        const quantidade = parseInt(quantidadeString);
        const valor = parseFloat(valorString);

        return new Negociacao(data, quantidade, valor);
    }
}
