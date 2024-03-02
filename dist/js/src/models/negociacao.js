export class Negociacao {
    constructor(_data, quantidade, valor) {
        this._data = _data;
        this.quantidade = quantidade;
        this.valor = valor;
    }
    get data() {
        return new Date(this._data.getTime());
    }
    get volume() {
        return this.quantidade * this.valor;
    }
    static criarInstancia(dataString, quantidadeString, valorString) {
        const expressaoRegular = /-/g;
        const data = new Date(dataString.replace(expressaoRegular, ','));
        const quantidade = parseInt(quantidadeString);
        const valor = parseFloat(valorString);
        return new Negociacao(data, quantidade, valor);
    }
}
