import { NegociacoesDoDia } from '../interfaces/negociacoes-do-dia.js';
import { Negociacao } from '../models/negociacao.js';

export class NegociacoesServices {
    public obterNegociacoesDoDia(): Promise<Negociacao[]> {
        return fetch('http://localhost:8080/dados')
            .then(response => {
                return response.json();
            })
            .then((dados: NegociacoesDoDia[]) => {
                return dados.map(dado => {
                    return new Negociacao(new Date(), dado.vezes, dado.montante);
                });
            });
    }
}
