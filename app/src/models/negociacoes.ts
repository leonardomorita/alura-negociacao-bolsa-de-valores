import { Negociacao } from "./negociacao.js";

export class Negociacoes {
    private negociacoes: Array<Negociacao> = []; // private negociacoes: Negociacao[] = [];

    public adicionar(negociacao: Negociacao): void {
        this.negociacoes.push(negociacao);
    }

    public listar(): ReadonlyArray<Negociacao> { // listar(): readonly Negociacao[] {
        return this.negociacoes;
    }
}
