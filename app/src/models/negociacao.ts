import { Modelo } from "../interfaces/modelo.js";

export class Negociacao implements Modelo<Negociacao> {
    constructor(
        private _data: Date,
        public readonly quantidade: number,
        public readonly valor: number
    ) {}

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

    get data(): Date {
        return new Date(this._data.getTime());
    }

    get volume(): number {
        return this.quantidade * this.valor;
    }

    public paraTexto(): string {
        return `Data: ${this.data}\nQuantidade: ${this.quantidade}\nValor: ${this.valor}`;
    }

    public ehIgual(negociacao: Negociacao): boolean {
        return this.data.getDate() === negociacao.data.getDate() 
            && this.data.getMonth() === negociacao.data.getMonth()
            && this.data.getFullYear() === negociacao.data.getFullYear();
    }
}
